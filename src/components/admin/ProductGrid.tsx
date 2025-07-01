import { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit, Trash2, Eye, Heart } from 'lucide-react';
import { Product } from '../../types/admin';

interface ProductGridProps {
  products: Product[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onViewProduct: (product: Product) => void;
}

export const ProductGrid = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onViewProduct
}: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const categories = ['All', 'Silk Sarees', 'Cotton Sarees', 'Georgette Sarees', 'Banarasi Sarees', 'Designer Sarees', 'Net Sarees'];
  const colors = ['red', 'pink', 'blue', 'green', 'gold', 'silver', 'black', 'maroon', 'yellow', 'purple', 'orange', 'white'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesColor = selectedColors.length === 0 || selectedColors.some(color => product.colors.includes(color));
    
    return matchesSearch && matchesCategory && matchesPrice && matchesColor;
  });

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 10000 });
    setSelectedColors([]);
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Filters Sidebar */}
      <div className="w-64 bg-white border-r border-pink-200 p-6 overflow-y-auto shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="h-5 w-5 text-pink-500" />
            Filters
          </h3>
          <button
            onClick={clearFilters}
            className="text-sm text-pink-600 hover:text-pink-700 font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">CATEGORIES</h4>
          <div className="space-y-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  (category === 'All' && !selectedCategory) || selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 border border-pink-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">PRICE RANGE</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span className="text-gray-400">to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">COLORS</h4>
          <div className="grid grid-cols-6 gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => handleColorToggle(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColors.includes(color)
                    ? 'border-pink-500 ring-2 ring-pink-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                style={{ backgroundColor: color === 'gold' ? '#FFD700' : color === 'silver' ? '#C0C0C0' : color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-pink-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent flex items-center gap-2">
              <Heart className="h-6 w-6 text-pink-500" />
              Saree Collection
            </h2>
            <button
              onClick={onAddProduct}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
              Add New Saree
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for sarees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl border border-pink-100 overflow-hidden hover:shadow-xl transition-all duration-300 group transform hover:scale-105">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Sale
                    </div>
                  )}
                  {product.featured && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === product.id ? null : product.id)}
                        className="bg-white rounded-full p-1 shadow-lg hover:bg-gray-50"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {openDropdown === product.id && (
                        <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button
                            onClick={() => {
                              onViewProduct(product);
                              setOpenDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                          <button
                            onClick={() => {
                              onEditProduct(product);
                              setOpenDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDeleteProduct(product.id);
                              setOpenDropdown(null);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-pink-600 mb-3 font-medium">{product.category}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{product.stock} Stock</span>
                    <span>{product.sold} Sold</span>
                    <span>⭐ {product.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sarees found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};