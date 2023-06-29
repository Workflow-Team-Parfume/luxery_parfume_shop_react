import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryListPage from "./compnents/admin/category/list/CategoryListPage";
import CategoryCreatePage from "./compnents/admin/category/create/CategoryCreatePage";
import CategoryEditPage from "./compnents/admin/category/edit/CategoryEditPage";
import AdminLayout from "./compnents/admin/container/AdminLayout";
import AdminDashboard from "./compnents/admin/dashboard/AdminDashboard";
import HomePage from "./compnents/home/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="category">
            <Route index element={<CategoryListPage />} />
            <Route path="create" element={<CategoryCreatePage />} />
            <Route path="edit">
              <Route path=":id" element={<CategoryEditPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;