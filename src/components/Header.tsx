import { Search, User, ShoppingCart, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../lib/auth/auth-context';
import { useCart } from '../lib/cart/cart-context';
import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { CartDrawer } from './CartDrawer';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { items, totalItems } = useCart();
  const location = useLocation();
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Close cart drawer when route changes
  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname]);

  const toggleCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCartOpen(prev => !prev);
  }, []);

  return (
    <>
      <header className="w-full bg-white border-b border-border relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <h1 className="text-2xl font-bold text-primary">Arowana</h1>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-1">
                <span className="text-foreground cursor-pointer hover:text-primary transition-colors">Home</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-foreground cursor-pointer hover:text-primary transition-colors">About Us</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>
              <NavLink 
                to="/products" 
                className={({ isActive }) => 
                  `flex items-center space-x-1 ${isActive ? 'text-primary' : 'text-foreground hover:text-primary'} transition-colors`
                }
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </NavLink>
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Search className="w-5 h-5" />
              </Button>
              
              {/* Account Dropdown */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-muted-foreground hover:text-primary"
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                >
                  <User className="w-5 h-5" />
                </Button>
                
                {isAccountOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    onMouseLeave={() => setIsAccountOpen(false)}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-700">
                          <p className="font-medium">Welcome, {user?.email}</p>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <button
                          onClick={() => {
                            logout();
                            setIsAccountOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Create account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <div className="relative">
                <button 
                  onClick={toggleCart}
                  className="p-2 text-gray-600 hover:text-gray-900 relative"
                  aria-label={isCartOpen ? 'Close cart' : 'Open cart'}
                  aria-expanded={isCartOpen}
                >
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}