// src/components/Footer/Footer.jsx

import { HeartPulse } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HeartPulse className="text-red-500" size={30} />

            <h2 className="text-2xl font-bold">
              BloodConnect
            </h2>
          </div>

          <p className="text-gray-400">
            Donate blood and become the reason for someone’s heartbeat.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Home</li>
            <li>Donate Blood</li>
            <li>Find Donor</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Services
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Blood Donation</li>
            <li>Emergency Support</li>
            <li>Blood Request</li>
            <li>Hospital Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Pune, Maharashtra</li>
            <li>bloodconnect@gmail.com</li>
            <li>+91 9876543210</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
        © 2026 BloodConnect. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;