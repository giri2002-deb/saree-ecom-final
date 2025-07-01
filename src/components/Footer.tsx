import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-medium text-black mb-6 tracking-wide">
              CUSTOMER SERVICE
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Help & Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Online Stores
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-medium text-black mb-6 tracking-wide">
              COMPANY
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  What We Do
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Available Services
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Latest Posts
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-medium text-black mb-6 tracking-wide">
              SOCIAL MEDIA
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Tumblr
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>

          {/* Profile */}
          <div>
            <h3 className="text-sm font-medium text-black mb-6 tracking-wide">
              PROFILE
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Checkout
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Order Tracking
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                  Help & Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 DEPOT. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-black transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}