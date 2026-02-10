import { Route, Routes, Navigate } from "react-router-dom"; // 1. Importe o Navigate
import EmptyState from "@/components/EmptyState";
import ResourceEditor from "@/components/ResourceEditor";
import MainLayout from "@/layouts/MainLayout";
import MaterialsLayout from "@/layouts/MaterialsLayout";
import ProductsLayout from "@/layouts/ProductsLayout";
// import ErrorPage from "@/pages/ErrorPage"; // Não precisa mais se for redirecionar sempre

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<ProductsLayout />} path="/products">
          <Route
            element={<EmptyState message="Selecione um produto para editar" />}
            index
          />
          <Route element={<ResourceEditor mode="product" />} path=":id" />
        </Route>

        <Route element={<MaterialsLayout />} path="/raw-materials">
          <Route
            element={
              <EmptyState message="Selecione uma matéria-prima para editar" />
            }
            index
          />
          <Route element={<ResourceEditor mode="material" />} path=":id" />
        </Route>

        <Route
          path="/error"
          element={<EmptyState message="Página não encontrada" />}
        />

        <Route path="/" element={<Navigate to="/products" replace />} />

        <Route
          path="*"
          element={<EmptyState message="Página não encontrada" />}
        />
      </Route>
    </Routes>
  );
}
