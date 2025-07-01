import React, { useState } from 'react';
import { ChevronRight, Grid, List, Filter, SlidersHorizontal } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { products, Product } from '../data/products';

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

const categories: Category[] = [
  {
    id: 'home-decor',
    name: 'Home Decor',
    subcategories: ['Wall Art', 'Mirrors', 'Candles', 'Picture Frames']
  },
  {
    id: 'lighting',
    name: 'Lighting',
    subcategories: ['Pendant Lights', 'Table Lamps', 'Floor Lamps', 'Ceiling Lights']
  },
  {
    id: 'pots',
    name: 'Pots',
    subcategories: ['Tea Pots', 'Flower Pots', 'Ceramic Pots', 'Metal Pots']
  },
  {
    id: 'vases',
    name: 'Vases',
    subcategories: ['Ceramic Vases', 'Glass Vases', 'Metal Vases', 'Decorative Vases']
  },
  {
    id: 'furniture',
    name: 'Furniture',
    subcategories: ['Chairs', 'Tables', 'Storage', 'Shelving']
  },
  {
    id: 'textiles',
    name: 'Textiles',
    subcategories: ['Cushions', 'Throws', 'Rugs', 'Curtains']
  }
];

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
}

export default function ShopPage({ onAddToCart }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    // Simple category matching - in a real app, products would have category fields
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600">Home</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-black font-medium">Shop</span>
            {selectedCategory !== 'all' && (
              <>
                <ChevronRight size={16} className="text-gray-400" />
                <span className="text-black font-medium">
                  {categories.find(cat => cat.id === selectedCategory)?.name}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white border border-gray-100 rounded-lg p-6">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-black mb-4 tracking-wide">
                  CATEGORIES
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedSubcategory('all');
                    }}
                    className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors duration-200 ${
                      selectedCategory === 'all'
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => (
                    <div key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedSubcategory('all');
                        }}
                        className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors duration-200 ${
                          selectedCategory === category.id
                            ? 'bg-black text-white'
                            : 'text-gray-600 hover:text-black hover:bg-gray-50'
                        }`}
                      >
                        {category.name}
                      </button>
                      {selectedCategory === category.id && (
                        <div className="ml-4 mt-2 space-y-1">
                          {category.subcategories.map((subcategory) => (
                            <button
                              key={subcategory}
                              onClick={() => setSelectedSubcategory(subcategory)}
                              className={`block w-full text-left text-xs py-1 px-2 rounded transition-colors duration-200 ${
                                selectedSubcategory === subcategory
                                  ? 'bg-gray-100 text-black'
                                  : 'text-gray-500 hover:text-black hover:bg-gray-50'
                              }`}
                            >
                              {subcategory}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-black mb-4 tracking-wide">
                  PRICE RANGE
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">Under $50</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">$100 - $200</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">Over $200</span>
                  </label>
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <h3 className="text-sm font-medium text-black mb-4 tracking-wide">
                  BRAND
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">DEPOT</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">Modern Living</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">Scandinavian</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-600">Minimalist</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h1 className="text-2xl font-light text-black mb-2">
                  {selectedCategory === 'all' 
                    ? 'All Products' 
                    : categories.find(cat => cat.id === selectedCategory)?.name
                  }
                </h1>
                <p className="text-sm text-gray-600">
                  Showing {filteredProducts.length} products
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-200 rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${
                      viewMode === 'grid' 
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${
                      viewMode === 'list' 
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:text-black'
                    }`}
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="name">Name A-Z</option>
                </select>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 border border-gray-200 rounded px-3 py-2 text-sm"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden mb-8 bg-white border border-gray-100 rounded-lg p-6">
                {/* Mobile filter content - same as sidebar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-black mb-4 tracking-wide">
                      CATEGORIES
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`block w-full text-left text-sm py-2 px-3 rounded transition-colors duration-200 ${
                            selectedCategory === category.id
                              ? 'bg-black text-white'
                              : 'text-gray-600 hover:text-black hover:bg-gray-50'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-black mb-4 tracking-wide">
                      PRICE RANGE
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Under $50</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">$50 - $100</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">$100 - $200</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-gray-600">Over $200</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products */}
            <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
}