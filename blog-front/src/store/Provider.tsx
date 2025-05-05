'use client'

import { Provider } from 'react-redux'
import getStore, { AppDispatch, useAppDispatch, useAppSelector } from '@/store/store'
import { NextUIProvider } from '@nextui-org/react'

const store = getStore();

export function Providers({ children }: { children: React.ReactNode }) {

  return <Provider store={store}>
    <NextUIProvider>
      {children}
    </NextUIProvider>
  </Provider>
}

export default Providers

