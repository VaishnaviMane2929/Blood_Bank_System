import { useEffect, useState } from "react";
import {
  Users,
  Heart,
  Droplets,
  FileText,
  Search,
  ArrowRight,
  Activity,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

import HeroSection from "../components/HeroSection/HeroSection";
import {
  getDashboardStats,
  getBloodStock,
} from "../api/publicApi";

function Home() {
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

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    totalUnits: 0,
  });

  const [bloodStock, setBloodStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
  setLoading(true);
  setError("");

  try {
    // =========================
    // DASHBOARD
    // =========================

    try {
      const dashboardResponse =
        await getDashboardStats();

      console.log(
        "DASHBOARD RESPONSE:",
        dashboardResponse
      );

      setStats(
        dashboardResponse.stats || {
          totalUsers: 0,
          totalDonors: 0,
          totalRequests: 0,
          totalUnits: 0,
        }
      );

    } catch (dashboardError) {
      console.error(
        "Dashboard API Error:",
        dashboardError
      );
    }

    // =========================
    // BLOOD STOCK
    // =========================

    try {
      const stockResponse =
        await getBloodStock();

      console.log(
        "STOCK RESPONSE:",
        stockResponse
      );

      // Backend returns:
      // { success: true, stocks: [...] }

      const stockData =
        stockResponse.stocks || [];

      console.log(
        "FINAL STOCK DATA:",
        stockData
      );

      setBloodStock(stockData);

    } catch (stockError) {
      console.error(
        "Blood Stock API Error:",
        stockError
      );

      setBloodStock([]);

      setError(
        "Blood stock could not be loaded."
      );
    }

  } finally {
    setLoading(false);
  }
};

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

  const getStockStatus = (units) => {
    if (units === 0) {
      return {
        text: "Not Available",
        className: "text-gray-500 bg-gray-100",
      };
    }

    if (units <= 5) {
      return {
        text: "Low Stock",
        className: "text-orange-600 bg-orange-100",
      };
    }

    return {
      text: "Available",
      className: "text-green-600 bg-green-100",
    };
  };

  const statCards = [
    {
      title: "Registered Users",
      value: stats.totalUsers,
      icon: <Users size={28} />,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Blood Donors",
      value: stats.totalDonors,
      icon: <Heart size={28} />,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Blood Requests",
      value: stats.totalRequests,
      icon: <FileText size={28} />,
      bg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Available Units",
      value: stats.totalUnits,
      icon: <Droplets size={28} />,
      bg: "bg-pink-50",
      iconColor: "text-pink-600",
    },
  ];

  return (
    <div className="bg-white">

      {/* HERO */}
      <HeroSection />

      {/* ERROR */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl flex justify-between items-center">
            <p>{error}</p>

            <button
              onClick={loadHomeData}
              className="font-semibold underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* LIVE STATISTICS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
              <Activity size={16} />
              Live Blood Bank Statistics
            </span>

            <h2 className="text-4xl font-bold text-gray-800 mt-4">
              Our Blood Bank at a Glance
            </h2>

            <p className="text-gray-500 mt-3">
              Real-time information from our blood bank system.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {statCards.map((card, index) => (
              <div
                key={index}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-gray-500 text-sm">
                      {card.title}
                    </p>

                    <h3 className="text-4xl font-bold text-gray-800 mt-3">
                      {loading ? "..." : card.value}
                    </h3>
                  </div>

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg} ${card.iconColor}`}
                  >
                    {card.icon}
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* BLOOD STOCK */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-12">

            <div>
              <span className="text-red-600 font-semibold">
                LIVE INVENTORY
              </span>

              <h2 className="text-4xl font-bold text-gray-800 mt-2">
                Blood Availability
              </h2>

              <p className="text-gray-500 mt-3">
                Check the current availability of blood units.
              </p>
            </div>

            <Link
              to="/request-blood"
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Request Blood
              <ArrowRight size={18} />
            </Link>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">

            {bloodGroups.map((group) => {
              const units = getUnits(group);
              const status = getStockStatus(units);

              return (
                <div
                  key={group}
                  className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
                    <Droplets
                      size={30}
                      className="text-red-600"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mt-4">
                    {group}
                  </h3>

                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {loading ? "..." : units}
                  </p>

                  <p className="text-xs text-gray-500">
                    units
                  </p>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}
                  >
                    {status.text}
                  </span>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <span className="text-red-600 font-semibold">
              SIMPLE PROCESS
            </span>

            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              How BloodConnect Works
            </h2>

            <p className="text-gray-500 mt-3">
              Connecting donors and patients through a simple process.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                <Heart size={28} />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mt-6">
                1. Become a Donor
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Register your blood group and contact information
                to become part of our donor network.
              </p>

              <Link
                to="/donate"
                className="inline-flex items-center gap-2 text-red-600 font-semibold mt-6"
              >
                Donate Blood
                <ArrowRight size={17} />
              </Link>

            </div>

            <div className="relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <Search size={28} />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mt-6">
                2. Find a Donor
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Search available donors by blood group and city
                when blood is urgently required.
              </p>

              <Link
                to="/find-donor"
                className="inline-flex items-center gap-2 text-red-600 font-semibold mt-6"
              >
                Find Donor
                <ArrowRight size={17} />
              </Link>

            </div>

            <div className="relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-xl transition">

              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                <Droplets size={28} />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mt-6">
                3. Request Blood
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Submit a blood request with patient and hospital
                details for processing.
              </p>

              <Link
                to="/request-blood"
                className="inline-flex items-center gap-2 text-red-600 font-semibold mt-6"
              >
                Request Blood
                <ArrowRight size={17} />
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <span className="text-red-600 font-semibold">
              WHY BLOODCONNECT
            </span>

            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              Built for Faster Blood Support
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                <Clock size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mt-6">
                Fast Response
              </h3>

              <p className="text-gray-600 mt-3 leading-7">
                Quickly search donors and submit blood requests
                through the platform.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mt-6">
                Organized Donor Data
              </h3>

              <p className="text-gray-600 mt-3 leading-7">
                Donor and blood request information is managed
                through a centralized system.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                <Users size={28} />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mt-6">
                Connected Community
              </h3>

              <p className="text-gray-600 mt-3 leading-7">
                Connect people who are willing to donate with
                patients who need blood.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-red-600">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">

          <h2 className="text-4xl md:text-5xl font-bold">
            Every Donation Can Save a Life
          </h2>

          <p className="mt-5 text-red-100 text-lg">
            Join our donor network or request blood when you need it.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

            <Link
              to="/donate"
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Donate Blood
            </Link>

            <Link
              to="/find-donor"
              className="border border-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition"
            >
              Find a Donor
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;