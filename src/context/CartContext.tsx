import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import {
    ShopifyCart,
    createCart,
    addCartLines,
    removeCartLines,
    updateCartLines,
    fetchCart,
} from '../lib/shopify';

// ─── Cookie Helpers ───────────────────────────────────────────────────────────

const CART_COOKIE = 'leuco_cart_id';

function getCartIdFromCookie(): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${CART_COOKIE}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

function setCartIdCookie(cartId: string) {
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    document.cookie = `${CART_COOKIE}=${encodeURIComponent(cartId)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function clearCartIdCookie() {
    document.cookie = `${CART_COOKIE}=; max-age=0; path=/`;
}

// ─── State ────────────────────────────────────────────────────────────────────

interface CartState {
    cart: ShopifyCart | null;
    isOpen: boolean;
    loading: boolean;
    addingVariantId: string | null;
}

type CartAction =
    | { type: 'SET_CART'; cart: ShopifyCart | null }
    | { type: 'SET_OPEN'; isOpen: boolean }
    | { type: 'SET_LOADING'; loading: boolean }
    | { type: 'SET_ADDING'; variantId: string | null };

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'SET_CART':
            return { ...state, cart: action.cart };
        case 'SET_OPEN':
            return { ...state, isOpen: action.isOpen };
        case 'SET_LOADING':
            return { ...state, loading: action.loading };
        case 'SET_ADDING':
            return { ...state, addingVariantId: action.variantId };
        default:
            return state;
    }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface CartContextValue {
    cart: ShopifyCart | null;
    cartCount: number;
    isOpen: boolean;
    loading: boolean;
    addingVariantId: string | null;
    openCart: () => void;
    closeCart: () => void;
    addToCart: (variantId: string) => Promise<void>;
    removeFromCart: (lineId: string) => Promise<void>;
    updateQuantity: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, {
        cart: null,
        isOpen: false,
        loading: false,
        addingVariantId: null,
    });

    // Rehydrate cart from cookie on mount
    useEffect(() => {
        const cartId = getCartIdFromCookie();
        if (!cartId) return;

        fetchCart(cartId).then((cart) => {
            if (cart) {
                dispatch({ type: 'SET_CART', cart });
            } else {
                // Cart expired on Shopify side — clear stale cookie
                clearCartIdCookie();
            }
        });
    }, []);

    const cartCount = state.cart?.lines.edges.reduce(
        (sum, { node }) => sum + node.quantity,
        0
    ) ?? 0;

    const openCart = useCallback(() => dispatch({ type: 'SET_OPEN', isOpen: true }), []);
    const closeCart = useCallback(() => dispatch({ type: 'SET_OPEN', isOpen: false }), []);

    const addToCart = useCallback(async (variantId: string) => {
        dispatch({ type: 'SET_ADDING', variantId });
        try {
            let updatedCart: ShopifyCart;
            if (state.cart) {
                updatedCart = await addCartLines(state.cart.id, variantId);
            } else {
                updatedCart = await createCart(variantId);
                setCartIdCookie(updatedCart.id);
            }
            dispatch({ type: 'SET_CART', cart: updatedCart });
            dispatch({ type: 'SET_OPEN', isOpen: true });
        } finally {
            dispatch({ type: 'SET_ADDING', variantId: null });
        }
    }, [state.cart]);

    const removeFromCart = useCallback(async (lineId: string) => {
        if (!state.cart) return;
        dispatch({ type: 'SET_LOADING', loading: true });
        try {
            const updatedCart = await removeCartLines(state.cart.id, [lineId]);
            dispatch({ type: 'SET_CART', cart: updatedCart });
        } finally {
            dispatch({ type: 'SET_LOADING', loading: false });
        }
    }, [state.cart]);

    const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
        if (!state.cart) return;
        dispatch({ type: 'SET_LOADING', loading: true });
        try {
            const updatedCart = await updateCartLines(state.cart.id, lineId, quantity);
            dispatch({ type: 'SET_CART', cart: updatedCart });
        } finally {
            dispatch({ type: 'SET_LOADING', loading: false });
        }
    }, [state.cart]);

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                cartCount,
                isOpen: state.isOpen,
                loading: state.loading,
                addingVariantId: state.addingVariantId,
                openCart,
                closeCart,
                addToCart,
                removeFromCart,
                updateQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
    return ctx;
}
