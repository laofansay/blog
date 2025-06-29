import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';
import { cleanEntity } from '@/api/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '@/api/shared/reducers/reducer.utils';
import { ITag, defaultValue } from '@/api/model/tag.model';
import { ApiResponse, PageResponse } from '@/api/shared/types/api-response.types';

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

const apiUrl = '/app/blog/tag';

// Actions

export const getEntities = createAsyncThunk('tag/fetch_entity_list',
  async ({ query, page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiUrl}?${sort ? `page=${page}&size=${size}&${query}` : `${query}`}&cacheBuster=${new Date().getTime()}`;
    return axios.get<ApiResponse<PageResponse<ITag>>>(requestUrl);
  }
);

export const getEntity = createAsyncThunk(
  'tag/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<ApiResponse<ITag>>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
  'tag/create_entity',
  async (entity: ITag, thunkAPI) => {
    return axios.post<ApiResponse<ITag>>(apiUrl, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'tag/update_entity',
  async (entity: ITag, thunkAPI) => {
    return axios.put<ApiResponse<ITag>>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
  'tag/partial_update_entity',
  async (entity: ITag, thunkAPI) => {
    return axios.patch<ApiResponse<ITag>>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
  },
  { serializeError: serializeAxiosError },
);

export const deleteEntity = createAsyncThunk(
  'tag/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    return await axios.delete<ApiResponse<ITag>>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

// slice

export const TagSlice = createEntitySlice({
  name: 'tag',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data } = action.payload;
        // 调整为适应后端返回格式
        const result = data.data || { list: [], pagination: { total: 0 } };
        const list = result.list || [];
        const pagination = result.pagination || {};
        const totalItems = pagination.total || 0;

        return {
          ...state,
          loading: false,
          entities: list,
          totalItems: totalItems,
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
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
