import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonateBlood from "./pages/DonateBlood";
import FindDonor from "./pages/FindDonor";
import RequestBlood from "./pages/RequestBlood";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

import AdminProtectedRoute from "./components/AdminProtectedRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";

function App() {
const location = useLocation();

const hideNavbarFooter =
location.pathname === "/admin-login" ||
location.pathname === "/admin-dashboard" ||
location.pathname === "/user-dashboard";

return (
<>
{!hideNavbarFooter && <Navbar />}


  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/register"
      element={<Register />}
    />

    <Route
      path="/donate"
      element={<DonateBlood />}
    />

    <Route
      path="/find-donor"
      element={<FindDonor />}
    />

    <Route
      path="/request-blood"
      element={<RequestBlood />}
    />

    {/* Admin Login */}
    <Route
      path="/admin-login"
      element={<AdminLogin />}
    />

    {/* User Dashboard */}
    <Route
      path="/user-dashboard"
      element={
        <UserProtectedRoute>
          <UserDashboard />
        </UserProtectedRoute>
      }
    />

    {/* Admin Dashboard */}
    <Route
      path="/admin-dashboard"
      element={
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      }
    />
  </Routes>

  {!hideNavbarFooter && <Footer />}
</>


);
}

export default App;
