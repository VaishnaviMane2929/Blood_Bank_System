function UserDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-red-600 text-white p-5 flex justify-between">

        <h1 className="text-2xl font-bold">
          BloodConnect
        </h1>

        <div>
          Welcome {user?.name}
        </div>

      </div>

      {/* Dashboard */}

      <div className="p-10">

        <h1 className="text-4xl font-bold mb-8">
          User Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2>Blood Stock</h2>
            <p className="text-3xl font-bold text-red-600">
              850 Units
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2>Blood Requests</h2>
            <p className="text-3xl font-bold text-red-600">
              120
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2>My Donations</h2>
            <p className="text-3xl font-bold text-red-600">
              5
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;