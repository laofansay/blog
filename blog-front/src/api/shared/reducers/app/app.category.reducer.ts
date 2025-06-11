import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '@/api/shared/reducers/reducer.utils';
import { ICategory, defaultValue } from '@/api/model/category.model';

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

const apiUrl = '/app/blog/category';

// Actions
export const getList = createAsyncThunk('category/fetch_entity_list', async ({  }) => {
  const requestUrl = `${apiUrl}/list?cacheBuster=${new Date().getTime()}`;
  return axios.post<ICategory[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'category/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<ICategory>(requestUrl);
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

export const { reset } = CategorySlice.actions;

// Reducer
export default CategorySlice.reducer;
