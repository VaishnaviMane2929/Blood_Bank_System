// src/pages/DonateBlood.jsx

import { useState } from "react";
import {
  Heart,
  MapPin,
  Phone,
  Droplets,
  CheckCircle,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import { addDonation } from "../api/publicApi";

function DonateBlood() {
  const [formData, setFormData] = useState({
    donorName: "",
    bloodGroup: "",
    units: "",
    city: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove old messages when user starts editing
    setSuccess("");
    setError("");
  };

  // Submit donation
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    // Validation
    if (
      !formData.donorName.trim() ||
      !formData.bloodGroup ||
      !formData.units ||
      !formData.city.trim() ||
      !formData.contact.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Units validation
    if (Number(formData.units) <= 0) {
      setError("Units must be greater than 0.");
      return;
    }

    // Contact validation
    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(formData.contact)) {
      setError("Please enter a valid 10-digit contact number.");
      return;
    }

    try {
      setLoading(true);

      const donationData = {
        donorName: formData.donorName.trim(),
        bloodGroup: formData.bloodGroup,
        units: Number(formData.units),
        city: formData.city.trim(),
        contact: formData.contact.trim(),
      };

      console.log("DONATION DATA:", donationData);

      const response = await addDonation(donationData);

      console.log("DONATION RESPONSE:", response);

      if (response.success) {
        setSuccess(
          "Thank you! Your blood donation has been registered successfully."
        );

        // Reset form
        setFormData({
          donorName: "",
          bloodGroup: "",
          units: "",
          city: "",
          contact: "",
        });
      } else {
        setError(
          response.message ||
            "Unable to register donation."
        );
      }
    } catch (err) {
      console.error("Donation Error:", err);

      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <div className="w-16 h-16 mx-auto bg-white/15 rounded-2xl flex items-center justify-center">
            <Heart size={34} />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mt-6">
            Donate Blood
          </h1>

          <p className="text-red-100 text-lg mt-4 max-w-2xl mx-auto">
            Your blood donation can help save someone's life.
            Register as a donor and become part of our donor
            community.
          </p>

        </div>
      </section>

      {/* MAIN */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT INFORMATION */}
            <div className="lg:col-span-1">

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                <div className="flex items-center gap-3 mb-7">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                    <Heart size={25} />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Become a Donor
                    </h2>

                    <p className="text-sm text-gray-500">
                      Make a difference
                    </p>
                  </div>
                </div>

                <div className="space-y-6">

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center shrink-0">
                      <Droplets size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Save Lives
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        One blood donation can help people
                        in need.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Secure Information
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Your donor information is managed
                        through our system.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Local Donor Network
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Help patients find donors in their
                        city.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* FORM */}
            <div className="lg:col-span-2">

              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Donor Information
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Enter your details to register your
                    blood donation.
                  </p>
                </div>

                {/* SUCCESS */}
                {success && (
                  <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
                    <CheckCircle
                      size={22}
                      className="shrink-0 mt-0.5"
                    />

                    <p className="font-medium">
                      {success}
                    </p>
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                    <AlertCircle
                      size={22}
                      className="shrink-0 mt-0.5"
                    />

                    <p className="font-medium">
                      {error}
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="grid md:grid-cols-2 gap-6"
                >

                  {/* NAME */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="donorName"
                      value={formData.donorName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full border border-gray-200 px-4 py-3.5 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                    />
                  </div>

                  {/* BLOOD GROUP */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Blood Group *
                    </label>

                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full border border-gray-200 px-4 py-3.5 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition bg-white"
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

                  {/* UNITS */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Blood Units *
                    </label>

                    <div className="relative">
                      <Droplets
                        size={19}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="number"
                        name="units"
                        value={formData.units}
                        onChange={handleChange}
                        placeholder="Enter units"
                        min="1"
                        max="10"
                        className="w-full border border-gray-200 pl-11 pr-4 py-3.5 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                      />
                    </div>
                  </div>

                  {/* CITY */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
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
                        onChange={handleChange}
                        placeholder="Enter your city"
                        className="w-full border border-gray-200 pl-11 pr-4 py-3.5 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                      />
                    </div>
                  </div>

                  {/* CONTACT */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Number *
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
                        onChange={handleChange}
                        placeholder="Enter 10-digit contact number"
                        maxLength="10"
                        className="w-full border border-gray-200 pl-11 pr-4 py-3.5 rounded-xl outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                      />
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <div className="md:col-span-2 pt-2">

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-4 rounded-xl text-lg font-semibold transition flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={22}
                            className="animate-spin"
                          />

                          Registering Donation...
                        </>
                      ) : (
                        <>
                          <Heart size={21} />

                          Submit Donation
                        </>
                      )}
                    </button>

                  </div>

                </form>

                <p className="text-xs text-gray-400 mt-6 text-center">
                  * Required fields
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default DonateBlood;