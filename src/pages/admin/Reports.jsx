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
    bloodGroups: [],
    monthlyRequests: [],
    recentDonations: [],
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports =
  async () => {
    const res =
    await getReports();

    setReport(res);
  };

  const COLORS = [
    "#dc2626",
    "#ef4444",
    "#f87171",
    "#fca5a5",
    "#fecaca",
  ];

  return (
    <>
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Reports & Analytics
        </h1>

        <p className="text-gray-500">
          Dynamic MongoDB Reports
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* Requests Chart */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="font-semibold mb-4">
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

        {/* Blood Stock */}

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="font-semibold mb-4">
            Blood Distribution
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

      <div className="bg-white mt-8 p-6 rounded-2xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Recent Donations
        </h2>

        <table className="w-full">

          <thead className="bg-gray-100">

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

            {report.recentDonations?.map(
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
    </>
  );
}

export default Reports;