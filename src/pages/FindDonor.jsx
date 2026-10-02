// src/pages/FindDonor.jsx

import { useEffect, useMemo, useState } from "react";

import {
  Search,
  MapPin,
  Phone,
  Droplets,
  Users,
  RefreshCw,
  Heart,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

import { getDonations } from "../api/publicApi";

function FindDonor() {
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

  const [donors, setDonors] = useState([]);

  const [search, setSearch] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD DONORS
  // ==========================================
  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDonations();

      console.log("DONORS RESPONSE:", response);

      if (response.success) {
        setDonors(response.donations || []);
      } else {
        setDonors([]);
        setError(
          response.message ||
            "Unable to load donors."
        );
      }
    } catch (error) {
      console.error("GET DONORS ERROR:", error);

      setDonors([]);

      setError(
        error.response?.data?.message ||
          "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FILTER DONORS
  // ==========================================
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const donorName =
        donor.donorName?.toLowerCase() || "";

      const donorCity =
        donor.city?.toLowerCase() || "";

      const donorBlood =
        donor.bloodGroup?.toUpperCase() || "";

      const searchText =
        search.trim().toLowerCase();

      const matchesSearch =
        donorName.includes(searchText) ||
        donorCity.includes(searchText);

      const matchesBloodGroup =
        bloodGroup === "" ||
        donorBlood === bloodGroup;

      return (
        matchesSearch &&
        matchesBloodGroup
      );
    });
  }, [donors, search, bloodGroup]);

  // ==========================================
  // CLEAR FILTERS
  // ==========================================
  const clearFilters = () => {
    setSearch("");
    setBloodGroup("");
  };

  // ==========================================
  // TOTAL DONATED UNITS
  // ==========================================
  const totalUnits = donors.reduce(
    (total, donor) =>
      total + Number(donor.units || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ======================================
          HERO
      ====================================== */}
      <section className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full text-sm font-semibold">
              <Heart size={17} />
              DONOR NETWORK
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mt-6">
              Find Blood Donors
            </h1>

            <p className="text-red-100 text-lg mt-4 leading-8">
              Search registered blood donors by blood group
              and city when you need blood support.
            </p>

          </div>

        </div>
      </section>

      {/* ======================================
          STATISTICS
      ====================================== */}
      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">

        <div className="grid sm:grid-cols-2 gap-5">

          {/* TOTAL DONORS */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  Registered Donors
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {loading ? "..." : donors.length}
                </h2>
              </div>

              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                <Users size={27} />
              </div>

            </div>

          </div>

          {/* TOTAL UNITS */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  Total Donated Units
                </p>

                <h2 className="text-3xl font-bold text-gray-800 mt-2">
                  {loading ? "..." : totalUnits}
                </h2>
              </div>

              <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center">
                <Droplets size={27} />
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          SEARCH & FILTER
      ====================================== */}
      <section className="max-w-7xl mx-auto px-6 pt-12">

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">

          <div className="grid md:grid-cols-3 gap-5">

            {/* SEARCH */}
            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Donor
              </label>

              <div className="relative">

                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search by donor name or city..."
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-11 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    <X size={19} />
                  </button>
                )}

              </div>

            </div>

            {/* BLOOD GROUP */}
            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Blood Group
              </label>

              <select
                value={bloodGroup}
                onChange={(e) =>
                  setBloodGroup(e.target.value)
                }
                className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition bg-white"
              >

                <option value="">
                  All Blood Groups
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

          {/* FILTER FOOTER */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mt-6 pt-5 border-t">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-bold text-gray-800">
                {loading
                  ? "..."
                  : filteredDonors.length}
              </span>{" "}
              donor
              {filteredDonors.length !== 1
                ? "s"
                : ""}
            </p>

            <div className="flex gap-3">

              {(search || bloodGroup) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition"
                >
                  Clear Filters
                </button>
              )}

              <button
                onClick={loadDonors}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 disabled:bg-red-400 transition"
              >

                <RefreshCw
                  size={17}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ======================================
          ERROR
      ====================================== */}
      {error && (
        <section className="max-w-7xl mx-auto px-6 pt-8">

          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="flex items-start gap-3">

              <AlertCircle
                size={22}
                className="text-red-600 mt-0.5 shrink-0"
              />

              <div>
                <h3 className="font-semibold text-red-800">
                  Unable to load donors
                </h3>

                <p className="text-red-600 text-sm mt-1">
                  {error}
                </p>
              </div>

            </div>

            <button
              onClick={loadDonors}
              className="bg-red-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Retry
            </button>

          </div>

        </section>
      )}

      {/* ======================================
          DONOR LIST
      ====================================== */}
      <section className="max-w-7xl mx-auto px-6 py-12">

        {/* LOADING */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl border border-gray-100 p-7 animate-pulse"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-14 h-14 bg-gray-200 rounded-2xl" />

                    <div className="flex-1">

                      <div className="h-5 bg-gray-200 rounded w-32" />

                      <div className="h-4 bg-gray-200 rounded w-20 mt-2" />

                    </div>

                  </div>

                  <div className="h-4 bg-gray-200 rounded mt-7" />

                  <div className="h-4 bg-gray-200 rounded mt-3" />

                  <div className="h-11 bg-gray-200 rounded-xl mt-7" />

                </div>
              )
            )}

          </div>
        )}

        {/* EMPTY STATE */}
        {!loading &&
          !error &&
          filteredDonors.length === 0 && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">

              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <Users
                  size={36}
                  className="text-gray-400"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-6">
                No Donors Found
              </h2>

              <p className="text-gray-500 mt-3 max-w-md mx-auto">
                We couldn't find any registered donor
                matching your search criteria.
              </p>

              {(search || bloodGroup) && (
                <button
                  onClick={clearFilters}
                  className="mt-6 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                >
                  Clear Filters
                </button>
              )}

            </div>
          )}

        {/* DONORS */}
        {!loading &&
          filteredDonors.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredDonors.map((donor) => {

                const phone = donor.contact
  ? donor.contact.replace(/\D/g, "")
  : "";

                return (
                  <div
                    key={donor._id}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                  >

                    {/* CARD TOP */}
                    <div className="p-7">

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                            <Heart size={26} />
                          </div>

                          <div>

                            <h2 className="text-xl font-bold text-gray-800">
                              {donor.donorName}
                            </h2>

                            <p className="text-sm text-green-600 font-medium mt-1">
                              Registered Donor
                            </p>

                          </div>

                        </div>

                        {/* BLOOD GROUP */}
                        <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold text-lg">
                          {donor.bloodGroup}
                        </div>

                      </div>

                      {/* DETAILS */}
                      <div className="mt-7 space-y-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                            <MapPin
                              size={18}
                              className="text-gray-600"
                            />
                          </div>

                          <div>
                            <p className="text-xs text-gray-400">
                              Location
                            </p>

                            <p className="text-sm font-semibold text-gray-700">
                              {donor.city}
                            </p>
                          </div>

                        </div>

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Droplets
                              size={18}
                              className="text-red-600"
                            />
                          </div>

                          <div>
                            <p className="text-xs text-gray-400">
                              Blood Donated
                            </p>

                            <p className="text-sm font-semibold text-gray-700">
                              {donor.units}{" "}
                              {Number(donor.units) ===
                              1
                                ? "Unit"
                                : "Units"}
                            </p>
                          </div>

                        </div>

                      </div>

                    </div>

                    {/* CONTACT */}
                    <div className="border-t border-gray-100 p-5">

                      {phone ? (
  <a
    href={`tel:${phone}`}
    className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
  >
    <Phone size={19} />
    Contact Donor
  </a>
) : (
  <button
    disabled
    className="w-full bg-gray-200 text-gray-500 py-3.5 rounded-xl font-semibold cursor-not-allowed"
  >
    Contact Not Available
  </button>
)}

                    </div>

                  </div>
                );
              })}

            </div>
          )}

      </section>

      {/* ======================================
          BOTTOM INFORMATION
      ====================================== */}
      <section className="bg-white border-t border-gray-100 py-16">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <div className="w-14 h-14 mx-auto bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
            <Heart size={27} />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mt-5">
            Every Donor Matters
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto mt-3 leading-7">
            Registered donors help create a connected blood
            donation network where people can find potential
            donors when blood support is needed.
          </p>

        </div>

      </section>

    </div>
  );
}

export default FindDonor;