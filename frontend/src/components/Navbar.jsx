import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import RegisterModal from "../pages/RegisterModal";
import LoginModal from "../pages/Login";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const [showServices, setShowServices] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showCompany, setShowCompany] = useState(false);

  const [userName, setUserName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const { isAdminLoggedIn, logout } = useContext(AuthContext);
  const { isCustomerLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setUserLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const storedName = localStorage.getItem("userName");
    setUserLoggedIn(!!token);
    if (storedName) setUserName(storedName);
  }, []);

  useEffect(() => {
    const anyModalOpen = showRegister || showLogin;
    document.body.style.overflow = anyModalOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showRegister, showLogin]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const AuthButtons = () => (
    <>
      {!userLoggedIn && (
        <button onClick={() => setShowRegister(true)} className="text-blue-600 hover:underline">
          Register
        </button>
      )}

      {userLoggedIn && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FaUserCircle size={22} />
            <span className="text-sm font-medium">{userName}</span>
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white border rounded shadow-md w-52 z-50">
              {isAdminLoggedIn && (
                <Link
                  to="/admin-dashboard"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              )}
              {isCustomerLoggedIn && (
                <Link
                  to="/customer/overview"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Customer Dashboard
                </Link>
              )}
              <Link
                to="/account"
                onClick={() => setDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Account
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
  return (
    <>
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-xl md:text-2xl font-bold text-blue-700">
            FinSecure
          </Link>

          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
            <Link to="/">Home</Link>

            <div className="relative group">
              <button className="hover:text-blue-700">Services</button>
              <div className="absolute top-full left-0 mt-2 w-52 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Life Insurance</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Health Insurance</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Term Plans</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Investment Plans</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Retirement Plans</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="hover:text-blue-700 font-medium px-4 py-2">
                Products
              </button>
              <div className="absolute left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-200 z-50">
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">ULIP (Unit Linked Insurance Plan)</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Mutual Funds</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">SIP (Systematic Investment Plan)</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Tax Saving Plans</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Pension Schemes</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Critical Illness Plans</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Guaranteed Return Plans</Link>
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => setShowCompany(true)}
              onMouseLeave={() => setShowCompany(false)}
            >
              <button className="text-gray-700 hover:text-blue-700 font-medium px-4 py-2">
                More
              </button>

              <div className={`absolute top-full left-0 mt-1 bg-white shadow-md rounded-lg w-56 z-50 transition-opacity duration-200 ${showCompany ? "opacity-100 visible" : "opacity-0 invisible"}`} >
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">About Us</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Our Team</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Careers</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Partners</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Media & Press</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Testimonials</Link>
                <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Awards & Recognition</Link>
              </div>
            </div>
            <AuthButtons />
          </nav>

          <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/40 z-40">
            <div className="bg-white w-3/4 h-full p-6 shadow-lg relative z-50">
              <button
                className="absolute top-4 right-4 text-gray-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={28} />
              </button>

              <nav className="flex flex-col space-y-6 mt-12 text-gray-800 text-lg font-medium">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <div className="flex flex-col">
                  <button className="text-left" onClick={() => setShowServices(!showServices)}>
                    Services
                  </button>
                  {showServices && (
                    <div className="ml-4 mt-2 flex flex-col space-y-2 text-sm text-gray-700">
                      <Link to="#" onClick={() => setMobileMenuOpen(false)}>Life Insurance</Link>
                      <Link to="#" onClick={() => setMobileMenuOpen(false)}>Health Insurance</Link>
                      <Link to="#" onClick={() => setMobileMenuOpen(false)}>Term Plans</Link>
                      <Link to="#" onClick={() => setMobileMenuOpen(false)}>Investment Plans</Link>
                      <Link to="#" onClick={() => setMobileMenuOpen(false)}>Retirement Plans</Link>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowProducts(!showProducts)}
                  className="text-left text-gray-800 font-medium"
                >
                  Products {showProducts}
                </button>
                {showProducts && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2 text-sm text-gray-700">
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>ULIP Plans</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Mutual Funds</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>SIP Plans</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Tax Saving Plans</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Pension Schemes</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Critical Illness Plans</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Guaranteed Return Plans</Link>
                  </div>
                )}
                <button
                  onClick={() => setShowCompany(!showCompany)}
                  className="text-left text-gray-800 font-medium"
                >
                  More {showCompany}
                </button>
                {showCompany && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2 text-sm text-gray-700">
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Our Team</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Careers</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Partners</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Media & Press</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
                    <Link to="#" onClick={() => setMobileMenuOpen(false)}>Awards & Recognition</Link>
                  </div>
                )}
                {!userLoggedIn && (
                  <>
                    <button
                      onClick={() => {
                        setShowRegister(true);
                        setMobileMenuOpen(false);
                      }}
                      className="text-blue-600 text-left"
                    >
                      Register
                    </button>
                  </>
                )}
                {userLoggedIn && (
                  <>
                    {isAdminLoggedIn && (
                      <Link to="/admin-dashboard" onClick={() => setMobileMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    {isCustomerLoggedIn && (
                      <Link
                        to="/customer/overview"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Customer Dashboard
                      </Link>
                    )}
                    <Link to="/account" onClick={() => setMobileMenuOpen(false)}>
                      My Account
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-red-600 text-left"
                    >
                      Logout
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showLogin && <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}
    </>
  );
};

export default Navbar;
