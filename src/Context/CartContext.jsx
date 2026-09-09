import { createContext, useContext, useState } from "react";

const CartContext = createContext();


export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);


  const addToCart = (food) => {

    setCartItems((previousItems) => {

      const existingItem = previousItems.find(
        (item) => item.id === food.id
      );


      if (existingItem) {

        return previousItems.map((item) =>
          item.id === food.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );

      }


      return [
        ...previousItems,
        {
          ...food,
          quantity: 1
        }
      ];

    });

  };


  const removeFromCart = (id) => {

    setCartItems((previousItems) =>
      previousItems.filter(
        (item) => item.id !== id
      )
    );

  };


  const increaseQuantity = (id) => {

    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    );

  };


  const decreaseQuantity = (id) => {

    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );

  };


  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );

}


export function useCart() {

  return useContext(CartContext);

}