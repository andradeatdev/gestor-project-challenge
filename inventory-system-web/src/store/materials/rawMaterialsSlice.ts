import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RawMaterial } from "@/store/types";

const rawMaterialsSlice = createSlice({
  name: "rawMaterials",
  initialState: { items: [] as RawMaterial[] },
  reducers: {
    addRawMaterial: (state, action: PayloadAction<RawMaterial>) => {
      action.payload.id = state.items.length + 1;
      state.items.push(action.payload);
    },
    deleteRawMaterial: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.code !== action.payload);
    },
    updateRawMaterial: (state, action: PayloadAction<RawMaterial>) => {
      const index = state.items.findIndex(
        (p) => p.code === action.payload.code
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addRawMaterial, deleteRawMaterial, updateRawMaterial } =
  rawMaterialsSlice.actions;
export default rawMaterialsSlice.reducer;
