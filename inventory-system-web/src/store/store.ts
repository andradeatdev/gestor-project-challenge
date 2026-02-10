import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/store/api/productsApi";
import { materialsApi } from "@/store/api/materialsApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [materialsApi.reducerPath]: materialsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      materialsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
