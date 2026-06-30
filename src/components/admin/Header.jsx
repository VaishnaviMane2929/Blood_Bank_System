import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function Header({ setPage }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const adminData = localStorage.getItem("adminInfo");

const admin =
  adminData && adminData !== "undefined"
    ? JSON.parse(adminData)
    : {};

  console.log("ADMIN DATA:", admin);

  const handleLogout = () => {
    // localStorage.removeItem("adminInfo");
    // localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="bg-white shadow-sm border rounded-2xl px-6 py-4 mb-6 flex justify-between items-center">
      {/* Search Box */}
      <div className="relative w-96">
        <Search
          size={20}
          className="absolute left-4 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search donors, users, requests..."
          className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={22} />

          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              console.log("Clicked");
              setOpen(!open);
            }}
            className="flex items-center gap-3 bg-yellow-200 px-3 py-2 rounded-xl"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${
                admin?.name || "Admin"
              }`}
              alt="admin"
              className="w-12 h-12 rounded-full border"
            />

            <div className="text-left">
              <h3 className="font-semibold">
                {admin?.name || "Admin"}
              </h3>

              <p className="text-sm text-gray-500">
                {admin?.role || "Administrator"}
              </p>
            </div>

            <ChevronDown size={18} />
          </button>

          {open && (
            <div className="absolute right-0 top-16 w-64 bg-white shadow-xl rounded-2xl border overflow-hidden z-50">
              <div className="p-4 border-b">
                <h3 className="font-semibold">
                  {admin?.name || "Admin"}
                </h3>

                <p className="text-sm text-gray-500">
                  {admin?.email || "admin@gmail.com"}
                </p>
              </div>

              <button
  onClick={() => {
    setPage("profile");
    setOpen(false);
  }}
  className="flex items-center gap-3 w-full px-4 py-3 hover:bg-red-50"
>
  <User size={18} />
  My Profile
</button>

              <button className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50">
                <Settings size={18} />
                Settings
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;