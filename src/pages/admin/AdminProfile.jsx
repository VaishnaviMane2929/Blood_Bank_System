import {
  Mail,
  Phone,
  Shield,
  Calendar,
  MapPin,
  Edit,
} from "lucide-react";

function AdminProfile() {
  const admin = JSON.parse(
    localStorage.getItem("adminInfo") || "{}"
  );

  return (
    <div className="max-w-6xl mx-auto">

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

        {/* Cover */}

        <div className="h-48 bg-gradient-to-r from-red-600 via-red-500 to-pink-500"></div>

        <div className="px-10 pb-10">

          <div className="-mt-16 flex justify-between items-end">

            <div className="flex items-center gap-6">

              <img
                src={`https://ui-avatars.com/api/?name=${
                  admin?.name || "Admin"
                }&background=dc2626&color=fff&size=200`}
                alt="admin"
                className="w-32 h-32 rounded-full border-[6px] border-white shadow-lg"
              />

              <div>
                <h1 className="text-3xl font-bold">
                  {admin?.name || "Administrator"}
                </h1>

                <p className="text-gray-500 mt-1">
                  {admin?.role || "System Administrator"}
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition">
              <Edit size={18} />
              Edit Profile
            </button>

          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-10">

            <div className="bg-gray-50 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Personal Information
              </h2>

              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <Mail className="text-red-600" />
                  <div>
                    <p className="text-gray-500 text-sm">
                      Email
                    </p>
                    <p className="font-semibold">
                      {admin?.email ||
                        "admin@gmail.com"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="text-red-600" />
                  <div>
                    <p className="text-gray-500 text-sm">
                      Mobile
                    </p>
                    <p className="font-semibold">
                      {admin?.mobile ||
                        "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Shield className="text-red-600" />
                  <div>
                    <p className="text-gray-500 text-sm">
                      Role
                    </p>
                    <p className="font-semibold">
                      {admin?.role ||
                        "Administrator"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MapPin className="text-red-600" />
                  <div>
                    <p className="text-gray-500 text-sm">
                      City
                    </p>
                    <p className="font-semibold">
                      {admin?.city || "Pune"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Calendar className="text-red-600" />
                  <div>
                    <p className="text-gray-500 text-sm">
                      Joined
                    </p>
                    <p className="font-semibold">
                      {admin?.createdAt
                        ? new Date(
                            admin.createdAt
                          ).toLocaleDateString()
                        : "2026"}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="bg-gray-50 rounded-2xl p-6">

              <h2 className="text-xl font-bold mb-6">
                Account Summary
              </h2>

              <div className="grid grid-cols-2 gap-5">

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h4 className="text-gray-500">
                    Role
                  </h4>

                  <p className="text-2xl font-bold mt-2 text-red-600">
                    Admin
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h4 className="text-gray-500">
                    Status
                  </h4>

                  <p className="text-2xl font-bold mt-2 text-green-600">
                    Active
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h4 className="text-gray-500">
                    Access
                  </h4>

                  <p className="text-2xl font-bold mt-2 text-blue-600">
                    Full
                  </p>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <h4 className="text-gray-500">
                    Security
                  </h4>

                  <p className="text-2xl font-bold mt-2 text-purple-600">
                    Enabled
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProfile;