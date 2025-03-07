import { CartItem, getCartItemsFromLocalStorage, setCartItemsToLocalStorage } from "../lib/cart";
import { Product } from "../lib/product";
import { useState, useEffect, useMemo } from "react";

export type CartProps = {
  cartItems: CartItem[];
  cartItemCount: number;
  totalPrice: number;
  addCartItem: (product: Product) => void;
  removeCartItem: (product: Product) => void;
  resetCartItem: () => void;
};

export default function useCart(): CartProps {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage());
  }, []);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.product.price, 0);
  }, [cartItems]);

  const addCartItem = (product: Product): void => {
    const prev = cartItems.concat();
    // 商品が既にカートに入っているか確認するため
    const cartItem = prev.find((cartItem) => {
      return cartItem.product.id === product.id;
    });

    if (cartItem) {
      cartItem.quantity++;
    } else {
      prev.push({ product, quantity: 1 });
    }

    setCartItemsFn(prev);
  };

  const removeCartItem = (product: Product): void => {
    let prev = cartItems.concat();
    const cartItem = prev.find((cartItem) => {
      return cartItem.product.id === product.id;
    });

    if (!cartItem) return;

    if (cartItem?.quantity === 1) {
      prev = prev.filter((item) => item.product.id !== cartItem.product.id);
    } else {
      cartItem.quantity--;
    }

    setCartItemsFn(prev);
  };

  const resetCartItem = (): void => {
    setCartItemsFn([]);
  };

  const setCartItemsFn = (cartItems: CartItem[]) => {
    setCartItems(cartItems);
    setCartItemsToLocalStorage(cartItems);
  };

  return {
    cartItems,
    cartItemCount,
    totalPrice,
    addCartItem,
    removeCartItem,
    resetCartItem,
  };
}
