import { initiateCheckout } from "../lib/payments";
import { useState, createContext, useContext, useEffect } from "react";
import products from "../products.json";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

interface CartProduct {
  id: string;
  quantity: number;
}

interface Cart {
  products: { [key: string]: CartProduct };
}

interface CartContextProps {
  totalPrice: number;
  totalItems: number;
  addToCart: ({ id }: { id: string }) => void;
  updateCart: ({ id, quantity }: { id: string; quantity: number }) => void;
  checkout: () => void;
  cartItems: Array<CartProduct & { pricePerItem: number }>;
}

const defaultCart: Cart = {
  products: {},
};

export const useCartState = (): CartContextProps => {
  const [cart, setCart] = useState<Cart>(defaultCart);

  // Load cart from local storage on mount
  useEffect(() => {
    const storedState = window.localStorage.getItem("space-jellyfish-cart");
    const data: Cart | null = storedState ? JSON.parse(storedState) : null;
    if (data) {
      setCart(data);
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    if (cart !== defaultCart) {
      const data = JSON.stringify(cart);
      window.localStorage.setItem("space-jellyfish-cart", data);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = ({ id }: { id: string }) => {
    setCart((prev) => {
      const product = prev.products[id];
      return {
        ...prev,
        products: {
          ...prev.products,
          [id]: product
            ? { id, quantity: product.quantity + 1 }
            : { id, quantity: 1 },
        },
      };
    });
  };

  // Update item quantity in cart
  const updateCart = ({ id, quantity }: { id: string; quantity: number }) => {
    if (quantity <= 0) {
      setCart((prev) => {
        const { [id]: _, ...rest } = prev.products;
        return { ...prev, products: rest };
      });
    } else {
      setCart((prev) => ({
        ...prev,
        products: {
          ...prev.products,
          [id]: { id, quantity },
        },
      }));
    }
  };

  // Generate cart items with additional product
