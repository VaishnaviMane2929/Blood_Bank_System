import {
  Search,
  Bell,
  UserCircle2
} from "lucide-react";

function Header() {
  return (
    <div className="bg-white shadow rounded-2xl p-4 mb-8 flex justify-between items-center">

      <div className="relative w-96">

        <Search
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search..."
          className="w-full border rounded-xl py-2 pl-10"
        />

      </div>

      <div className="flex items-center gap-5">

        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-2">

          <UserCircle2 size={40} />

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
  );
}

export default Header;