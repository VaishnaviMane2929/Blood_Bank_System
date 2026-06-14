import { useEffect, useState } from "react";
import axios from "axios";

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

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Dashboard Overview
        </h1>

        <p className="text-gray-500 mt-2">
          Blood Bank Management System
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Total Users
          </h2>

          <p className="text-4xl font-bold text-red-600 mt-3">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Total Donors
          </h2>

          <p className="text-4xl font-bold text-red-600 mt-3">
            {stats.totalDonors}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Blood Requests
          </h2>

          <p className="text-4xl font-bold text-red-600 mt-3">
            {stats.totalRequests}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-gray-500">
            Blood Units
          </h2>

          <p className="text-4xl font-bold text-red-600 mt-3">
            {stats.totalUnits}
          </p>
        </div>

      </div>
    </>
  );
}

export default AdminDashboard;