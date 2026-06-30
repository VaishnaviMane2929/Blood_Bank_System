import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/adminApi";

function AdminLogin() {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await adminLogin(formData);

console.log("LOGIN RESPONSE:", res);

  if (res.success) {
  localStorage.setItem(
    "adminInfo",
    JSON.stringify(res.admin)
  );

  localStorage.setItem(
    "adminToken",
    res.token
  );

  navigate("/admin-dashboard");
}

    navigate("/admin-dashboard");

  } catch (error) {
    alert("Invalid Credentials");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow w-[400px]"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
        />

        <button
          className="w-full bg-red-600 text-white py-3 rounded-lg"
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default AdminLogin;