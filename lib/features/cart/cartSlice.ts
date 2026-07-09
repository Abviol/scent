import {createEntityAdapter, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {CartItemType} from "@/lib/types";

// Provides prebuilt reducers and selectors for normalized state management,
// as recommended by the official Redux documentation.
const cartAdapter = createEntityAdapter<CartItemType>({});

interface CartSliceState {
    recentlyAddedItems: Record<string, CartItemType>;
    // Serves for rendering the recently added items in the order they were added
    // as soon as plain objects don't guarantee key order in all cases.
    recentlyAddedItemsIds: string[],
    totalAmount: number;
}

/*
* !!! Remove mock data before merge !!!
* */
const initialState = cartAdapter.upsertMany(cartAdapter.getInitialState<CartSliceState>({
    recentlyAddedItems: {},
    recentlyAddedItemsIds: [],
    totalAmount: 3,
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
    },
});

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        /**
         * Adds an item to `cart.recentlyAddedItems` and increments `cart.totalAmount`.
         * In case if the item's id appears for the first time,
         * the id is pushed to `cart.recentlyAddedItemsIds`.
         * @param action - Payload  containing an object of type `CartItemType`
         * */
        addItem: (state, action: PayloadAction<CartItemType>) => {
            const id = action.payload.id;
            const existing = state.entities[id] || state.recentlyAddedItems[id];
            state.totalAmount++;
            if (existing) {
                existing.quantity++;
            } else {
                state.recentlyAddedItems[id] = action.payload;
                state.recentlyAddedItemsIds.push(id);
            }
        },
        /**
         * Removes an item from `cart.recentlyAddedItems` or `cart.entities`
         * based on where the item resides. In the first case the item's id
         * gets removed from `cart.recentlyAddedItemsIds` as well.
         *
         * Subtracts the item's quantity from `cart.totalAmount`.
         * @param action - Payload containing the item's id
         * */
        removeItem: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const item = state.entities[id] || state.recentlyAddedItems[id];

            if (!item) return;

            state.totalAmount -= item.quantity;

            if (state.entities[id]) {
                cartAdapter.removeOne(state, id);
            } else {
                delete state.recentlyAddedItems[id];
                state.recentlyAddedItemsIds.splice(state.recentlyAddedItemsIds.indexOf(id), 1);
            }
        },
        /**
         * Finds an item by id among `cart.entities` and `cart.recentlyAddedItems`
         * and increments its quantity by the specified amount.
         * @param action - Payload containing the item id and the amount to increment by
         */
        incrementItemQuantityByAmount: (state, action: PayloadAction<{ id: string, amount: number }>) => {
            const id = action.payload.id;
            const item = state.entities[id] || state.recentlyAddedItems[id];

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
         * Removes all entries from `cart.recentlyAddedItems`
         * and all ids from `cart.recentlyAddedItemsIds`.
         *
         * Sets `cart.totalAmount` to `0`.
         * */
        clearCart: (state) => {
            state.totalAmount = 0;
            cartAdapter.removeAll(state);
            state.recentlyAddedItems = {};
            state.recentlyAddedItemsIds = [];
        },
        /**
         * Moves all `cart.recentlyAddedItems` entries to `cart.entities`.
         *
         * Removes all entries from `cart.recentlyAddedItems`
         * and all ids from `cart.recentlyAddedItemsIds`.
         * */
        acknowledgeRecentlyAddedItems: (state) => {
            cartAdapter.addMany(state, state.recentlyAddedItems);
            state.recentlyAddedItems = {};
            state.recentlyAddedItemsIds = [];
        },
    },
    selectors: {
        selectRecentlyAddedItems: (cart) => cart.recentlyAddedItemsIds.map(id => cart.recentlyAddedItems[id]),
        selectItems: (cart) => Object.values(cart.entities),
        selectTotalAmount: (cart) => cart.totalAmount,
        selectTotalPrice: (cart) => {
            let total = 0;
            Object.values(cart.entities).forEach((value) => {
                total += value.quantity * value.variant.price;
            });
            Object.values(cart.recentlyAddedItems).forEach((value) => {
                total += value.quantity * value.variant.price;
            });
            return total;
        },
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
export const {selectRecentlyAddedItems, selectItems, selectTotalAmount, selectTotalPrice} = cartSlice.selectors;
