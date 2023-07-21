import React from "react";
import { Routes, Route } from "react-router-dom";
import CategoryListPage from "./compnents/admin/category/list/CategoryListPage";
import CategoryCreatePage from "./compnents/admin/category/create/CategoryCreatePage";
import CategoryEditPage from "./compnents/admin/category/edit/CategoryEditPage";
import AdminLayout from "./compnents/admin/container/AdminLayout";
import AdminDashboard from "./compnents/admin/dashboard/AdminDashboard";
import HomePage from "./compnents/home/HomePage";
import LoginPage from "./compnents/auth/login/LoginPage";
import RegisterPage from "./compnents/auth/register/RegisterPage";
import Loader from "./compnents/common/loader/Loader";
import { IAuthUser } from "./compnents/auth/types";
import { useSelector } from "react-redux";

function App() {
  const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);
  return (
    <>
      <Loader />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* {user?.role === "admin" && isAuth ? ( */}
          <Route path={"/admin"} element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="category">
              <Route index element={<CategoryListPage />} />
              <Route path="create" element={<CategoryCreatePage />} />
              <Route path="edit">
                <Route path=":id" element={<CategoryEditPage />} />
              </Route>
            </Route>
          </Route>
          {/* ) : (
            <Route path="admin" element={<LoginPage />} />
          )} */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
