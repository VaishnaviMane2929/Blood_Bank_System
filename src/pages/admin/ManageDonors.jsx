import { Search, Users } from "lucide-react";

function ManageDonors() {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Manage Donors
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage all registered donors
          </p>
        </div>

        <button className="bg-red-600 text-white px-6 py-3 rounded-xl">
          Add Donor
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search donor..."
            className="w-full border rounded-xl py-3 pl-12 pr-4"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="bg-red-600 text-white p-5 flex items-center gap-3">
          <Users />
          <h2 className="font-semibold">
            Registered Donors
          </h2>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Blood Group</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="p-4">Vaishnavi</td>
              <td className="p-4">test@gmail.com</td>
              <td className="p-4">AB+</td>
              <td className="p-4">Pune</td>

              <td className="p-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  Active
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageDonors;