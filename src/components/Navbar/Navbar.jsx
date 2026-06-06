
import { UserCircle2 } from "lucide-react";
import { useState } from "react";
import { Menu, X, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { UserCircle2 } from "lucide-react";

// import { useNavigate } from "react-router-dom";

function Navbar() {
   const [isOpen, setIsOpen] = useState(false);

  // const navigate = useNavigate();

  // const user = JSON.parse(
  //   localStorage.getItem("user")
  // );
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/");
    window.location.reload();
  };
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Donate Blood", path: "/donate" },
    { name: "Find Donor", path: "/find-donor" },
    { name: "Request Blood", path: "/request-blood" },
    { name: "Contact", path: "/contact" },
  ];
  

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-red-600 p-2 rounded-full">
              <HeartPulse className="text-white w-6 h-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-red-600">
                BloodConnect
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Save Lives
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-gray-700 font-medium hover:text-red-600 transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">

  {user ? (
    <>
      <div className="flex items-center gap-3">
        
        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            {user.name}
          </p>

          <p className="text-xs text-gray-500">
            {user.bloodGroup}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>
    </>
  ) : (
    <>
      <Link to="/login">
        <button className="px-5 py-2 border border-red-600 text-red-600 rounded-lg">
          Login
        </button>
      </Link>

      <Link to="/register">
        <button className="px-5 py-2 bg-red-600 text-white rounded-lg">
          Register
        </button>
      </Link>
    </>
  )}

</div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-7 h-7 text-red-600" />
            ) : (
              <Menu className="w-7 h-7 text-red-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col px-6 py-5 gap-5">
            
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-gray-700 font-medium hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <div className="hidden lg:flex items-center gap-4">

  {user ? (
    <>
      <span className="font-semibold text-red-600">
        Hello, {user.name}
      </span>

      <button
        onClick={handleLogout}
        className="px-5 py-2 bg-red-600 text-white rounded-lg"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <Link to="/login">
        <button className="px-5 py-2 border border-red-600 text-red-600 rounded-lg">
          Login
        </button>
      </Link>

      <Link to="/register">
        <button className="px-5 py-2 bg-red-600 text-white rounded-lg">
          Register
        </button>
      </Link>
    </>
  )}

</div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;