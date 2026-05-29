// src/pages/FindDonor.jsx

function FindDonor() {
  const donors = [
    {
      name: "Rahul Sharma",
      blood: "A+",
      city: "Pune",
    },
    {
      name: "Priya Patil",
      blood: "O+",
      city: "Mumbai",
    },
    {
      name: "Amit Joshi",
      blood: "B+",
      city: "Nashik",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center text-red-600 mb-12">
          Find Blood Donors
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          
          {donors.map((donor, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800">
                {donor.name}
              </h2>

              <p className="text-red-600 text-xl font-semibold mt-4">
                Blood Group: {donor.blood}
              </p>

              <p className="text-gray-500 mt-2">
                City: {donor.city}
              </p>

              <button className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700">
                Contact Donor
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FindDonor;