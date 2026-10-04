import React, { useEffect, useState } from "react";

import {
  HeartPulse,
  ShieldCheck,
  Users,
  Droplets,
  Target,
  Eye,
  Heart,
  CheckCircle,
  ArrowRight,
  Activity,
  Database,
  UserCheck,
  Hospital,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import {
  getAbout,
  getDashboardStats,
  getBloodStock,
} from "../api/publicApi";

const About = () => {
  const [about, setAbout] = useState(null);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    totalUnits: 0,
  });

  const [bloodStock, setBloodStock] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD DATA
  // ==========================================
  const loadAboutData = async () => {
    try {
      setLoading(true);
      setError("");

      // About data
      const aboutResponse = await getAbout();

      if (aboutResponse.success) {
        setAbout(aboutResponse.about);
      }

      // Dashboard statistics
      try {
        const dashboardResponse = await getDashboardStats();

        if (dashboardResponse.success) {
          setStats(
            dashboardResponse.stats || {
              totalUsers: 0,
              totalDonors: 0,
              totalRequests: 0,
              totalUnits: 0,
            }
          );
        }
      } catch (dashboardError) {
        console.error(
          "Dashboard statistics error:",
          dashboardError
        );
      }

      // Blood stock
      try {
        const stockResponse = await getBloodStock();

        if (stockResponse.success) {
          setBloodStock(stockResponse.stocks || []);
        }
      } catch (stockError) {
        console.error(
          "Blood stock error:",
          stockError
        );
      }
    } catch (error) {
      console.error("ABOUT PAGE ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load About page information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAboutData();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-5">
            <Loader2
              size={32}
              className="text-red-600 animate-spin"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Loading BloodConnect
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait while we load our information...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error || !about) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-5">
            <AlertCircle
              size={32}
              className="text-red-600"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Unable to Load Information
          </h2>

          <p className="text-gray-500 mt-3">
            {error ||
              "About information is currently unavailable."}
          </p>

          <button
            onClick={loadAboutData}
            className="mt-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

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

  const getUnits = (group) => {
    return bloodStock
      .filter(
        (item) =>
          String(item.bloodGroup)
            .trim()
            .toUpperCase() === group.toUpperCase()
      )
      .reduce(
        (total, item) =>
          total + Number(item.units || 0),
        0
      );
  };

  // ==========================================
  // FEATURES
  // ==========================================
  const featureIcons = [
    <Users size={26} />,
    <Droplets size={26} />,
    <Database size={26} />,
    <ShieldCheck size={26} />,
    <UserCheck size={26} />,
    <Activity size={26} />,
  ];

  // ==========================================
  // PROCESS ICONS
  // ==========================================
  const processIcons = [
    <UserCheck size={25} />,
    <Droplets size={25} />,
    <Database size={25} />,
    <Hospital size={25} />,
    <HeartPulse size={25} />,
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-rose-600 text-white">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[50px] border-white" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border-[50px] border-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
                <HeartPulse size={18} />

                <span className="text-sm font-semibold">
                  About BloodConnect
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                {about.title}
              </h1>

              <p className="text-xl md:text-2xl font-medium text-red-100 mt-6 leading-relaxed">
                {about.subtitle}
              </p>

              <p className="text-red-100 mt-6 text-base md:text-lg leading-8 max-w-2xl">
                {about.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <a
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-white text-red-700 px-6 py-3.5 rounded-xl font-bold hover:bg-red-50 transition shadow-lg"
                >
                  Donate Blood
                  <ArrowRight size={19} />
                </a>

                <a
                  href="/find-donor"
                  className="inline-flex items-center gap-2 border border-white/40 hover:bg-white/10 px-6 py-3.5 rounded-xl font-bold transition"
                >
                  Find a Donor
                </a>

              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:flex justify-center">

              <div className="relative">

                <div className="w-80 h-80 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">

                  <div className="w-60 h-60 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">

                    <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-2xl">

                      <HeartPulse
                        size={75}
                        className="text-red-600"
                      />

                    </div>

                  </div>

                </div>

                <div className="absolute -top-5 -right-5 bg-white text-gray-900 rounded-2xl px-5 py-4 shadow-xl">
                  <p className="text-xs text-gray-500">
                    Total Donors
                  </p>

                  <p className="text-2xl font-extrabold text-red-600">
                    {stats.totalDonors}
                  </p>
                </div>

                <div className="absolute -bottom-5 -left-5 bg-white text-gray-900 rounded-2xl px-5 py-4 shadow-xl">
                  <p className="text-xs text-gray-500">
                    Blood Units
                  </p>

                  <p className="text-2xl font-extrabold text-red-600">
                    {stats.totalUnits}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          LIVE STATISTICS
      ===================================================== */}
      <section className="py-14 bg-gray-50 border-b">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <Users size={24} />
              </div>

              <p className="text-3xl font-extrabold text-gray-900">
                {stats.totalUsers}
              </p>

              <p className="text-gray-500 mt-1">
                Registered Users
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                <Heart size={24} />
              </div>

              <p className="text-3xl font-extrabold text-gray-900">
                {stats.totalDonors}
              </p>

              <p className="text-gray-500 mt-1">
                Registered Donors
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                <Droplets size={24} />
              </div>

              <p className="text-3xl font-extrabold text-gray-900">
                {stats.totalUnits}
              </p>

              <p className="text-gray-500 mt-1">
                Available Units
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                <Activity size={24} />
              </div>

              <p className="text-3xl font-extrabold text-gray-900">
                {stats.totalRequests}
              </p>

              <p className="text-gray-500 mt-1">
                Blood Requests
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          MISSION + VISION
      ===================================================== */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid md:grid-cols-2 gap-8">

            {/* MISSION */}
            <div className="bg-red-50 rounded-3xl p-8 md:p-10 border border-red-100">

              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center mb-6">
                <Target size={28} />
              </div>

              <p className="text-red-600 font-bold uppercase tracking-wider text-sm">
                Our Mission
              </p>

              <h2 className="text-3xl font-extrabold text-gray-900 mt-2">
                Making Blood Donation Easier
              </h2>

              <p className="text-gray-600 leading-8 mt-5">
                {about.mission}
              </p>

            </div>

            {/* VISION */}
            <div className="bg-gray-900 rounded-3xl p-8 md:p-10 text-white">

              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                <Eye size={28} />
              </div>

              <p className="text-red-400 font-bold uppercase tracking-wider text-sm">
                Our Vision
              </p>

              <h2 className="text-3xl font-extrabold mt-2">
                A Connected Blood Network
              </h2>

              <p className="text-gray-300 leading-8 mt-5">
                {about.vision}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY BLOODCONNECT
      ===================================================== */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <span className="inline-flex items-center gap-2 text-red-600 font-bold text-sm uppercase tracking-wider">
              <HeartPulse size={18} />
              Our Platform
            </span>

            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
              Everything Needed to Manage Blood Resources
            </h2>

            <p className="text-gray-500 mt-4 leading-7">
              BloodConnect provides a centralized platform for managing
              donors, blood requests, inventory, users and other
              blood-bank operations.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {about.features?.map((feature, index) => (

              <div
                key={index}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >

                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-6">
                  {featureIcons[index] || (
                    <CheckCircle size={26} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-gray-500 leading-7 mt-3">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          BLOOD STOCK
      ===================================================== */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">

            <div>
              <p className="text-red-600 font-bold text-sm uppercase tracking-wider">
                Live Inventory
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
                Blood Group Availability
              </h2>

              <p className="text-gray-500 mt-3">
                Current blood units recorded in the system.
              </p>
            </div>

            <a
              href="/request-blood"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              Request Blood
              <ArrowRight size={18} />
            </a>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">

            {bloodGroups.map((group) => {

              const units = getUnits(group);

              return (
                <div
                  key={group}
                  className="rounded-2xl border border-gray-100 bg-white shadow-sm p-5 text-center hover:shadow-lg transition"
                >

                  <div className="w-14 h-14 mx-auto rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                    <Droplets size={25} />
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-900 mt-4">
                    {group}
                  </h3>

                  <p className="text-2xl font-extrabold text-red-600 mt-2">
                    {units}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    units
                  </p>

                  <div
                    className={`mt-3 text-xs font-semibold px-2 py-1 rounded-full ${
                      units === 0
                        ? "bg-gray-100 text-gray-500"
                        : units <= 5
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {units === 0
                      ? "Not Available"
                      : units <= 5
                      ? "Low Stock"
                      : "Available"}
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="py-20 bg-gray-900 text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <p className="text-red-400 font-bold text-sm uppercase tracking-wider">
              Simple Process
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
              How BloodConnect Works
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Our platform connects donors, blood inventory and
              blood requests through a simple digital workflow.
            </p>

          </div>

          <div className="grid md:grid-cols-5 gap-6">

            {about.process?.map((item, index) => (

              <div
                key={index}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
              >

                <div className="flex items-center justify-between">

                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center">
                    {processIcons[index] || (
                      <CheckCircle size={25} />
                    )}
                  </div>

                  <span className="text-4xl font-black text-white/10">
                    {String(item.step).padStart(2, "0")}
                  </span>

                </div>

                <h3 className="text-lg font-bold mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm leading-6 mt-3">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}
      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <p className="text-red-600 font-bold text-sm uppercase tracking-wider">
                Technology
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-3">
                Built With Modern Web Technologies
              </h2>

              <p className="text-gray-500 leading-8 mt-5">
                BloodConnect is developed using modern full-stack
                web technologies to provide a responsive,
                scalable, and maintainable blood management
                platform.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">

                {[
                  "React.js",
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "REST APIs",
                  "JWT Authentication",
                  "Tailwind CSS",
                  "Axios",
                ].map((technology) => (

                  <div
                    key={technology}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                  >

                    <CheckCircle
                      size={19}
                      className="text-green-600 flex-shrink-0"
                    />

                    <span className="font-semibold text-gray-800">
                      {technology}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-gradient-to-br from-red-600 to-rose-700 rounded-3xl p-8 md:p-10 text-white">

              <HeartPulse size={45} />

              <h3 className="text-3xl font-extrabold mt-7">
                Every Donation Matters
              </h3>

              <p className="text-red-100 leading-8 mt-5">
                Blood donation is an important contribution to
                healthcare. A well-managed digital system can
                help organize donor information, blood inventory
                and requests more efficiently.
              </p>

              <div className="mt-8 pt-6 border-t border-white/20">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                    <Heart size={21} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Donate. Connect. Save Lives.
                    </p>

                    <p className="text-sm text-red-100">
                      Be part of the blood donation community.
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="py-20 bg-red-50">

        <div className="max-w-4xl mx-auto px-4 text-center">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-600 text-white flex items-center justify-center">
            <HeartPulse size={32} />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-6">
            Be Someone's Reason to Hope
          </h2>

          <p className="text-gray-600 text-lg leading-8 mt-4">
            Register as a donor, find available blood, or submit
            a blood request through BloodConnect.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            <a
              href="/donate"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-bold transition"
            >
              Donate Blood
              <Heart size={19} />
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 px-7 py-3.5 rounded-xl font-bold transition"
            >
              Contact Us
              <ArrowRight size={19} />
            </a>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;