import React from "react";
import { Route, Routes } from "react-router-dom";
import { isUserAdmin, ProtectedRoute } from "./helpers";
import { useUser } from "./hooks";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  ProductFormPage,
  CategoryProductsPage,
  SingleProductPage,
} from "./pages";

export const RoutesComponent = () => {
  const { userData } = useUser();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/products/new"
        element={
          <ProtectedRoute isUserAdmin={isUserAdmin(userData)}>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:name"
        element={
          <ProtectedRoute isUserAdmin={isUserAdmin(userData)}>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/categories/:categoryName"
        element={<CategoryProductsPage />}
      />
      <Route
        path="/products/categories/:categoryName/:id"
        element={<SingleProductPage />}
      />
    </Routes>
  );
};
