'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'

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

    // The code is copy-pasted from the official Redux documentation https://redux-toolkit.js.org/usage/nextjs#providing-the-store.
    // Disable ESLint to follow the guidelines.
    // eslint-disable-next-line
    return <Provider store={storeRef.current}>{children}</Provider>
}