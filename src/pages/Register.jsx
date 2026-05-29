// src/pages/Register.jsx

function Register() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full">
        
        <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
          Create Account
        </h1>

        <form className="grid md:grid-cols-2 gap-6">
          
          <input
            type="text"
            placeholder="Full Name"
            className="border p-4 rounded-xl outline-red-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border p-4 rounded-xl outline-red-500"
          />

          <input
            type="text"
            placeholder="Mobile Number"
            className="border p-4 rounded-xl outline-red-500"
          />

          <select className="border p-4 rounded-xl outline-red-500">
            <option>Select Blood Group</option>
            <option>A+</option>
            <option>B+</option>
            <option>O+</option>
          </select>

          <input
            type="password"
            placeholder="Password"
            className="border p-4 rounded-xl outline-red-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-4 rounded-xl outline-red-500"
          />

          <button className="md:col-span-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;