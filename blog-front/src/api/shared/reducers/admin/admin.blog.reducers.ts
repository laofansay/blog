import axios from 'axios'
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit'
import { loadMoreDataWhenScrolled, parseHeaderForLinks } from 'react-jhipster'
import { cleanEntity } from '@/api/shared/util/entity-utils'

import {
	IQueryParams,
	createEntitySlice,
	EntityState,
	serializeAxiosError,
} from '@/api/shared/reducers/reducer.utils'

import { IBlog, defaultValue } from '@/api/model/blog.model'
import { ApiResponse, PageResponse } from '../../types/api-response.types'

const initialState: EntityState<IBlog> = {
	loading: false,
	errorMessage: null,
	entities: [],
	entity: defaultValue,
	links: { next: 0 },
	updating: false,
	totalItems: 0,
	updateSuccess: false,
	gradeList: [],
}

const apiUrl = '/admin/blog/post';

// Actions

// 分页列表查询
export const getEntities = createAsyncThunk(
	'post/fetch_entity_page',
	async ({ query, page, size, sort }: IQueryParams) => {
		const requestUrl = `${apiUrl}/page?cacheBuster=${new Date().getTime()}`
		const requestBody = {
			query,
			page,
			size
		}
		return axios.post<PageResponse<IBlog>>(requestUrl, requestBody)
	}
)

// 获取单个实体
export const getEntity = createAsyncThunk(
	'post/fetch_entity',
	async (id: string | number) => {
		const requestUrl = `${apiUrl}/info?id=${id}`
		return axios.get<ApiResponse<IBlog>>(requestUrl)
	},
	{ serializeError: serializeAxiosError }
)

// 创建实体
export const createEntity = createAsyncThunk(
	'post/create_entity',
	async (entity: IBlog) => {
		return axios.post<IBlog>(`${apiUrl}/add`, cleanEntity(entity))
	},
	{ serializeError: serializeAxiosError }
)

// 更新实体
export const updateEntity = createAsyncThunk(
	'post/update_entity',
	async (entity: IBlog) => {
		return axios.post<IBlog>(`${apiUrl}/update`, cleanEntity(entity))
	},
	{ serializeError: serializeAxiosError }
)

// 局部更新实体
export const partialUpdateEntity = createAsyncThunk(
	'post/partial_update_entity',
	async (entity: IBlog) => {
		return axios.post<IBlog>(`${apiUrl}/update`, cleanEntity(entity))
	},
	{ serializeError: serializeAxiosError }
)

// 删除实体
export const deleteEntity = createAsyncThunk(
	'post/delete_entity',
	async (id: string | number) => {
		const requestUrl = `${apiUrl}/delete?ids=${id}`
		return axios.post<IBlog>(requestUrl)
	},
	{ serializeError: serializeAxiosError }
)

// 发布文章
export const publishEntity = createAsyncThunk(
	'post/publish_entity',
	async (id: string | number) => {
		const requestUrl = `${apiUrl}/publish/${id}`
		return axios.get<ApiResponse<IBlog>>(requestUrl)
	},
	{ serializeError: serializeAxiosError }
)

// Slice
export const blogSlice = createEntitySlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getEntity.fulfilled, (state, action) => {
				state.loading = false
				state.entity = action.payload.data.data
			})
			.addCase(deleteEntity.fulfilled, (state) => {
				state.updating = false
				state.updateSuccess = true
				state.entity = {}
			})
			.addMatcher(isFulfilled(getEntities), (state, action) => {
				const { data, headers } = action.payload
				const links = '';

				return {
					...state,
					loading: false,
					links,
					entities: loadMoreDataWhenScrolled(state.entities, data.data.list, links),
          totalItems: data.data.pagination.total,
				}
			})
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
			.addMatcher(
				isFulfilled(createEntity, updateEntity, partialUpdateEntity,publishEntity),
				(state, action) => {
					state.updating = false
					state.loading = false
					state.updateSuccess = true
					state.entity = action.payload.data.data
				}
			)
			.addMatcher(
				isPending(
					getEntities,
					getEntity,
					createEntity,
					updateEntity,
					partialUpdateEntity,
					deleteEntity,
					publishEntity
				),
				(state) => {
					state.errorMessage = null
					state.updateSuccess = false
					state.loading = true
					state.updating = true
				}
			)
	},
})

export const { reset } = blogSlice.actions

export default blogSlice.reducer
