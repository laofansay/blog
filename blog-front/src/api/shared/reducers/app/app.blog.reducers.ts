import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '@/api/shared/reducers/reducer.utils';
import { IBlog, defaultValue } from '@//api/model/blog.model';
import { ApiResponse,PageResponse } from '../../types/api-response.types';


const initialState: EntityState<IBlog> = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: defaultValue,
    links: { next: 0 },
    updating: false,
    totalItems: 0,
    updateSuccess: false,
    gradeList: []
};

const apiUrl = '/app/blog/post';


// Actions
export const getEntities = createAsyncThunk('blog/fetch_entity_list',
    async ({ query, page, size, sort }: IQueryParams) => {
        const requestUrl = `${apiUrl}/page?cacheBuster=${new Date().getTime()}`;
        const requestBody = {
          query,
          page,
          size,
          sort,
        };
        return axios.post< PageResponse<IBlog>>(requestUrl);
    }
);


export const getEntity = createAsyncThunk(
    'blog/fetch_entity',
    async (id: string | number) => {
        const requestUrl = `${apiUrl}/info?id=${id}`;
        return axios.get< ApiResponse<IBlog>>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);

// slice
export const blogSlice = createEntitySlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getEntity.fulfilled, (state, action) => {
                state.loading = false;
                state.entity = action.payload.data.data;
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
            .addMatcher(isPending(getEntities, getEntity), state => {
                state.errorMessage = null;
                state.updateSuccess = false;
                state.loading = true;
            })
    },
});

export const { reset } = blogSlice.actions;

// Reducer
export default blogSlice.reducer;


