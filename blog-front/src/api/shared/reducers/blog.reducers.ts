import axios from '@/api/config/axios-config';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster';
import { cleanEntity } from '@/api/shared/util/entity-utils';

import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from '@/api/shared/reducers/reducer.utils';
import { IBlog, defaultValue } from '@//api/model/blog.model';
import { ApiResponse, PageResponse } from '@/api/shared/types/api-response.types';


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

// 更新API地址为blog模块的地址
const apiUrl = '/app/blog/post';

// Actions
export const getEntities = createAsyncThunk('blog/fetch_entity_list',
    async ({ query, page, size, sort }: IQueryParams) => {
        const requestUrl = `${apiUrl}?${sort ? `page=${page}&size=${size}&${query}` : `${query}`}&cacheBuster=${new Date().getTime()}`;
        return axios.get<ApiResponse<PageResponse<IBlog>>>(requestUrl);
    }
);

export const getGrade = createAsyncThunk('blog/fetch_entity_grade', async () => {
    const requestUrl = `${apiUrl}?keyword=精选&page=0&size=10&cacheBuster=${new Date().getTime()}`;
    return axios.get<ApiResponse<PageResponse<IBlog>>>(requestUrl);
});

export const getEntity = createAsyncThunk(
    'blog/fetch_entity',
    async (id: string | number) => {
        const requestUrl = `${apiUrl}/${id}`;
        return axios.get<ApiResponse<IBlog>>(requestUrl);
    },
    { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
    'blog/create_entity',
    async (entity: IBlog, thunkAPI) => {
        return axios.post<ApiResponse<IBlog>>(apiUrl, cleanEntity(entity));
    },
    { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
    'blog/update_entity',
    async (entity: IBlog, thunkAPI) => {
        return axios.put<ApiResponse<IBlog>>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    },
    { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
    'blog/partial_update_entity',
    async (entity: IBlog, thunkAPI) => {
        return axios.patch<ApiResponse<IBlog>>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    },
    { serializeError: serializeAxiosError },
);

export const deleteEntity = createAsyncThunk(
    'blog/delete_entity',
    async (id: string | number, thunkAPI) => {
        const requestUrl = `${apiUrl}/${id}`;
        return await axios.delete<ApiResponse<IBlog>>(requestUrl);
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
            .addMatcher(isFulfilled(getGrade), (state, action) => {
                const { data } = action.payload;
                // 调整为适应后端返回格式
                const result = data.data || { list: [] };
                const list = result.list || [];

                return {
                    ...state,
                    loading: false,
                    gradeList: list,
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

export const { reset } = blogSlice.actions;

// Reducer
export default blogSlice.reducer;


