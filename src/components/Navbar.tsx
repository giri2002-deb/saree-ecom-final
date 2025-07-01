import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  const handleShopClick = () => {
    if (isHomePage) {
      const element = document.getElementById('shop-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#shop-section';
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-[0.2em] text-black hover:text-gray-800 transition-colors duration-200"
          >
            SAREE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-black">HOME</Link>
            <  Link to="/shop"className="text-sm font-medium text-gray-600 hover:text-black">SHOP</Link>
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-black">ABOUT</Link>
            <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-black">CONTACT</Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {isSearchOpen ? (
              <input
                type="text"
                placeholder="Search sarees..."
                className="w-52 md:w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-black transition-all"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
              >
                <Search size={20} className="text-gray-600" />
              </button>
            )}

            {/* Wishlist */}
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200">
              <Heart size={20} className="text-gray-600" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="text-sm text-gray-600">({state.itemCount})</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-gray-600 hover:text-black">HOME</Link>
              <button onClick={handleShopClick} className="text-left text-sm font-medium text-gray-600 hover:text-black">SHOP</button>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-gray-600 hover:text-black">ABOUT</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-sm font-medium text-gray-600 hover:text-black">CONTACT</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
