"use client";

/* react */
import {createContext, useCallback, useContext, useMemo, useState} from "react";

interface CartDrawerContextValue {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const CartDrawerContext = createContext<CartDrawerContextValue | undefined>(undefined);

/**
 * Provides shared state and actions for controlling the cart drawer.
 *
 * Wrap the application (or the part of it that needs access) with this
 * provider to enable the `useCartDrawer` hook.
 */
export function CartDrawerProvider({children}: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen(prev => !prev), []);

    const value = useMemo(
        () => ({
            isOpen,
            open,
            close,
            toggle,
        }),
        [isOpen, open, close, toggle]
    );

    return (
        <CartDrawerContext.Provider value={value}>
            {children}
        </CartDrawerContext.Provider>
    )
}

/**
 * Returns the current cart drawer state together with helper actions.
 *
 * Must be used within a {@link CartDrawerProvider}.
 *
 * @throws {Error} If called outside of a {@link CartDrawerProvider}.
 */
export function useCartDrawer() {
const context = useContext(CartDrawerContext);

    if (!context) {
        throw new Error(
            "useCartDrawer() must be used within the CartDrawerProvider",
        );
    }

    return context;
}