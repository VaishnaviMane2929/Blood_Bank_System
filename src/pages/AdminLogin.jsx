import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "Admin123"
    ) {
      localStorage.setItem("admin", "true");

      alert("Admin Login Successful");

      navigate("/admin-dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-xl w-[500px]">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-8">
          Admin Login
        </h1>

        <form
          onSubmit={handleAdminLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border p-4 rounded-xl"
          />

          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border p-4 rounded-xl"
          />

          <button
            className="w-full bg-red-600 text-white py-4 rounded-xl"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;