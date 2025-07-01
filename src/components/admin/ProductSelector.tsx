import React from 'react';
import { ChevronDown, Package } from 'lucide-react';
import { Product } from '../../types/Product';

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onProductSelect: (product: Product | null) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({ 
  products, 
  selectedProduct, 
  onProductSelect 
}) => {
  // Create a proper fallback image using a data URL
  const createFallbackImage = (size: string) => {
    const [width, height] = size.split('x').map(Number);
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af" text-anchor="middle" dy=".3em">No Image</text>
      </svg>
    `)}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <Package className="h-5 w-5 text-pink-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">Select Saree to Edit</h3>
      </div>
      
      <div className="relative">
        <select
          value={selectedProduct?.id || ''}
          onChange={(e) => {
            const product = products.find(p => p.id === e.target.value) || null;
            onProductSelect(product);
          }}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
        >
          <option value="">Select a saree to edit...</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (ID: {product.id})
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
      </div>
      
      {selectedProduct && (
        <div className="mt-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
          <div className="flex items-start space-x-3">
            <img
              src={selectedProduct.image || createFallbackImage('60x60')}
              alt={selectedProduct.name}
              className="h-12 w-12 rounded-lg object-cover border border-gray-200"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = createFallbackImage('60x60');
              }}
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{selectedProduct.name}</h4>
              <p className="text-sm text-gray-600">{selectedProduct.category}</p>
              <p className="text-sm font-medium text-pink-600">
                ₹{selectedProduct.price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {selectedProduct && (
        <button
          onClick={() => onProductSelect(null)}
          className="mt-3 w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          Clear Selection (Add New Saree)
        </button>
      )}
    </div>
  );
};

export default ProductSelector;