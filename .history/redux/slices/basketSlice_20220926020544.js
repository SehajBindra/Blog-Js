import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addtoBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removefromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        // the item exists in the basket ... remove it
        newBasket.splice(index, 1);
        // splice is basically is cutting out
      } else {
        console.warn(
          `cant remove Product (id: ${action.payload.id}) as it is not inn the Basket `
        );
      }
      state.items = newBasket;
    },
  },
});

export const { addtoBasket, removefromBasket } = basketSlice.actions;
// selectors : this is how we pull information from global store

export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);
export default basketSlice.reducer;
