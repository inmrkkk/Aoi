import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout, isAdmin } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', show: true },
    { path: '/gallery', label: 'Gallery', show: true },
    { path: '/upload', label: 'Upload', show: isAdmin() },
    { path: '/about', label: 'About', show: true },
    { path: '/login', label: 'Login', show: !currentUser },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="relative sticky top-0 z-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/background.jpg"
          alt="Navigation background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-95"></div>
      </div>
      
      {/* Navigation Content */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <i className="fas fa-spa text-flower-rose text-2xl"></i>
              <span className="font-bold text-xl text-gray-800">Gigante Fleur</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.filter(link => link.show).map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 relative ${
                  isActive(link.path)
                    ? 'text-flower-rose border-b-2 border-flower-rose'
                    : 'text-gray-600 hover:text-flower-rose'
                }`}
              >
                {link.label}
                {link.badge > 0 && (
                  <span className="absolute -top-2 -right-3 bg-flower-rose text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
            {currentUser && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700">{currentUser.name}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    {currentUser.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-flower-rose transition-colors"
                  title="Logout"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-flower-rose focus:outline-none"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.filter(link => link.show).map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 relative ${
                      isActive(link.path)
                        ? 'text-flower-rose bg-flower-pink'
                        : 'text-gray-600 hover:text-flower-rose hover:bg-flower-pink'
                    }`}
                  >
                    {link.label}
                    {link.badge > 0 && (
                      <span className="absolute top-2 right-3 bg-flower-rose text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
                {currentUser && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-flower-rose hover:bg-flower-pink"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
