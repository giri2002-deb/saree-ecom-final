import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ cartCount, onCartClick, currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP' },
    { id: 'pages', label: 'PAGES' },
    { id: 'elements', label: 'ELEMENTS' }
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'text-black border-b-2 border-black pb-2'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold tracking-[0.2em] text-black hover:text-gray-800 transition-colors duration-200"
            >
              DEPOT
            </button>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200">
              <Search size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors duration-200">
              <User size={20} className="text-gray-600" />
            </button>
            <span className="hidden md:inline text-sm text-gray-600">LOGIN</span>
            <button
              onClick={onCartClick}
              className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-full transition-colors duration-200"
            >
              <ShoppingCart size={20} className="text-gray-600" />
              <span className="text-sm text-gray-600">
                CART ({cartCount})
              </span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-sm font-medium tracking-wide transition-colors duration-200 ${
                    currentPage === item.id ? 'text-black' : 'text-gray-600'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}