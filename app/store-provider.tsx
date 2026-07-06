'use client'
import {useEffect, useRef} from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import {setupListeners} from "@reduxjs/toolkit/query";

export default function StoreProvider({
                                          children,
                                      }: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined);

    // The code is copy-pasted from the official Redux documentation https://redux-toolkit.js.org/usage/nextjs#providing-the-store.
    // Disable ESLint to follow the guidelines.
    // eslint-disable-next-line
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    useEffect(() => {
        if (storeRef.current != null) {
            // configure listeners using the provided defaults
            // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
            const unsubscribe = setupListeners(storeRef.current.dispatch);
            return unsubscribe;
        }
    }, []);

    // The code is copy-pasted from the official Redux documentation https://redux-toolkit.js.org/usage/nextjs#providing-the-store.
    // Disable ESLint to follow the guidelines.
    // eslint-disable-next-line
    return <Provider store={storeRef.current}>{children}</Provider>
}