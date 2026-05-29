// src/pages/Home.jsx

import HeroSection from "../components/HeroSection/HeroSection";

function Home() {
  return (
    <>
      <HeroSection />

      {/* Blood Groups */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Available Blood Groups
            </h2>

            <p className="text-gray-500 mt-3">
              Find blood donors instantly by blood group.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
              (group, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-xl transition"
                >
                  <h3 className="text-3xl font-bold text-red-600">
                    {group}
                  </h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-red-600 mb-4">
                Fast Response
              </h3>

              <p className="text-gray-600">
                Quick blood request and donor matching system.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-red-600 mb-4">
                Trusted Donors
              </h3>

              <p className="text-gray-600">
                Verified donors with proper information and contact.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-red-600 mb-4">
                Emergency Support
              </h3>

              <p className="text-gray-600">
                24/7 support for emergency blood requirements.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;