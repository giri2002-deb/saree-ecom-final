
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Star, Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const baseURL =
  import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

interface SareeData {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  images: string[] | null;
  fabric: string;
  description: string;
  rating: string | null;
  reviews: number | null;
  inStock: number;
  features: string[] | null;
  tags: string[] | null;
  category: string;
  subcategory: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  addin?: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [product, setProduct] = useState<SareeData | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<SareeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/sarees/${id}`);
        const productData = response.data;
        setProduct(productData);
        setSelectedImage('');
        setQuantity(1);

        const allProductsResponse = await axios.get(`${baseURL}/api/sarees`);
        const allProducts = allProductsResponse.data;

        const related = allProducts
          .filter((p: SareeData) => p.id !== productData.id &&
            (p.fabric === productData.fabric || p.category === productData.category))
          .slice(0, 8);

        setRelatedProducts(related);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const addToCart = async (product: SareeData) => {
    try {
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem('sessionId', sessionId);
      }

      const response = await axios.post(`${baseURL}/api/cart/${sessionId}/add`, {
        sareeId: product.id,
        quantity: quantity,
      });

      if (response.status === 201) {
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
        alert(`Added ${quantity} "${product.name}" to cart!`);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
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
      alert(`Added ${product.name} to cart (offline)!`);
    }
  };

  const handleBuyNow = (product: SareeData) => {
    navigate('/checkout', { state: { product, quantity } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

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
  const relatedFabricProducts = relatedProducts.filter(p => p.fabric === product.fabric).slice(0, 4);
  const relatedCategoryProducts = relatedProducts.filter(p => p.category === product.category && p.fabric !== product.fabric).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="flex space-x-4">
            <div className="flex flex-col space-y-4 w-24">
              {allImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square overflow-hidden rounded-lg bg-gray-100 border-2 ${mainImage === img ? 'border-black' : 'border-transparent'} cursor-pointer`}
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
            <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>

            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(parseFloat(product.rating || '0'))
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'}
                />
              ))}
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

            <p className="text-gray-600">{product.description}</p>

            {/* Quantity & Action Buttons */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                    disabled={quantity <= 1 || product.inStock === 0}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                    className="p-2 hover:bg-gray-50"
                    disabled={quantity >= product.inStock || product.inStock === 0}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-sm text-gray-500">In Stock: {product.inStock}</span>
              </div>

              {product.inStock === 0 ? (
                <button
                  disabled
                  className="w-full bg-gray-400 text-white px-4 py-3 rounded text-sm cursor-not-allowed"
                >
                  OUT OF STOCK
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="flex-1 bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 text-sm rounded hover:bg-gray-200"
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedFabricProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">Similar Fabric</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedFabricProducts.map((rp: SareeData) => (
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
