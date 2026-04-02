import { persist } from "zustand/middleware";
import type { CartItem } from "../types/Product";
import { create } from "zustand/react";

type Theme = "light" | "dark";

type ShopState = {
    cart: CartItem[];
    theme: Theme;

    addToCart: (product: CartItem) => void;
    removeFromCart: (productId: number) => void;
    incrementQuantity: (productId: number) => void;
    decrementQuantity: (productId: number) => void;
    toggleTheme: () => void;

    getTotal: () => number;
    getCartItemCount: () => number;
}

export const useShopStore = create<ShopState>()(
    persist(
        (set, get) => ({
            cart: [],
            theme: "light",

            addToCart: (product: CartItem) => {
                const existingItem = get().cart.find(item => item.id === product.id);

                if (existingItem) {
                    set(state => ({
                        cart: state.cart.map(item =>
                            item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
                        )
                    }));
                }

                set(state => ({
                    cart: [...state.cart, { ...product, quantity: 1 }]
                }));
            },
            removeFromCart: (productId: number) => {
                set(state => ({
                    cart: state.cart.filter(item => item.id !== productId)
                }));
            },
            incrementQuantity: (productId: number) => {
                set(state => ({
                    cart: state.cart.map(item =>
                        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
                    )
                }));
            },
            decrementQuantity: (productId: number) => {
                set(state => ({
                    cart: state.cart.map(item =>
                        item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
                    )
                }));
            },
            toggleTheme: () => {
                set(state => ({
                    theme: state.theme === "light" ? "dark" : "light"
                }));
            },
            getTotal: () => {
                return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
            getCartItemCount: () => {
                return get().cart.reduce((count, item) => count + item.quantity, 0);
            }

        }
        ), {
        name: "shop-store",
        partialize: (state) => {
            return {
                cart: state.cart,
                theme: state.theme
            };
        },
    })

)