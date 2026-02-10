import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/store/types";

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [] as Product[] },
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      action.payload.id = state.items.length + 1;
      state.items.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.code !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (p) => p.code === action.payload.code
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { updateProduct, deleteProduct, addProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
