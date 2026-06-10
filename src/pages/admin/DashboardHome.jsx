function DashboardHome() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard Overview
      </h1>

      <div className="grid lg:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Total Donors</h2>
          <p className="text-4xl font-bold text-red-600">
            150
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Blood Requests</h2>
          <p className="text-4xl font-bold text-red-600">
            80
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Blood Units</h2>
          <p className="text-4xl font-bold text-red-600">
            350
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2>Total Users</h2>
          <p className="text-4xl font-bold text-red-600">
            120
          </p>
        </div>

      </div>
    </>
  );
}

export default DashboardHome;