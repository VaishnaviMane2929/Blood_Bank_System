// src/components/HeroSection/HeroSection.jsx

import { HeartHandshake, Search, ArrowRight } from "lucide-react";

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-red-50 to-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <div>
          <p className="text-red-600 font-semibold mb-4 uppercase tracking-widest">
            Donate Blood • Save Life
          </p>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Your Blood Can
            <span className="text-red-600"> Save Someone’s Life</span>
          </h1>

          <p className="text-gray-600 text-lg mt-6 leading-relaxed">
            Join our blood donation community and help hospitals,
            patients, and emergency cases get blood instantly.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button className="bg-red-600 hover:bg-red-700 text-white px-7 py-4 rounded-xl flex items-center gap-2 shadow-lg transition">
              Donate Now
              <HeartHandshake size={20} />
            </button>

            <button className="border border-red-600 text-red-600 hover:bg-red-50 px-7 py-4 rounded-xl flex items-center gap-2 transition">
              Find Donor
              <Search size={20} />
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-12">
            <div>
              <h2 className="text-3xl font-bold text-red-600">10K+</h2>
              <p className="text-gray-500">Active Donors</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-red-600">500+</h2>
              <p className="text-gray-500">Blood Requests</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-red-600">50+</h2>
              <p className="text-gray-500">Hospitals</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/blood-donation-concept-illustration_114360-7988.jpg"
            alt="Blood Donation"
            className="w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;