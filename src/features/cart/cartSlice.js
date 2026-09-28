import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        product.amount += 1;
      } else {
        const updatedProduct = { ...action.payload, amount: 1 };
        state.items.push(updatedProduct);
      }
    },
    remove: (state, action) => {
      const product = state.items.find((item) => item.id === action.payload.id);
      if (product) {
        if (product.amount === 1) {
          const newItems = state.items.filter((item) => item.id !== product.id);
          return { ...state, items: newItems };
        } else {
          product.amount -= 1;
        }
      }
    },
  },
  selectors: {
    selectAmount: (state) =>
      state.items.reduce((sum, item) => sum + item.amount, 0),
    selectTotal: (state) =>
      state.items.reduce((sum, item) => sum + item.amount * item.price, 0),
    selectProductAmount: (state, product) =>
      state.items.find((item) => item.id === product.id)?.amount ?? 0,
  },
});

export const { add, remove } = cartSlice.actions;
export const { selectAmount, selectTotal, selectProductAmount } =
  cartSlice.selectors;
export default cartSlice.reducer;
