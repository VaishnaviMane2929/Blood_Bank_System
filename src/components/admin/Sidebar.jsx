import { Users, Droplet, LayoutDashboard } from "lucide-react";

function Sidebar({ page, setPage }) {
  return (
    <div className="w-72 bg-red-600 text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        Blood Bank
      </h1>

      <div className="space-y-3">

        <button
          onClick={() => setPage("dashboard")}
          className="w-full text-left p-3 rounded-lg hover:bg-red-700"
        >
          Dashboard
        </button>

        <button
          onClick={() => setPage("donors")}
          className="w-full text-left p-3 rounded-lg hover:bg-red-700"
        >
          Manage Donors
        </button>

        <button
          onClick={() => setPage("requests")}
          className="w-full text-left p-3 rounded-lg hover:bg-red-700"
        >
          Blood Requests
        </button>

        <button
          onClick={() => setPage("stock")}
          className="w-full text-left p-3 rounded-lg hover:bg-red-700"
        >
          Blood Stock
        </button>

        <button
          onClick={() => setPage("users")}
          className="w-full text-left p-3 rounded-lg hover:bg-red-700"
        >
          Users
        </button>

      </div>

    </div>
  );
}

export default Sidebar;