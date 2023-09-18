import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { OneproductsApi, productsApi } from "./Products";
import CartSlice from "./CardSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    cartShop: CartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
    [OneproductsApi.reducerPath]: OneproductsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(OneproductsApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
