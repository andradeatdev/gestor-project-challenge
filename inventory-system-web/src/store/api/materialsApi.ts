import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RawMaterial } from "@/store/types";

export const materialsApi = createApi({
  reducerPath: "materialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/raw-materials",
  }),
  tagTypes: ["Material"],
  endpoints: (builder) => ({
    getMaterials: builder.query<RawMaterial[], void>({
      query: () => "/",
      providesTags: ["Material"],
    }),
    addMaterial: builder.mutation<void, RawMaterial>({
      query: (material) => ({
        url: "/",
        method: "POST",
        body: material,
      }),
      invalidatesTags: ["Material"],
    }),
    updateMaterial: builder.mutation<void, RawMaterial>({
      query: (material) => ({
        url: `/${material.id}`,
        method: "PUT",
        body: material,
      }),
      invalidatesTags: ["Material"],
    }),
    deleteMaterial: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Material"],
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useAddMaterialMutation,
  useUpdateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApi;
