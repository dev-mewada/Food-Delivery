import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",

  initialState: {
    searchText: ""
  },

  reducers: {
    setSearch: (state, action) => {
      state.searchText = action.payload;
    }
  }
});

export const { setSearch } = SearchSlice.actions;

export default SearchSlice.reducer;