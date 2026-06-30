import {
  useEffect,
  useState,
} from "react";

import { getReports }
from "../../api/reportApi";

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

  const [report,
  setReport] = useState({
    totalUsers: 0,
    totalDonors: 0,
    totalRequests: 0,
    bloodGroups: [],
    monthlyRequests: [],
    recentDonations: [],
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports =
  async () => {
    try {

      const res =
      await getReports();

      setReport(res);

    } catch (error) {
      console.log(error);
    }
  };

  const COLORS = [
    "#dc2626",
    "#ef4444",
    "#f87171",
    "#fca5a5",
    "#fecaca",
    "#991b1b",
  ];

  return (
    <div>

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Reports & Analytics
        </h1>

        <p className="text-gray-500">
          Blood Bank Performance Overview
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Total Users
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {report.totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Total Donors
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {report.totalDonors}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Total Requests
          </h3>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {report.totalRequests}
          </p>
        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="font-semibold text-xl mb-4">
            Monthly Requests
          </h2>

          <ResponsiveContainer
          width="100%"
          height={300}>

            <BarChart
            data={
              report.monthlyRequests
            }>

              <XAxis
              dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
              dataKey="requests"
              fill="#dc2626" />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="font-semibold text-xl mb-4">
            Blood Group Distribution
          </h2>

          <ResponsiveContainer
          width="100%"
          height={300}>

            <PieChart>

              <Pie
              data={
                report.bloodGroups
              }
              dataKey="units"
              nameKey="group"
              outerRadius={100}
              label>

                {report.bloodGroups.map(
                (entry,index) => (

                  <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                  />

                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Recent Donations */}

      <div className="bg-white mt-8 rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-4">
          Recent Donations
        </h2>

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>
              <th className="p-3">
                Donor
              </th>

              <th className="p-3">
                Blood Group
              </th>

              <th className="p-3">
                Units
              </th>

              <th className="p-3">
                City
              </th>
            </tr>

          </thead>

          <tbody>

            {report.recentDonations.map(
            (donor) => (

              <tr
              key={donor._id}
              className="border-b">

                <td className="p-3">
                  {donor.donorName}
                </td>

                <td className="p-3">
                  {donor.bloodGroup}
                </td>

                <td className="p-3">
                  {donor.units}
                </td>

                <td className="p-3">
                  {donor.city}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reports;