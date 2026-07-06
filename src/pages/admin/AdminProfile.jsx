import { useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  Shield,
  Calendar,
  MapPin,
  Edit,
  Save,
  X,
} from "lucide-react";

function AdminProfile() {
  const storedAdmin = JSON.parse(
    localStorage.getItem("adminInfo") || "{}"
  );

  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: storedAdmin?.name || "",
    email: storedAdmin?.email || "",
    mobile: storedAdmin?.mobile || "",
    city: storedAdmin?.city || "",
    role: storedAdmin?.role || "Administrator",
    createdAt: storedAdmin?.createdAt || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const updateProfile = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("ADMIN ID:", req.adminId);
    try {
     const token = localStorage.getItem("adminToken");

await axios.put(

"http://localhost:5000/api/admin/profile",

formData,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


      useEffect(() => {

loadProfile();

}, []);

const loadProfile = async () => {

const token =
localStorage.getItem("adminToken");

const res =
await axios.get(

"http://localhost:5000/api/admin/profile",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);

setFormData(res.data.admin);

localStorage.setItem(
"adminInfo",
JSON.stringify(res.data.admin)
);

};

      alert("Profile Updated Successfully");

      setEditing(false);
    } catch (error) {
  console.log("ERROR:", error);

  if (error.response) {
    console.log("Status:", error.response.status);
    console.log("Data:", error.response.data);
    alert(error.response.data.message);
  } else {
    alert(error.message);{}y
  }
}
 }

  return (
    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Cover */}

        <div className="h-48 bg-gradient-to-r from-red-600 via-red-500 to-pink-500"></div>

        <div className="px-10 pb-10">

          {/* Header */}

          <div className="-mt-16 flex justify-between items-end">

            <div className="flex items-center gap-6">

              <img
                src={`https://ui-avatars.com/api/?name=${formData.name}&background=dc2626&color=fff&size=200`}
                alt=""
                className="w-32 h-32 rounded-full border-[6px] border-white shadow-lg"
              />

              <div>

                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded-lg px-3 py-2 text-3xl font-bold"
                  />
                ) : (
                  <h1 className="text-3xl font-bold">
                    {formData.name}
                  </h1>
                )}

                <p className="text-gray-500 mt-1">
                  {formData.role}
                </p>

              </div>

            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"
              >
                <Edit size={18} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">

                <button
                  onClick={updateProfile}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
                >
                  <Save size={18} />
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditing(false);
                    setFormData(storedAdmin);
                  }}
                  className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl"
                >
                  <X size={18} />
                  Cancel
                </button>

              </div>
            )}

          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            {/* Personal */}

            <div className="bg-gray-50 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Personal Information
              </h2>

              <div className="space-y-6">

                {/* Email */}

                <div className="flex gap-4">

                  <Mail className="text-red-600 mt-1" />

                  <div className="w-full">

                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-gray-200 rounded-lg px-3 py-2"
                    />

                  </div>

                </div>

                {/* Mobile */}

                <div className="flex gap-4">

                  <Phone className="text-red-600 mt-1" />

                  <div className="w-full">

                    <p className="text-sm text-gray-500">
                      Mobile
                    </p>

                    <input
                      type="text"
                      name="mobile"
                      disabled={!editing}
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-3 py-2 border ${
                        editing
                          ? "bg-white"
                          : "bg-gray-200"
                      }`}
                    />

                  </div>

                </div>

                {/* City */}

                <div className="flex gap-4">

                  <MapPin className="text-red-600 mt-1" />

                  <div className="w-full">

                    <p className="text-sm text-gray-500">
                      City
                    </p>

                    <input
                      type="text"
                      name="city"
                      disabled={!editing}
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-3 py-2 border ${
                        editing
                          ? "bg-white"
                          : "bg-gray-200"
                      }`}
                    />

                  </div>

                </div>

                {/* Role */}

                <div className="flex gap-4">

                  <Shield className="text-red-600 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Role
                    </p>

                    <p className="font-semibold">
                      {formData.role}
                    </p>

                  </div>

                </div>

                {/* Joined */}

                <div className="flex gap-4">

                  <Calendar className="text-red-600 mt-1" />

                  <div>

                    <p className="text-sm text-gray-500">
                      Joined
                    </p>

                    <p className="font-semibold">
                      {formData.createdAt
                        ? new Date(
                            formData.createdAt
                          ).toLocaleDateString()
                        : "2026"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Summary */}

            <div className="bg-gray-50 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Account Summary
              </h2>

              <div className="grid grid-cols-2 gap-5">

                <div className="bg-white rounded-xl p-5 shadow">
                  <h4 className="text-gray-500">
                    Role
                  </h4>

                  <p className="text-2xl font-bold text-red-600 mt-2">
                    {formData.role}
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow">
                  <h4 className="text-gray-500">
                    Status
                  </h4>

                  <p className="text-2xl font-bold text-green-600 mt-2">
                    Active
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow">
                  <h4 className="text-gray-500">
                    Access
                  </h4>

                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    Full
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow">
                  <h4 className="text-gray-500">
                    Security
                  </h4>

                  <p className="text-2xl font-bold text-purple-600 mt-2">
                    Enabled
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProfile;
