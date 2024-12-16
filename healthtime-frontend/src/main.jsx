import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import FindSoignant from "./pages/home/FindSoignant.jsx";
import FindSpecialite from "./pages/home/FindSpecialite.jsx";
import Login from "./pages/auth/Login.jsx";
import ForgotPwd from "./pages/auth/ForgotPwd.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import Register from "./pages/auth/Register.jsx";
import Demandes from "./pages/admin/Demandes.jsx";
import DashboardAdmin from "./pages/admin/DashboardAdmin.jsx"
import RendezVous from "./pages/patient/RendezVous.jsx"
import DashboardPatient from "./pages/patient/DashboardPatient.jsx"
import Profil from "./pages/soignant/Profil.jsx"
import DashboardSoignant from "./pages/soignant/DashboardSoignant.jsx"
import Patients from "./pages/admin/Patients.jsx"
import Soignants from "./pages/admin/Soignants.jsx"
import Specialites from "./pages/admin/Specialites.jsx"
import Statistiques from "./pages/admin/Statistiques.jsx"
import CalendarRendezVous from "./pages/soignant/CalendarRendezVous.jsx";
import PatientsList from "./pages/soignant/PatientsList.jsx";
import ProfilPatient from "./pages/patient/ProfilPatient.jsx"
import Dossiers from "./pages/patient/Dossiers.jsx";
const storedUserData = JSON.parse(localStorage.getItem('userData'));
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {
          !storedUserData && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPwd />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
            </>
          )
        }
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/search/soignants/:id" element={<FindSoignant />}/>
        <Route path="/search/specialites/:specialiteId/:villeId" element={<FindSpecialite />}/>

        {/* Admin Routes */}
        {storedUserData && storedUserData.role === "ADMIN" && (
          <>
            <Route path="/admin/dashboard" element={<DashboardAdmin/>} />
            <Route path="/admin/soignants" element={<Soignants />} />
            <Route path="/admin/patients" element={<Patients />} />
            <Route path="/admin/demandes" element={<Demandes />} />
            <Route path="/admin/specialites" element={<Specialites />} />
            <Route path="/admin/statistiques" element={<Statistiques />} />
          </>
        )}

        {/* Soignant Routes */}
        {storedUserData && storedUserData.role === "SOIGNANT" && (
          <>
            <Route path="/soignant/dashboard" element={<DashboardSoignant />} />
            <Route path="/soignant/profil" element={<Profil />} />
            <Route path="/soignant/rendez-vous" element={<CalendarRendezVous />} />
            <Route path="/soignant/patients" element={<PatientsList />} />
          </>
        )}

        {/* Patient Routes */}
        {storedUserData && storedUserData.role === "PATIENT" && (
          <>
            <Route path="/patient/dashboard" element={<DashboardPatient />} />
            <Route path="/patient/rendez-vous" element={<RendezVous />} />
            <Route path="/patient/dossiers" element={<Dossiers />} />
            <Route path="/patient/profil" element={<ProfilPatient />} />
          </>
        )}

        {/* Redirect to Home if Route Not Found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
