import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    bloodGroup: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
  "http://localhost:5000/api/users/register",
  {
    name: formData.name,
    email: formData.email,
    mobile: formData.mobile,
    bloodGroup: formData.bloodGroup,
    city: formData.city,
    password: formData.password,
  }
);

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
  console.log("FULL ERROR:", error);

  if (error.response) {
    console.log("SERVER RESPONSE:", error.response.data);
    alert(JSON.stringify(error.response.data));
  } else {
    alert(error.message);
  }
}
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
          
          <input
  type="text"
  name="city"
  placeholder="City"
  value={formData.city}
  onChange={handleChange}
  className="border p-4 rounded-xl"
  required
/>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border p-4 rounded-xl"
            required
          />

          <button
            type="submit"
            className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;