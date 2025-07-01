// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Star, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { sarees } from '../data/sarees';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [product, setProduct] = useState(() => sarees.find(p => p.id === parseInt(id || '0')));

  useEffect(() => {
    const newProduct = sarees.find(p => p.id === parseInt(id || '0'));
    setProduct(newProduct);
    setSelectedImage('');
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">Return to Home</Link>
        </div>
      </div>
    );
  }

  const allImages = product.images?.length ? product.images : [product.image];
  const mainImage = selectedImage || allImages[0];
  const thumbnails = [mainImage, ...allImages.filter(img => img !== mainImage)];

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          fabric: product.fabric || '',
        },
      });
    }
  };

  const relatedFabricProducts = sarees.filter(
    p => p.id !== product.id && p.fabric === product.fabric
  ).slice(0, 4);

  const relatedCategoryProducts = sarees.filter(
    p => p.id !== product.id && p.category === product.category && p.fabric !== product.fabric
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-600">Shop</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-600">{product.fabric || product.category}</span>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-black font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-4 w-24">
              {thumbnails.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 ${
                    mainImage === img ? 'border-black' : 'border-transparent'
                  } cursor-pointer`}
                >
                  <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex-1 flex justify-center items-center bg-gray-100 rounded-lg shadow-lg p-4">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full max-w-md h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              {product.originalPrice && (
                <span className="bg-red-500 text-white px-3 py-1 text-xs font-medium rounded">SALE</span>
              )}
              {!product.inStock && (
                <span className="bg-gray-800 text-white px-3 py-1 text-xs font-medium rounded">SOLD OUT</span>
              )}
              <span className="bg-gray-100 text-gray-800 px-3 py-1 text-xs font-medium rounded">
                {product.fabric?.toUpperCase() || product.category?.toUpperCase()}
              </span>
            </div>

            <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating || 0} ({product.reviews || 0} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-6">
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              <span className="text-3xl font-semibold text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="bg-red-100 text-red-800 px-2 py-1 text-sm font-medium rounded">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-4">{product.description}</p>

            {Array.isArray(product.features) && product.features.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(product?.tags) && product.tags.length > 0 && (
              <div>
                <span className="text-sm text-gray-600">Tags: </span>
                {product.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-gray-600">
                    {tag}{index < (product.tags?.length || 0) - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={addToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-black text-white py-3 px-6 font-medium hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>ADD TO CART</span>
                </button>
                <button className="p-3 border border-gray-300 hover:bg-gray-50 transition-colors duration-200">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related by Fabric */}
        {relatedFabricProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Similar Fabric</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedFabricProducts.map(rp => (
                <div
                  key={rp.id}
                  onClick={() => navigate(`/product/${rp.id}`)}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                >
                  <img src={rp.image} alt={rp.name} className="w-full h-60 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{rp.name}</h3>
                    <p className="text-gray-600">₹{rp.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related by Category */}
        {relatedCategoryProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">More from {product.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCategoryProducts.map(rp => (
                <div
                  key={rp.id}
                  onClick={() => navigate(`/product/${rp.id}`)}
                  className="border rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                >
                  <img src={rp.image} alt={rp.name} className="w-full h-60 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">{rp.name}</h3>
                    <p className="text-gray-600">₹{rp.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
