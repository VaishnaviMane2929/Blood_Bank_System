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
        return (
          <>
            <h1 className="text-4xl font-bold mb-8">
              Dashboard Overview
            </h1>

            <div className="grid md:grid-cols-4 gap-6">

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-gray-500">
                  Total Donors
                </h3>

                <h2 className="text-4xl font-bold text-red-600 mt-3">
                  150
                </h2>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-gray-500">
                  Blood Requests
                </h3>

                <h2 className="text-4xl font-bold text-red-600 mt-3">
                  80
                </h2>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-gray-500">
                  Blood Units
                </h3>

                <h2 className="text-4xl font-bold text-red-600 mt-3">
                  350
                </h2>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="text-gray-500">
                  Total Users
                </h3>

                <h2 className="text-4xl font-bold text-red-600 mt-3">
                  120
                </h2>
              </div>

            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}

      <div className="w-72 bg-white shadow-lg">

        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-red-600">
            BloodBank
          </h1>

          <p className="text-gray-500">
            Admin Dashboard
          </p>
        </div>

        <div className="p-4 space-y-2">

          <button
            onClick={() => setPage("dashboard")}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            onClick={() => setPage("donors")}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <Users size={20} />
            Manage Donors
          </button>

          <button
            onClick={() => setPage("requests")}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <FileText size={20} />
            Blood Requests
          </button>

          <button
            onClick={() => setPage("stock")}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <Droplets size={20} />
            Blood Stock
          </button>

          <button
            onClick={() => setPage("campaigns")}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <Megaphone size={20} />
            Campaigns
          </button>

          <button
            onClick={() => setPage("users")}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <Users size={20} />
            Users
          </button>

          <button
            onClick={() => setPage("reports")}
            className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <BarChart3 size={20} />
            Reports
          </button>

        </div>

        <div className="absolute bottom-5 left-4">
          <button className="flex items-center gap-2 text-red-600 cursor-pointer">
            <LogOut size={18} />
            Logout
          </button>
        </div>

      </div>

      {/* Main Section */}

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
              placeholder="Search..."
              className="w-full border rounded-xl py-2 pl-12 pr-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-6">

            <Bell
              size={22}
              className="cursor-pointer"
            />

            <div className="flex items-center gap-3 cursor-pointer" >

              <UserCircle2
                size={40}
                className="text-red-600"
              />

              <div>
                <h3 className="font-semibold cursor-pointer">
                  Admin
                </h3>

                <p className="text-sm text-gray-500">
                  Administrator
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Dynamic Content */}

        <div className="p-8 overflow-y-auto">
          {renderContent()}
        </div>

      </div>

    </div>
  );
}

export default AdminLayout;