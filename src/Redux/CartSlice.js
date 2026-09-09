
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",

  initialState: {
    cart: []
  },

  reducers: {
    addFood: (state, action) => {
      const existingFood = state.cart.find(
        food => food.id === action.payload.id
      )

      if (existingFood) {
        existingFood.quantity += 1
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1
        })
      }
    },
    removeFood: (state, action) => {
  state.cart = state.cart.filter(
    food => food.id !== action.payload
  );
},

ClearFood: (state) => {
  state.cart = [];
},

incrementFood: (state, action) => {
  const cart = state.cart.find(
    food => food.id === action.payload
  );

  if (cart) {
    cart.quantity += 1;
  }
},

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
export const { addFood 
    ,removeFood,ClearFood,incrementFood,decrementFood
} = CartSlice.actions;

export default CartSlice.reducer;