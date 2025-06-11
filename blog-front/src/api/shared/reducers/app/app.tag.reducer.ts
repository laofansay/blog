import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';
import { cleanEntity } from '@/api/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '@/api/shared/reducers/reducer.utils';
import { ITag, defaultValue } from '@/api/model/tag.model';
import { ApiResponse } from '../../types/api-response.types';

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

const apiUrl = '/app/blog/tags';

// Actions
export const getList = createAsyncThunk('tag/fetch_entity_list', async ({ }) => {
  const requestUrl = `${apiUrl}/list?cacheBuster=${new Date().getTime()}`;
  
  const requestBody = { };
  return axios.post<ApiResponse<ITag[]>>(requestUrl,requestBody);
});

export const getEntity = createAsyncThunk(
  'tag/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<ITag>(requestUrl);
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
    
      .addMatcher(isFulfilled(getList), (state, action) => {
        const { data, headers } = action.payload;
        const links = '';
        return {
          ...state,
          loading: false,
          links,
          entities: loadMoreDataWhenScrolled(state.entities, data.data, links),
          totalItems:0,
        };
      })
     
      .addMatcher(isPending(getList, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
  },
});

export const { reset } = TagSlice.actions;

// Reducer
export default TagSlice.reducer;
