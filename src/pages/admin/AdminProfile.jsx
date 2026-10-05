import { useEffect, useState } from "react";
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
  Loader2,
  AlertCircle,
} from "lucide-react";

function AdminProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    role: "Administrator",
    createdAt: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GET ADMIN PROFILE
  // ==========================================
  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        setError("Admin session not found. Please login again.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/admin/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(
        "ADMIN PROFILE RESPONSE:",
        response.data
      );

      const admin = response.data?.admin;

      if (!admin) {
        throw new Error(
          "Admin profile data not found."
        );
      }

      const profileData = {
        name: admin.name || "",
        email: admin.email || "",
        mobile: admin.mobile || "",
        city: admin.city || "",
        role: admin.role || "Administrator",
        createdAt: admin.createdAt || "",
      };

      setFormData(profileData);

      // Keep localStorage synchronized
      localStorage.setItem(
        "adminInfo",
        JSON.stringify(admin)
      );
    } catch (error) {
      console.error(
        "LOAD ADMIN PROFILE ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load admin profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PROFILE ON PAGE OPEN
  // ==========================================
  useEffect(() => {
    loadProfile();
  }, []);

  // ==========================================
  // INPUT CHANGE
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================
  const updateProfile = async () => {
    try {
      setSaving(true);
      setError("");

      const token =
        localStorage.getItem("adminToken");

      if (!token) {
        setError(
          "Admin session expired. Please login again."
        );
        return;
      }

      // Basic validation
      if (!formData.name.trim()) {
        setError("Name is required.");
        return;
      }

      if (!formData.mobile.trim()) {
        setError("Mobile number is required.");
        return;
      }

      if (
        !/^[0-9]{10}$/.test(
          formData.mobile.trim()
        )
      ) {
        setError(
          "Mobile number must contain exactly 10 digits."
        );
        return;
      }

      if (!formData.city.trim()) {
        setError("City is required.");
        return;
      }

      const updateData = {
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        city: formData.city.trim(),
      };

      console.log(
        "UPDATING ADMIN PROFILE:",
        updateData
      );

      const response = await axios.put(
        "http://localhost:5000/api/admin/profile",
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "UPDATE PROFILE RESPONSE:",
        response.data
      );

      const updatedAdmin =
        response.data?.admin;

      if (!updatedAdmin) {
        throw new Error(
          "Updated admin data was not returned by server."
        );
      }

      // Update React state
      setFormData({
        name: updatedAdmin.name || "",
        email: updatedAdmin.email || "",
        mobile: updatedAdmin.mobile || "",
        city: updatedAdmin.city || "",
        role:
          updatedAdmin.role ||
          "Administrator",
        createdAt:
          updatedAdmin.createdAt || "",
      });

      // Update localStorage
      localStorage.setItem(
        "adminInfo",
        JSON.stringify(updatedAdmin)
      );

      setEditing(false);

      alert(
        response.data?.message ||
          "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "UPDATE ADMIN PROFILE ERROR:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to update profile.";

      setError(message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const handleCancel = () => {
    setEditing(false);

    const storedAdmin = JSON.parse(
      localStorage.getItem("adminInfo") ||
        "{}"
    );

    setFormData({
      name: storedAdmin.name || "",
      email: storedAdmin.email || "",
      mobile: storedAdmin.mobile || "",
      city: storedAdmin.city || "",
      role:
        storedAdmin.role ||
        "Administrator",
      createdAt:
        storedAdmin.createdAt || "",
    });

    setError("");
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">

        <div className="text-center">

          <Loader2
            size={40}
            className="text-red-600 animate-spin mx-auto"
          />

          <p className="text-gray-500 mt-4">
            Loading admin profile...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================
  return (
    <div className="max-w-6xl mx-auto">

      {/* ERROR */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 flex items-start gap-3">

          <AlertCircle
            size={22}
            className="flex-shrink-0 mt-0.5"
          />

          <div>
            <p className="font-semibold">
              Profile Error
            </p>

            <p className="text-sm mt-1">
              {error}
            </p>
          </div>

        </div>
      )}

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* ======================================
            COVER
        ====================================== */}

        <div className="h-48 bg-gradient-to-r from-red-600 via-red-500 to-pink-500" />

        <div className="px-6 md:px-10 pb-10">

          {/* ======================================
              PROFILE HEADER
          ====================================== */}

          <div className="-mt-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">

              {/* AVATAR */}

              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  formData.name || "Admin"
                )}&background=dc2626&color=fff&size=200`}
                alt="Admin"
                className="w-32 h-32 rounded-full border-[6px] border-white shadow-lg"
              />

              {/* NAME */}

              <div>

                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-2xl md:text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900">
                    {formData.name || "Admin"}
                  </h1>
                )}

                <p className="text-gray-500 mt-2">
                  {formData.role}
                </p>

              </div>

            </div>

            {/* ACTION BUTTONS */}

            {!editing ? (

              <button
                onClick={() => {
                  setEditing(true);
                  setError("");
                }}
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                <Edit size={18} />
                Edit Profile
              </button>

            ) : (

              <div className="flex flex-wrap gap-3">

                <button
                  onClick={updateProfile}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-6 py-3 rounded-xl font-semibold transition"
                >

                  {saving ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save
                    </>
                  )}

                </button>

                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition"
                >
                  <X size={18} />
                  Cancel
                </button>

              </div>

            )}

          </div>

          {/* ======================================
              INFORMATION CARDS
          ====================================== */}

          <div className="grid lg:grid-cols-2 gap-8 mt-12">

            {/* ====================================
                PERSONAL INFORMATION
            ==================================== */}

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">

              <h2 className="text-2xl font-bold mb-8">
                Personal Information
              </h2>

              <div className="space-y-7">

                {/* EMAIL */}

                <div className="flex gap-4">

                  <Mail
                    className="text-red-600 mt-1 flex-shrink-0"
                    size={25}
                  />

                  <div className="w-full">

                    <p className="text-sm text-gray-500 mb-2">
                      Email
                    </p>

                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full bg-gray-200 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 cursor-not-allowed"
                    />

                  </div>

                </div>

                {/* MOBILE */}

                <div className="flex gap-4">

                  <Phone
                    className="text-red-600 mt-1 flex-shrink-0"
                    size={25}
                  />

                  <div className="w-full">

                    <p className="text-sm text-gray-500 mb-2">
                      Mobile
                    </p>

                    <input
                      type="text"
                      name="mobile"
                      disabled={!editing}
                      value={formData.mobile}
                      onChange={handleChange}
                      maxLength={10}
                      className={`w-full rounded-lg px-4 py-3 border ${
                        editing
                          ? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                          : "bg-gray-200 border-gray-200"
                      }`}
                    />

                  </div>

                </div>

                {/* CITY */}

                <div className="flex gap-4">

                  <MapPin
                    className="text-red-600 mt-1 flex-shrink-0"
                    size={25}
                  />

                  <div className="w-full">

                    <p className="text-sm text-gray-500 mb-2">
                      City
                    </p>

                    <input
                      type="text"
                      name="city"
                      disabled={!editing}
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full rounded-lg px-4 py-3 border ${
                        editing
                          ? "bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                          : "bg-gray-200 border-gray-200"
                      }`}
                    />

                  </div>

                </div>

                {/* ROLE */}

                <div className="flex gap-4">

                  <Shield
                    className="text-red-600 mt-1 flex-shrink-0"
                    size={25}
                  />

                  <div>

                    <p className="text-sm text-gray-500">
                      Role
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {formData.role}
                    </p>

                  </div>

                </div>

                {/* JOINED */}

                <div className="flex gap-4">

                  <Calendar
                    className="text-red-600 mt-1 flex-shrink-0"
                    size={25}
                  />

                  <div>

                    <p className="text-sm text-gray-500">
                      Joined
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {formData.createdAt
                        ? new Date(
                            formData.createdAt
                          ).toLocaleDateString()
                        : "Not available"}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* ====================================
                ACCOUNT SUMMARY
            ==================================== */}

            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">

              <h2 className="text-2xl font-bold mb-8">
                Account Summary
              </h2>

              <div className="grid grid-cols-2 gap-5">

                {/* ROLE */}

                <div className="bg-white rounded-xl p-5 shadow-sm">

                  <h4 className="text-gray-500">
                    Role
                  </h4>

                  <p className="text-xl md:text-2xl font-bold text-red-600 mt-2 break-words">
                    {formData.role}
                  </p>

                </div>

                {/* STATUS */}

                <div className="bg-white rounded-xl p-5 shadow-sm">

                  <h4 className="text-gray-500">
                    Status
                  </h4>

                  <p className="text-2xl font-bold text-green-600 mt-2">
                    Active
                  </p>

                </div>

                {/* ACCESS */}

                <div className="bg-white rounded-xl p-5 shadow-sm">

                  <h4 className="text-gray-500">
                    Access
                  </h4>

                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    Full
                  </p>

                </div>

                {/* SECURITY */}

                <div className="bg-white rounded-xl p-5 shadow-sm">

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