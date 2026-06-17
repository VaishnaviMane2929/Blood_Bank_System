import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Heart,
  FileText,
  Droplets,
} from "lucide-react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    totalUnits: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      console.log("Dashboard Data:", res.data);

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={28} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Donors",
      value: stats.totalDonors,
      icon: <Heart size={28} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Blood Requests",
      value: stats.totalRequests,
      icon: <FileText size={28} />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Blood Units",
      value: stats.totalUnits,
      icon: <Droplets size={28} />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Blood Bank Management System
        </p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {card.value}
                </h2>
              </div>

              <div
                className={`p-4 rounded-2xl ${card.color}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}

      <div className="bg-white rounded-3xl shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">
          System Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-xl p-4">
            <h3 className="font-semibold text-gray-600">
              Registered Users
            </h3>

            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.totalUsers}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <h3 className="font-semibold text-gray-600">
              Available Blood Units
            </h3>

            <p className="text-3xl font-bold text-red-600 mt-2">
              {stats.totalUnits}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;