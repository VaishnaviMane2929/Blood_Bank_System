// src/pages/AdminDashboard.jsx

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <div className="w-72 bg-red-600 text-white p-8">
        
        <h1 className="text-3xl font-bold mb-10">
          Admin Panel
        </h1>

        <ul className="space-y-6 text-lg">
          <li>Dashboard</li>
          <li>Manage Donors</li>
          <li>Blood Requests</li>
          <li>Blood Stock</li>
          <li>Campaigns</li>
          <li>Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        
        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          Dashboard Overview
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-gray-500">Total Donors</h2>

            <p className="text-5xl font-bold text-red-600 mt-4">
              1200
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-gray-500">Blood Requests</h2>

            <p className="text-5xl font-bold text-red-600 mt-4">
              320
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-gray-500">Blood Units</h2>

            <p className="text-5xl font-bold text-red-600 mt-4">
              850
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;