import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product, ProductionPlan } from "@/store/types";
import { VITE_API_BASE_URL } from "@/lib/consts";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${VITE_API_BASE_URL}/products`,
  }),
  tagTypes: ["Product", "Plan"],
  endpoints: (builder) => ({
    addProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: "/",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<void, Product>({
      query: (product) => ({
        url: `/${product.id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getProducts: builder.query<Product[], void>({
      query: () => "/",
      providesTags: ["Product"],
    }),
    getProductionPlan: builder.query<ProductionPlan[], void>({
      query: () => ({
        url: `${VITE_API_BASE_URL}/planning`,
      }),
      providesTags: ["Plan"],
    }),
    addRawMaterialToProduct: builder.mutation<
      void,
      { productId: number; materialId: number; quantity: number }
    >({
      query: ({ productId, materialId, quantity }) => ({
        url: `/${productId}/raw-materials`,
        method: "POST",
        body: { rawMaterialId: materialId, quantity },
      }),
      invalidatesTags: ["Product"],
    }),
    removeRawMaterialFromProduct: builder.mutation<
      void,
      { productId: number; materialId: number }
    >({
      query: ({ productId, materialId }) => ({
        url: `/${productId}/raw-materials/${materialId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateRawMaterialQuantity: builder.mutation<
      void,
      { productId: number; rawMaterialId: number; quantity: number }
    >({
      query: ({ productId, rawMaterialId, quantity }) => ({
        url: `/${productId}/raw-materials/${rawMaterialId}`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: ["Product"],
    }),
    getMaxUnitsByProduct: builder.query<
      { productId: number; maxUnits: number },
      number
    >({
      query: (productId) => `/${productId}/max-units`,
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useAddRawMaterialToProductMutation,
  useRemoveRawMaterialFromProductMutation,
  useUpdateRawMaterialQuantityMutation,
  useGetMaxUnitsByProductQuery,
  useGetProductionPlanQuery,
} = productsApi;
