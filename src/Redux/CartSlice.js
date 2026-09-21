import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: []
  },

  reducers: {

    // Add food to Redux cart
    addFood: (state, action) => {
      const existingFood = state.cart.find(
        food => food.id === action.payload.id
      );

      if (existingFood) {
        existingFood.quantity += 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1
        });
      }
    },

    // Load cart from database
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    // Remove food
    removeFood: (state, action) => {
      state.cart = state.cart.filter(
        food => food.id !== action.payload
      );
    },

    // Clear complete cart
    ClearFood: (state) => {
      state.cart = [];
    },

    // Increase quantity
    incrementFood: (state, action) => {
      const cart = state.cart.find(
        food => food.id === action.payload
      );

      if (cart) {
        cart.quantity += 1;
      }
    },

    // Decrease quantity
    decrementFood: (state, action) => {
      const cart = state.cart.find(
        food => food.id === action.payload
      );

      if (cart && cart.quantity > 1) {
        cart.quantity -= 1;
      }
    }
  }
});

export const {
  addFood,
  setCart,
  removeFood,
  ClearFood,
  incrementFood,
  decrementFood
} = CartSlice.actions;

export default CartSlice.reducer;