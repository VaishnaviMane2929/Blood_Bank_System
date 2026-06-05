import { Mail, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Login Submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/users/login",
      {
        email: formData.email,
        password: formData.password,
      }
    );

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    alert("Login Successful");

    navigate("/user-dashboard");

  } catch (error) {
  console.log("LOGIN ERROR:", error);

  if (error.response) {
    console.log(error.response.data);
    alert(JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }
}
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="bg-red-600 text-white p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold leading-tight">
            Welcome Back
          </h1>

          <p className="mt-6 text-lg text-red-100">
            Login to continue saving lives through blood donation.
          </p>

          <img
            src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-7988.jpg"
            alt="Blood Donation"
            className="mt-10 rounded-2xl"
          />
        </div>

        {/* Right Side */}
        <div className="p-10 lg:p-14">

          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Login
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your details to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}
            <div>
              <label className="font-medium text-gray-700">
                Email Address
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <Mail className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="font-medium text-gray-700">
                Password
              </label>

              <div className="flex items-center border rounded-xl mt-2 px-4">
                <LockKeyhole className="text-gray-400" />

                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
            

            <div className="text-center mt-5">
  <button
    type="button"
    onClick={() => navigate("/admin-login")}
    className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition"
  >
    Admin Login
  </button>
</div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;