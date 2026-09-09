import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import searchReducer from "./SearchSlice";

const Store = configureStore({
  reducer: {
    cart: cartReducer,
    search: searchReducer
  }
});

export default Store;