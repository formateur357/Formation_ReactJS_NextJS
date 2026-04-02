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