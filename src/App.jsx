// src/App.jsx

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonateBlood from "./pages/DonateBlood";
import FindDonor from "./pages/FindDonor";
import RequestBlood from "./pages/RequestBlood";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donate" element={<DonateBlood />} />
        <Route path="/find-donor" element={<FindDonor />} />
        <Route path="/request-blood" element={<RequestBlood />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;