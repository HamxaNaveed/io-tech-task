import { configureStore } from "@reduxjs/toolkit"
import searchReducer from "./features/searchSlice"
import formReducer from "./features/formSlice"

export const store = configureStore({
  reducer: {
    search: searchReducer,
    form: formReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
