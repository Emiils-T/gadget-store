import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    let foundProduct = null;
    if (cartItems.length != null) {
      foundProduct = cartItems.find((item) => item.id === product.id);
    }
    if (foundProduct) {
      setCartItems(
        cartItems.map((item) => {
          if (item.id === product.id) {
            const newAmount = item.amount + 1;
            return { ...item, amount: newAmount };
          } else {
            return item;
          }
        }),
      );
    } else {
      const updatedProduct = { ...product, amount: 1 };
      const newCart = [...cartItems, updatedProduct];
      setCartItems(newCart);
    }
  };

  //TODO: add functionality
  const removeFromCart = (product) => {
    let foundProduct = null;
    const updatedArray = [...cartItems];
    foundProduct = updatedArray.find((obj) => obj.id === product.id);
    if (!foundProduct) {
      return;
    }

    if (foundProduct.amount == 1) {
      setCartItems(cartItems.filter((item) => item.id != foundProduct.id));
    } else {
      foundProduct.amount = foundProduct.amount - 1;
      setCartItems(updatedArray);
    }
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
