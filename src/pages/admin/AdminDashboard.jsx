import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Heart,
  FileText,
  Droplets,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    totalUnits: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <Users size={28} />,
      color: "text-blue-600",
    },
    {
      title: "Donors",
      value: stats.totalDonors,
      icon: <Heart size={28} />,
      color: "text-green-600",
    },
    {
      title: "Requests",
      value: stats.totalRequests,
      icon: <FileText size={28} />,
      color: "text-yellow-600",
    },
    {
      title: "Blood Units",
      value: stats.totalUnits,
      icon: <Droplets size={28} />,
      color: "text-red-600",
    },
  ];

  const chartData = [
    {
      name: "Users",
      value: stats.totalUsers,
    },
    {
      name: "Donors",
      value: stats.totalDonors,
    },
    {
      name: "Requests",
      value: stats.totalRequests,
    },
    {
      name: "Units",
      value: stats.totalUnits,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#ca8a04",
    "#dc2626",
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Blood Bank Management System
        </p>
      </div>

      {/* Stats Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow"
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

              <div className={card.color}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            System Statistics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="value"
                fill="#dc2626"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                outerRadius={100}
                label
              >
                {chartData.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[index]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* Activity Section */}

      <div className="bg-white mt-8 rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Recent Activity
        </h2>

        <div className="space-y-3">
          <div className="border-b pb-3">
            New donor registered
          </div>

          <div className="border-b pb-3">
            Blood request created
          </div>

          <div className="border-b pb-3">
            Stock updated
          </div>

          <div>
            New user account created
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;