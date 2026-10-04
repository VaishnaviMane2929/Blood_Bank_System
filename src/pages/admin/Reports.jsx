import {
  useEffect,
  useState,
} from "react";

import { getReports } from "../../api/reportApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Reports() {
  const [report, setReport] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    bloodGroups: [],
    monthlyRequests: [],
    recentDonations: [],
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  // ==========================================
  // LOAD REPORTS
  // ==========================================
  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getReports();

      console.log("REPORT API RESPONSE:", res);

      // Backend may return:
      // { success: true, report: {...} }
      //
      // OR directly:
      // { totalUsers: ..., ... }

      const data = res?.report || res || {};

      setReport({
        totalUsers: Number(data.totalUsers || 0),

        totalDonors: Number(data.totalDonors || 0),

        totalRequests: Number(data.totalRequests || 0),

        bloodGroups: Array.isArray(data.bloodGroups)
          ? data.bloodGroups
          : [],

        monthlyRequests: Array.isArray(
          data.monthlyRequests
        )
          ? data.monthlyRequests
          : [],

        recentDonations: Array.isArray(
          data.recentDonations
        )
          ? data.recentDonations
          : [],
      });
    } catch (error) {
      console.error(
        "REPORTS API ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load reports."
      );

      // Keep safe empty data
      setReport({
        totalUsers: 0,
        totalDonors: 0,
        totalRequests: 0,
        bloodGroups: [],
        monthlyRequests: [],
        recentDonations: [],
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // COLORS
  // ==========================================
  const COLORS = [
    "#dc2626",
    "#ef4444",
    "#f87171",
    "#fca5a5",
    "#fecaca",
    "#991b1b",
    "#b91c1c",
    "#7f1d1d",
  ];

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto" />

          <p className="text-gray-500 mt-4">
            Loading reports...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow p-8 text-center">

        <h2 className="text-2xl font-bold text-gray-900">
          Unable to Load Reports
        </h2>

        <p className="text-gray-500 mt-2">
          {error}
        </p>

        <button
          onClick={loadReports}
          className="mt-5 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Try Again
        </button>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Reports & Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Blood Bank Performance Overview
        </p>
      </div>
      {/* ==========================================
          STATS
      ========================================== */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* USERS */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <h3 className="text-gray-500 font-medium">
            Total Users
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {report.totalUsers}
          </p>

        </div>

        {/* DONORS */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <h3 className="text-gray-500 font-medium">
            Total Donors
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {report.totalDonors}
          </p>

        </div>

        {/* REQUESTS */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <h3 className="text-gray-500 font-medium">
            Total Requests
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-3">
            {report.totalRequests}
          </p>

        </div>

      </div>

      {/* ==========================================
          CHARTS
      ========================================== */}

      <div className="grid lg:grid-cols-2 gap-6">

        {/* MONTHLY REQUESTS */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <h2 className="font-semibold text-xl mb-6">
            Monthly Requests
          </h2>

          {report.monthlyRequests.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={report.monthlyRequests}
              >

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Bar
                  dataKey="requests"
                  fill="#dc2626"
                  radius={[
                    6,
                    6,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          ) : (

            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No monthly request data available
            </div>

          )}

        </div>

        {/* BLOOD GROUP */}

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

          <h2 className="font-semibold text-xl mb-6">
            Blood Group Distribution
          </h2>

          {report.bloodGroups.length > 0 ? (

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <PieChart>

                <Pie
                  data={report.bloodGroups}
                  dataKey="units"
                  nameKey="group"
                  outerRadius={100}
                  label
                >

                  {report.bloodGroups.map(
                    (entry, index) => (

                      <Cell
                        key={
                          entry.group ||
                          index
                        }
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          ) : (

            <div className="h-[300px] flex items-center justify-center text-gray-400">
              No blood stock data available
            </div>

          )}

        </div>

      </div>

      {/* ==========================================
          RECENT DONATIONS
      ========================================== */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        <div className="p-6">

          <h2 className="text-2xl font-bold text-gray-900">
            Recent Donations
          </h2>

          <p className="text-gray-500 mt-1">
            Latest blood donations registered in the system.
          </p>

        </div>

        {report.recentDonations.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[700px]">

              <thead className="bg-red-600 text-white">

                <tr>

                  <th className="p-4 text-left">
                    Donor
                  </th>

                  <th className="p-4 text-left">
                    Blood Group
                  </th>

                  <th className="p-4 text-left">
                    Units
                  </th>

                  <th className="p-4 text-left">
                    City
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {report.recentDonations.map(
                  (donor) => (

                    <tr
                      key={donor._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-4 font-semibold text-gray-800">
                        {donor.donorName}
                      </td>

                      <td className="p-4">

                        <span className="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-sm">
                          {donor.bloodGroup}
                        </span>

                      </td>

                      <td className="p-4 font-semibold">
                        {donor.units}
                      </td>

                      <td className="p-4 text-gray-600">
                        {donor.city}
                      </td>

                      <td className="p-4 text-gray-500">

                        {donor.createdAt
                          ? new Date(
                              donor.createdAt
                            ).toLocaleDateString()
                          : "-"}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="p-10 text-center">

            <p className="text-gray-400">
              No recent donations available.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default Reports;