import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/dashboardApi";

function DashboardHome() {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    totalBloodUnits: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {

    try {

      const data = await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard Overview
      </h1>

      <div className="grid lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Users</h3>

          <p className="text-4xl font-bold text-red-600">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Donors</h3>

          <p className="text-4xl font-bold text-red-600">
            {stats.totalDonors}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Blood Requests</h3>

          <p className="text-4xl font-bold text-red-600">
            {stats.totalRequests}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Blood Units</h3>

          <p className="text-4xl font-bold text-red-600">
            {stats.totalBloodUnits}
          </p>
        </div>

      </div>
    </>
  );
}

export default DashboardHome;