import counterSlice from "@/store/slices/counter/counter";
import appBlogReducer from '@/api/shared/reducers/app/app.blog.reducers';
import appCategoryReducer from '@/api/shared/reducers/app/app.category.reducer';
import appTagReducer from '@/api/shared/reducers/app/app.tag.reducer';
import authentication from '@/api/shared/reducers/authentication';


import { UnknownAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


const store = configureStore({
  reducer: {
    blog: appBlogReducer,
    category: appCategoryReducer,
    tag: appTagReducer,
    counter: counterSlice,
    authentication
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.config', 'payload.request', 'payload.headers', 'error', 'meta.arg'],
      },
    }).concat(),
});

const getStore = () => store;

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, UnknownAction>;

export default getStore;
