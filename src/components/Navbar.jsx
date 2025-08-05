import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../service/AuthService';


export default function Navbar({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // implement search logic here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await logout();
    localStorage.setItem("isLoggedIn",response.isLogged)
    localStorage.clear();
    alert(response.message);
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate("/")
  };

  const handleDashboard = (e) => {
    e.preventDefault(); 
    if (role === 'CUSTOMER') navigate("/customerDashboard");
    else if (role === 'DISTRIBUTOR') navigate("/distributorDashboard");
    else if (role === 'admin') navigate("/adminDashboard");
    setIsMenuOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login');
    setIsMenuOpen(false);
  };


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contact", href: "#deals" },
    { name: "Products", href: "/products" },
    ...(isLoggedIn ? [{
        name: "Dashboard",
        href: "#",
        onClick: (e) => { e.preventDefault(); handleDashboard(e); }
      }] : []),
    
    {
      name: (
        isLoggedIn ?
          <span className="flex items-center gap-1"><LogOut size={20} /> Logout</span> :
          <span className="flex items-center gap-1"><User size={20} /> Login</span>
      ),
      href: "#",
      onClick: isLoggedIn ? handleLogout : handleLogin
    }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div onClick={() => navigate("/")} className="flex items-center cursor-pointer">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-100 to-purple-200 bg-clip-text text-transparent ">
                GadgetHub
              </h1>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block ">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search for gadgets, brands, and more..."
                    value={searchQuery}
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white text-sm placeholder-white bg-transparent"
                  />

                <button onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white px-4 py-1.5 rounded-lg hover:text-indigo-500 transition-colors">
                  Search
                </button>
              </div>
            </div>
          
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={link.onClick || undefined}
                  className="text-white hover:text-indigo-500 font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              {/* Cart */}
              <button className="relative p-2 text-white hover:text-indigo-500 transition-colors group">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white hover:text-indigo-500">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-40 bg-black/80 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">

        <div className="w-full max-w-[300px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
              <input
                type="text"
                placeholder="Search for gadgets, brands, and more..."
                value={searchQuery}
                onKeyPress={handleKeyPress}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-white text-sm placeholder-gray-400 bg-white/10 backdrop-blur-sm relative z-0"
              />
              <button 
                onClick={handleSearch} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white px-3 py-1.5 rounded-lg hover:bg-indigo-600 transition-colors text-sm font-medium z-10"
              >
                Search
              </button>
            </div>
          </div>
          
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-white text-2xl font-medium hover:text-indigo-600 transition-all duration-300"
              onClick={link.onClick || (() => setIsMenuOpen(false))}
            >
              {link.name}
            </a>
          ))}
          {/* Mobile Cart */}
          <button className="relative p-3 text-white hover:text-indigo-600">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
