import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';
import { cleanEntity } from '@/api/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '@/api/shared/reducers/reducer.utils';
import { ICategory, defaultValue } from '@/api/model/category.model';
import { ApiResponse, PageResponse } from '../../types/api-response.types'

const initialState: EntityState<ICategory> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  gradeList: [],
};

const apiUrl = 'admin/blog/category';

// Actions

export const getEntities = createAsyncThunk('category/fetch_entity_page', 
  async ({ query, page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}/page?cacheBuster=${new Date().getTime()}`
  const requestBody = {
    query,
    page,
    size
  }
  return axios.post<PageResponse<ICategory>>(requestUrl, requestBody)
});

export const getList = createAsyncThunk('category/fetch_entity_list', 
  async ({}: IQueryParams) => {
  const requestUrl = `${apiUrl}/list?cacheBuster=${new Date().getTime()}`;
  const requestBody = {
  }
  return axios.post<ApiResponse<ICategory[]>>(requestUrl,requestBody);
});


export const getEntity = createAsyncThunk(
  'category/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/info?id=${id}`;
    return axios.get<ICategory>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
  'category/create_entity',
  async (entity: ICategory, thunkAPI) => {
    return axios.post<ICategory>(`${apiUrl}/add`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'category/update_entity',
  async (entity: ICategory, thunkAPI) => {
    return axios.put<ICategory>(`${apiUrl}/update`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
  'category/partial_update_entity',
  async (entity: ICategory, thunkAPI) => {
    return axios.patch<ICategory>(`${apiUrl}/update`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const deleteEntity = createAsyncThunk(
  'category/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/delete?ids=${id}`;
    return await axios.delete<ICategory>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// slice

export const CategorySlice = createEntitySlice({
  name: 'category',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data, headers } = action.payload;
        const links ="";

        return {
          ...state,
          loading: false,
          links,
          entities: loadMoreDataWhenScrolled(state.entities, data.data.list, links),
          totalItems: data.data.pagination.total,
        };
      })
      .addMatcher(isFulfilled(getEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data.data;
      })
      .addMatcher(isFulfilled(getList), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entities = action.payload.data.data;
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data.data;
      })
     
      .addMatcher(isPending(getEntities, getEntity,getList), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = CategorySlice.actions;

// Reducer
export default CategorySlice.reducer;
