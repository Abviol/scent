import {configureStore} from "@reduxjs/toolkit";

/**
* Function for creating a new store instance per-request (instead of global singleton)
* to avoid data contamination from different requests.
* */
export const makeStore = () => {
    return configureStore({
        reducer: {},
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];