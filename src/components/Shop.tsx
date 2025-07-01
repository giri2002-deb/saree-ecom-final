// src/pages/ShopPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sarees, Saree, fabrics } from '../data/sarees';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

export default function ShopPage() {
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const filtered = sarees
    .filter((s) => selectedFabric === 'All' || s.fabric === selectedFabric)
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  const addToCart = (product: Saree) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        fabric: product.fabric,
      },
    });
  };

  const handleBuyNow = (product: Saree) => {
    addToCart(product);
    navigate('/cart'); // Or go to a checkout page if you have one
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shop Sarees</h1>

      {/* Fabric Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={() => setSelectedFabric('All')}
          className={`px-4 py-2 rounded-full text-sm border font-semibold ${
            selectedFabric === 'All' ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {fabrics.map((fabric) => (
          <button
            key={fabric}
            onClick={() => setSelectedFabric(fabric)}
            className={`px-4 py-2 rounded-full text-sm border font-semibold ${
              selectedFabric === fabric ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {fabric}
          </button>
        ))}
      </div>

      {/* Sort Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="border border-gray-300 px-3 py-2 rounded text-sm"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition relative group"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-t-xl h-60 w-full object-cover"
            />

            <div
              className="p-4"
              onClick={(e) => e.stopPropagation()} // Prevents card click from firing
            >
              <h3 className="font-semibold text-md mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.fabric} Saree</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-gray-400">₹{product.originalPrice}</span>
                )}
              </div>
              {product.rating && (
                <div className="text-yellow-500 text-sm mb-3">⭐ {product.rating}</div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBuyNow(product)}
                  disabled={!product.inStock}
                  className="flex-1 bg-black text-white py-2 px-4 text-xs font-medium hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  BUY NOW
                </button>
                <button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 text-xs font-medium hover:bg-gray-200 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                >
                  <ShoppingCart size={12} />
                  <span>ADD TO CART</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
