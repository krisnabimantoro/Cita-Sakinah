import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NotFoundPage from "./pages/notfound";
import DefaultLayout from "./layouts/default";
import AdminLayout from "./layouts/admin";

import HomePage from "./pages/main/home/home";
import KontakPage from "./pages/main/kontak/kontak";
import StrukturPage from "./pages/main/struktur/struktur";

import InformasiPage from "./pages/main/informasi/informasi";
import DetailInforPage from "./pages/main/informasi/detail/detailinfor";

import KegiatanPage from "./pages/main/kegiatan/kegiatan";
import DetailKegPage from "./pages/main/kegiatan/detail/detailkeg";

import SekolahPage from "./pages/main/profil/sekolah/sekolah";
import FasilitasPage from "./pages/main/profil/fasilitas/fasilitas";

import LoginPage from "./pages/auth/login";

import axios from "axios";
import DashboardAdminPage from "./pages/admin/dashboard/dashboard";
import FasilitasAdminPage from "./pages/admin/fasilitas/fasilitas";
import InformasiAdminPage from "./pages/admin/informasi/informasi";
import KegiatanAdminPage from "./pages/admin/kegiatan/kegiatan";
import StrukturAdminPage from "./pages/admin/struktur/struktur";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  const location = useLocation();

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#043F2D", color: "#ffff" },
        }}
      />
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route
          path="/"
          element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          }
        />

        <Route path="/profil">
          <Route
            path=":singkatan"
            element={
              <DefaultLayout>
                <SekolahPage />
              </DefaultLayout>
            }
          />
          <Route
            path="fasilitas"
            element={
              <DefaultLayout>
                <FasilitasPage />
              </DefaultLayout>
            }
          />
        </Route>

        <Route
          path="/struktur"
          element={
            <DefaultLayout>
              <StrukturPage />
            </DefaultLayout>
          }
        />

        <Route path="/kegiatan">
          <Route
            path=""
            element={
              <DefaultLayout>
                <KegiatanPage />
              </DefaultLayout>
            }
          />
          <Route
            path=":id"
            element={
              <DefaultLayout>
                <DetailKegPage />
              </DefaultLayout>
            }
          />
        </Route>

        <Route path="/informasi">
          <Route
            path=""
            element={
              <DefaultLayout>
                <InformasiPage />
              </DefaultLayout>
            }
          />
          <Route
            path=":id"
            element={
              <DefaultLayout>
                <DetailInforPage />
              </DefaultLayout>
            }
          />
        </Route>

        <Route
          path="/kontak"
          element={
            <DefaultLayout>
              <KontakPage />
            </DefaultLayout>
          }
        />

        <Route path="/auth">
          <Route path="login" element={<LoginPage />} />
        </Route>

        <Route path="/admin">
          <Route
            path="dashboard"
            element={
              <AdminLayout>
                <DashboardAdminPage />
              </AdminLayout>
            }
          />
          <Route
            path="kegiatan"
            element={
              <AdminLayout>
                <KegiatanAdminPage />
              </AdminLayout>
            }
          />
          <Route
            path="informasi"
            element={
              <AdminLayout>
                <InformasiAdminPage />
              </AdminLayout>
            }
          />
          <Route
            path="struktur"
            element={
              <AdminLayout>
                <StrukturAdminPage />
              </AdminLayout>
            }
          />
          <Route
            path="fasilitas"
            element={
              <AdminLayout>
                <FasilitasAdminPage />
              </AdminLayout>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;