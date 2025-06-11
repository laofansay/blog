'use client'

import { Provider } from 'react-redux'
import getStore, { AppDispatch, useAppDispatch, useAppSelector } from '@/store/store'
import { NextUIProvider } from '@nextui-org/react'

import { bindActionCreators } from 'redux';
import setupAxiosInterceptors from '@/api/shared/reducers/axios-interceptor';
import { clearAuthentication, getSession } from '@/api/shared/reducers/authentication';



const store = getStore();


const actions = bindActionCreators({ clearAuthentication }, store.dispatch);
setupAxiosInterceptors(() => actions.clearAuthentication('login.error.unauthorized'));


export function Providers({ children }: { children: React.ReactNode }) {

  return <Provider store={store}>
    <NextUIProvider>
      {children}
    </NextUIProvider>
  </Provider>
}

export default Providers

