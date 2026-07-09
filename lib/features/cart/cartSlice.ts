import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {CartItemType} from "@/lib/types";

interface CartSliceState {
    totalAmount: number;
}

interface CartEntity extends CartItemType {
    isSeen: boolean;
}

// Provides prebuilt reducers and selectors for normalized state management,
// as recommended by the official Redux documentation.
const cartAdapter = createEntityAdapter<CartEntity>({});

/*
* !!! Remove mock data before merge !!!
* */
const initialState = cartAdapter.upsertMany(cartAdapter.getInitialState<CartSliceState>({
    totalAmount: 2,
}), {
    "asdf-wedg-cfad": {
        id: "asdf-wedg-cfad",
        productCode: "422454",
        imageUrl: "https://i.makeup.it/2/2h/2h0tbxmkoqlr.jpg",
        name: "Montblanc Explorer",
        variant: {
            volume: 100,
            price: 7084,
            discountedPrice: undefined,
            wishlist: true,
            quantityInStock: 34,
        },
        quantity: 2,
        isSeen: true,
    },
    "feqd-asdv-edwq": {
        id: "feqd-asdv-edwq",
        productCode: "123456",
        imageUrl: "https://i.makeup.it/9/9i/9iajbg7jxhit.jpg",
        name: "Jean Paul Gaultier Le Beau",
        variant: {
            volume: 75,
            price: 7999,
            discountedPrice: undefined,
            wishlist: true,
            quantityInStock: 12,
        },
        quantity: 1,
        isSeen: true,
    },
});

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
         * Adds an item to `cart.entities` and increments `cart.totalAmount`.
         * In case if the item's id appears for the first time,
         * @param action - Payload  containing an object of type `CartItemType`
         * */
        addItem: (state, action: PayloadAction<CartItemType>) => {
            const id = action.payload.id;
            const existing = state.entities[id];
            state.totalAmount++;
            if (existing) {
                existing.quantity++;
            } else {
                cartAdapter.addOne(state, {...action.payload, isSeen: false});
            }
        },
        /**
         * Removes an item from `cart.entities`.
         *
         * Subtracts the item's quantity from `cart.totalAmount`.
         * @param action - Payload containing the item's id
         * */
        removeItem: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const item = state.entities[id];

            if (!item) return;

            state.totalAmount -= item.quantity;
            cartAdapter.removeOne(state, id);
        },
        /**
         * Finds an item by id among `cart.entities`
         * and increments its quantity by the specified amount.
         * @param action - Payload containing the item id and the amount to increment by
         */
        incrementItemQuantityByAmount: (state, action: PayloadAction<{ id: string, amount: number }>) => {
            const id = action.payload.id;
            const item = state.entities[id];

            if (!item) return;

            if (item.quantity + action.payload.amount < 0) { // to prevent setting item.quantity below zero e.g. in case item.quantity = 3, amount = -5 => -2
                item.quantity = 0;
                state.totalAmount -= item.quantity;
            } else {
                item.quantity += action.payload.amount;
                state.totalAmount += action.payload.amount;
            }
        },
        /**
         * Removes all entries from `cart.entities`.
         *
         * Sets `cart.totalAmount` to `0`.
         * */
        clearCart: (state) => {
            state.totalAmount = 0;
            cartAdapter.removeAll(state);
        },
        /**
         * Sets all entities with `isSeen` set to false and sets it to true.
         * */
        acknowledgeRecentlyAddedItems: (state) => {
            cartAdapter.updateMany(state, state.ids
                .filter(id => !state.entities[id]?.isSeen)
                .map(id => ({id, changes: {isSeen: true}}))
            );
        },
    },
    selectors: {
        selectRecentlyAddedItems: (cart) => Object.values(cart.entities).filter(item => !item.isSeen),
        selectSeenItems: (cart) => Object.values(cart.entities).filter(item => item.isSeen),
        selectItems: (cart) => Object.values(cart.entities),
        selectTotalAmount: (cart) => cart.totalAmount,
        selectTotalPrice: (cart) => Object.values(cart.entities)
            .reduce(
                (accumulator, currentValue) => accumulator += currentValue.quantity * currentValue.variant.price,
                0
            ),
    },
});

// Action creators are generated for each case reducer function.
export const {
    addItem,
    removeItem,
    incrementItemQuantityByAmount,
    clearCart,
    acknowledgeRecentlyAddedItems
} = cartSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {selectRecentlyAddedItems, selectSeenItems, selectItems, selectTotalAmount, selectTotalPrice} = cartSlice.selectors;
