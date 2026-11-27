import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import CartContext from "./cartContext";

const cartKey = "foodtrial-cart";

const optionKey = (options = []) =>
  options
    .map((option) => option.id || option._id)
    .filter(Boolean)
    .sort()
    .join(",");

const lineKey = (item) =>
  `${item.id}:t${optionKey(item.toppingOptions)}:a${optionKey(item.addOns)}`;

function readCart() {
  const savedCart = localStorage.getItem(cartKey);
  if (!savedCart) return [];

  try {
    const items = JSON.parse(savedCart);
    return Array.isArray(items)
      ? items.map((item) => {
          const normalized = {
            ...item,
            basePrice: item.basePrice ?? item.price,
            toppingOptions: Array.isArray(item.toppingOptions) ? item.toppingOptions : [],
            addOns: Array.isArray(item.addOns) ? item.addOns : [],
          };
          return { ...normalized, key: lineKey(normalized) };
        })
      : [];
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    console.error("Saved cart data is invalid and has been cleared.", error);
    localStorage.removeItem(cartKey);
    return [];
  }
}

export function CartProvider({ children }) {
  const { notify } = useAuth();
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items]);

  const addItem = (food) => {
    const newItem = {
      ...food,
      basePrice: food.basePrice ?? food.price,
      toppingOptions: food.toppingOptions || [],
      addOns: food.addOns || [],
      quantity: 1,
    };
    newItem.key = lineKey(newItem);
    const existing = items.find((item) => item.key === newItem.key);
    if (existing?.quantity >= 50) {
      notify(`${newItem.name} is already at the maximum quantity.`, "info");
      return;
    }
    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.key === newItem.key);
      if (existing) {
        return currentItems.map((item) =>
          item.key === newItem.key
            ? { ...item, quantity: Math.min(item.quantity + 1, 50) }
            : item,
        );
      }
      return [...currentItems, newItem];
    });
    notify(`${newItem.name} added to cart.`, "success");
  };

  const setQuantity = (key, quantity) => {
    const item = items.find((cartItem) => cartItem.key === key);
    if (!item) return;
    if (quantity < 1) {
      setItems((currentItems) => currentItems.filter((cartItem) => cartItem.key !== key));
      notify(`${item.name} removed from cart.`, "info");
      return;
    }
    const updatedQuantity = Math.min(quantity, 50);
    setItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.key === key ? { ...cartItem, quantity: updatedQuantity } : cartItem,
      ),
    );
    if (updatedQuantity !== item.quantity) {
      notify(`${item.name} quantity updated to ${updatedQuantity}.`, "info");
    }
  };

  const removeItem = (key) => {
    const item = items.find((cartItem) => cartItem.key === key);
    if (!item) return;
    setItems((currentItems) => currentItems.filter((cartItem) => cartItem.key !== key));
    notify(`${item.name} removed from cart.`, "info");
  };
  const clearCart = () => setItems([]);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce(
    (sum, item) =>
      sum +
      (item.basePrice +
        item.toppingOptions.reduce((extra, option) => extra + option.price, 0) +
        item.addOns.reduce((extra, option) => extra + option.price, 0)) *
        item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ items, count, total, addItem, setQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
