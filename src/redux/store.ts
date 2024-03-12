import {configureStore} from "@reduxjs/toolkit"
import invoiceSlice from "./invoiceSlice"
import {useDispatch} from "react-redux"

export const store = configureStore({
  reducer: {invoiceSlice},
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
