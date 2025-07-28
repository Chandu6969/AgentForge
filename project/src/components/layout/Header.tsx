import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Settings, Plus } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME } from '../../utils/constants';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  const isActive = (path: string) => {
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 w-full border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary-600 to-accent-500 w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500">
                {APP_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  isActive(link.href) ? 'text-primary-600' : 'text-neutral-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth buttons / User menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-primary-600"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || user.email} className="w-8 h-8 rounded-full" />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <span className="max-w-[100px] truncate">{user.displayName || user.email.split('@')[0]}</span>
                  <ChevronDown size={16} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/create-agent"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Plus size={16} className="mr-2" />
                      Create New Agent
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-error-600 hover:bg-neutral-100"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Start for Free
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-neutral-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                }`}
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-100"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/create-agent"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-100"
                  onClick={toggleMenu}
                >
                  Create New Agent
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-primary-600 hover:bg-neutral-100"
                  onClick={toggleMenu}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-error-600 hover:bg-neutral-100"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="pt-4 pb-3 border-t border-neutral-200">
                <div className="flex items-center px-3 space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toggleMenu();
                      navigate('/login');
                    }}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      toggleMenu();
                      navigate('/signup');
                    }}
                    className="w-full"
                  >
                    Start for Free
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;