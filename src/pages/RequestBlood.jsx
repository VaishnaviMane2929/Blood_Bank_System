// src/pages/RequestBlood.jsx

import { useState } from "react";

import {
  User,
  Building2,
  Droplets,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  HeartPulse,
} from "lucide-react";

import { addBloodRequest } from "../api/publicApi";

function RequestBlood() {
  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    patientName: "",
    hospital: "",
    bloodGroup: "",
    unitsRequired: "",
    city: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // BLOOD GROUPS
  // ==========================================

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];

  // ==========================================
  // INPUT HANDLER
  // ==========================================

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove messages while user edits
    setError("");
    setSuccess("");
  };

  // ==========================================
  // FORM SUBMIT
  // ==========================================

  const submitHandler = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !formData.patientName.trim() ||
      !formData.hospital.trim() ||
      !formData.bloodGroup ||
      !formData.unitsRequired ||
      !formData.city.trim() ||
      !formData.contact.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate units
    if (Number(formData.unitsRequired) <= 0) {
      setError("Required units must be greater than 0.");
      return;
    }

    // Validate contact
    if (!/^[0-9]{10}$/.test(formData.contact.trim())) {
      setError("Contact number must contain exactly 10 digits.");
      return;
    }

    try {
      setLoading(true);

      // ==========================================
      // DATA SENT TO BACKEND
      // ==========================================

      const requestData = {
        patientName: formData.patientName.trim(),
        hospital: formData.hospital.trim(),
        bloodGroup: formData.bloodGroup,
        unitsRequired: Number(formData.unitsRequired),
        city: formData.city.trim(),
        contact: formData.contact.trim(),
      };

      console.log("BLOOD REQUEST DATA:", requestData);

      // ==========================================
      // API CALL
      // ==========================================

      const response = await addBloodRequest(
        requestData
      );

      console.log("REQUEST RESPONSE:", response);

      if (response.success) {
        setSuccess(
          "Blood request submitted successfully."
        );

        // Reset form
        setFormData({
          patientName: "",
          hospital: "",
          bloodGroup: "",
          unitsRequired: "",
          city: "",
          contact: "",
        });
      } else {
        setError(
          response.message ||
            "Unable to submit blood request."
        );
      }
    } catch (error) {
      console.error(
        "ADD BLOOD REQUEST ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ======================================
          HERO
      ====================================== */}

      <section className="bg-red-600 text-white py-16">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-semibold">
              <HeartPulse size={18} />
              BLOOD SUPPORT
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mt-6">
              Request Blood
            </h1>

            <p className="text-red-100 text-lg mt-4 leading-8">
              Submit a blood request and provide the
              required details so our blood support
              network can assist you.
            </p>

          </div>

        </div>

      </section>

      {/* ======================================
          FORM SECTION
      ====================================== */}

      <section className="max-w-5xl mx-auto px-6 py-12">

        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          {/* FORM HEADER */}

          <div className="p-7 md:p-10 border-b border-gray-100">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Droplets size={28} />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Blood Request Details
                </h2>

                <p className="text-gray-500 mt-1">
                  Enter accurate patient and hospital
                  information.
                </p>

              </div>

            </div>

          </div>

          {/* ======================================
              SUCCESS MESSAGE
          ====================================== */}

          {success && (
            <div className="mx-7 md:mx-10 mt-7 bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">

              <CheckCircle
                size={23}
                className="text-green-600 mt-0.5 shrink-0"
              />

              <div>

                <h3 className="font-semibold text-green-800">
                  Request Submitted
                </h3>

                <p className="text-green-700 text-sm mt-1">
                  {success}
                </p>

              </div>

            </div>
          )}

          {/* ======================================
              ERROR MESSAGE
          ====================================== */}

          {error && (
            <div className="mx-7 md:mx-10 mt-7 bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">

              <AlertCircle
                size={23}
                className="text-red-600 mt-0.5 shrink-0"
              />

              <div>

                <h3 className="font-semibold text-red-800">
                  Request Failed
                </h3>

                <p className="text-red-700 text-sm mt-1">
                  {error}
                </p>

              </div>

            </div>
          )}

          {/* ======================================
              FORM
          ====================================== */}

          <form
            onSubmit={submitHandler}
            className="p-7 md:p-10"
          >

            <div className="grid md:grid-cols-2 gap-6">

              {/* PATIENT NAME */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient Name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="patientName"
                    value={formData.patientName}
                    onChange={inputHandler}
                    placeholder="Enter patient name"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  />

                </div>

              </div>

              {/* HOSPITAL */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Hospital Name
                </label>

                <div className="relative">

                  <Building2
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={inputHandler}
                    placeholder="Enter hospital name"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  />

                </div>

              </div>

              {/* BLOOD GROUP */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Blood Group
                </label>

                <div className="relative">

                  <Droplets
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none"
                  />

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={inputHandler}
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition bg-white"
                  >

                    <option value="">
                      Select Blood Group
                    </option>

                    {bloodGroups.map((group) => (
                      <option
                        key={group}
                        value={group}
                      >
                        {group}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

              {/* REQUIRED UNITS */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Required Units
                </label>

                <div className="relative">

                  <Droplets
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="unitsRequired"
                    value={formData.unitsRequired}
                    onChange={inputHandler}
                    placeholder="Enter required units"
                    min="1"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  />

                </div>

              </div>

              {/* CITY */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City
                </label>

                <div className="relative">

                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={inputHandler}
                    placeholder="Enter city"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  />

                </div>

              </div>

              {/* CONTACT */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Number
                </label>

                <div className="relative">

                  <Phone
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={inputHandler}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  />

                </div>

              </div>

            </div>

            {/* ======================================
                INFORMATION
            ====================================== */}

            <div className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-5">

              <div className="flex items-start gap-3">

                <AlertCircle
                  size={21}
                  className="text-red-600 mt-0.5 shrink-0"
                />

                <div>

                  <h3 className="font-semibold text-red-800">
                    Important Information
                  </h3>

                  <p className="text-sm text-red-700 mt-1 leading-6">
                    Please make sure the patient, hospital,
                    blood group and contact information are
                    accurate before submitting the request.
                  </p>

                </div>

              </div>

            </div>

            {/* ======================================
                SUBMIT BUTTON
            ====================================== */}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition"
            >

              {loading ? (
                <>
                  <Loader2
                    size={21}
                    className="animate-spin"
                  />

                  Submitting Request...
                </>
              ) : (
                <>
                  <Send size={20} />

                  Submit Blood Request
                </>
              )}

            </button>

          </form>

        </div>

      </section>

    </div>
  );
}

export default RequestBlood;