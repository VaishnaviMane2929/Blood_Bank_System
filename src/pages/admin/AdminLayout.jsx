import { useState } from "react";
import {
  Search,
  Bell,
  UserCircle2,
  LogOut,
  LayoutDashboard,
  Users,
  Droplets,
  FileText,
  Megaphone,
  BarChart3,
} from "lucide-react";

import AdminDashboard from "./AdminDashboard";
import ManageDonors from "./ManageDonors";
import BloodRequests from "./BloodRequests";
import BloodStock from "./BloodStock";
import Campaigns from "./Campaigns";
import UsersPage from "./Users";
import Reports from "./Reports";

function AdminLayout() {
  const [page, setPage] = useState("dashboard");

  const renderContent = () => {
    switch (page) {
      case "dashboard":
        return <AdminDashboard />;

      case "donors":
        return <ManageDonors />;

      case "requests":
        return <BloodRequests />;

      case "stock":
        return <BloodStock />;

      case "campaigns":
        return <Campaigns />;

      case "users":
        return <UsersPage />;

      case "reports":
        return <Reports />;

      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}

      <div className="w-72 bg-white shadow-lg flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-red-600">
            BloodBank
          </h1>

          <p className="text-gray-500">
            Admin Dashboard
          </p>
        </div>

        <div className="p-4 space-y-2 flex-1">
          <button
            onClick={() => setPage("dashboard")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl ${
              page === "dashboard"
                ? "bg-red-600 text-white"
                : "hover:bg-red-50"
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => setPage("donors")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl ${
              page === "donors"
                ? "bg-red-600 text-white"
                : "hover:bg-red-50"
            }`}
          >
            <Users size={20} />
            Manage Donors
          </button>

          <button
            onClick={() => setPage("requests")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl ${
              page === "requests"
                ? "bg-red-600 text-white"
                : "hover:bg-red-50"
            }`}
          >
            <FileText size={20} />
            Blood Requests
          </button>

          <button
            onClick={() => setPage("stock")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl ${
              page === "stock"
                ? "bg-red-600 text-white"
                : "hover:bg-red-50"
            }`}
          >
            <Droplets size={20} />
            Blood Stock
          </button>

          <button
            onClick={() => setPage("campaigns")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl ${
              page === "campaigns"
                ? "bg-red-600 text-white"
                : "hover:bg-red-50"
            }`}
          >
            <Megaphone size={20} />
            Campaigns
          </button>

          <button
            onClick={() => setPage("users")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl ${
              page === "users"
                ? "bg-red-600 text-white"
                : "hover:bg-red-50"
            }`}
          >
            <Users size={20} />
            Users
          </button>

          <button
            onClick={() => setPage("reports")}
            className={`flex items-center gap-3 w-full p-3 rounded-xl ${
              page === "reports"
                ? "bg-red-600 text-white"
                : "hover:bg-red-50"
            }`}
          >
            <BarChart3 size={20} />
            Reports
          </button>
        </div>

        <div className="p-4 border-t">
          <button className="flex items-center gap-2 text-red-600">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Area */}

      <div className="flex-1 flex flex-col">
        {/* Header */}

        <div className="bg-white px-8 py-4 shadow flex justify-between items-center">
          <div className="relative w-96">
            <Search
              className="absolute left-4 top-3 text-gray-400"
              size={20}
            />

            <input
              type="text"
              placeholder="Search donors, users..."
              className="w-full border rounded-xl py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex items-center gap-6">
            <Bell
              size={22}
              className="cursor-pointer"
            />

            <div className="flex items-center gap-3">
              <UserCircle2
                size={40}
                className="text-red-600"
              />

              <div>
                <h3 className="font-semibold">
                  Admin
                </h3>

                <p className="text-sm text-gray-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}

        <div className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;