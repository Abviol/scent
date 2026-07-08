import {Action, combineSlices, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {counterSlice} from "@/lib/features/counter/counterSlice";
import {cartSlice} from "@/lib/features/cart/cartSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(counterSlice, cartSlice);

/**
* Function for creating a new store instance per-request (instead of global singleton)
* to avoid data contamination from different requests.
* */
export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>;