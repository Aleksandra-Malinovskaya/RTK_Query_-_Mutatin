import { configureStore } from '@reduxjs/toolkit'
import { toDoApi } from '../services/toDo'
import textSlice from './textSlice'

export const store = configureStore({
  reducer: {
    text: textSlice,
    [toDoApi.reducerPath]: toDoApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(toDoApi.middleware)
})
