import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';
import { cleanEntity } from '@/api/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '@/api/shared/reducers/reducer.utils';
import { ITag, defaultValue } from '@/api/model/tag.model';
import { ApiResponse, PageResponse } from '../../types/api-response.types';

const initialState: EntityState<ITag> = {
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

const apiUrl = 'admin/blog/tag';


// Actions

export const getEntities = createAsyncThunk('tag/fetch_entity_page', 
  async ({ query, page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiUrl}/page?cacheBuster=${new Date().getTime()}`
    const requestBody = {
      query,
      page,
      size
    }
    return axios.post<PageResponse<ITag>>(requestUrl, requestBody)

});

export const getList = createAsyncThunk('tag/fetch_entity_list', async ({ }) => {
  const requestUrl = `${apiUrl}/list?cacheBuster=${new Date().getTime()}`;
  
  const requestBody = { };
  return axios.post<ApiResponse<ITag[]>>(requestUrl,requestBody);
});

export const getEntity = createAsyncThunk(
  'tag/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/info?id=${id}`;
    return axios.get<ITag>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
  'tag/create_entity',
  async (entity: ITag, thunkAPI) => {
    return axios.post<ITag>(`${apiUrl}/add`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'tag/update_entity',
  async (entity: ITag, thunkAPI) => {
    return axios.post<ITag>(`${apiUrl}/update`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
  'tag/partial_update_entity',
  async (entity: ITag, thunkAPI) => {
    return axios.post<ITag>(`${apiUrl}/update`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const deleteEntity = createAsyncThunk(
  'tag/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/delete?ids=${id}`;
    return await axios.post<ITag>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// slice

export const TagSlice = createEntitySlice({
  name: 'tag',
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
        const links = '';

        return {
          ...state,
          loading: false,
          links,
          entities: loadMoreDataWhenScrolled(state.entities, data.data.list, links),
          totalItems: data.data.pagination.total,
        };
      })
      .addMatcher(isFulfilled(getList), (state, action) => {
        const { data, headers } = action.payload;
        const links = "";
        return {
          ...state,
          loading: false,
          links,
          entities:  data.data,
          totalItems: 0,
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
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

export const { reset } = TagSlice.actions;

// Reducer
export default TagSlice.reducer;
