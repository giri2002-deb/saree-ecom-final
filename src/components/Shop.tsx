// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { ShoppingCart } from 'lucide-react';

// interface SareeData {
//   id: number;
//   name: string;
//   price: number;
//   originalPrice: number | null;
//   image: string;
//   images: string[] | null;
//   fabric: string;
//   description: string;
//   rating: string | null;
//   reviews: number | null;
//   stack: number;
//   features: string[] | null;
//   tags: string[] | null;
//   category: string;
//   subcategory: string | null;
//   createdAt: Date | null;
//   updatedAt: Date | null;
// }

// export default function ShopPage() {
//   const [sarees, setSarees] = useState<SareeData[]>([]);
//   const [selectedFabric, setSelectedFabric] = useState<string>('All');
//   const [selectedCategory, setSelectedCategory] = useState<string>('All');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [loading, setLoading] = useState(true);
//   const [addingToCart, setAddingToCart] = useState<number | null>(null);
//   const { dispatch } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSarees = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get<SareeData[]>('/api/sarees');
//         setSarees(response.data);
//       } catch (error) {
//         console.error('Error fetching sarees:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSarees();
//   }, []);


//   const categories = ['All', 'Wedding', 'Party', 'Daily', 'Silk', 'Cotton', 'Georgette', 'Chiffon'];

//   const filteredSarees = sarees
//     .filter(
//       (s) =>
//         (selectedFabric === 'All' || s.fabric === selectedFabric) &&
//         (selectedCategory === 'All' || s.category === selectedCategory)
//     )
//     .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

//   const addToCart = async (product: SareeData) => {
//     if (!product.stack || product.stack <= 0) {
//       alert('This product is out of stock');
//       return;
//     }

//     setAddingToCart(product.id);

//     try {
//       dispatch({
//         type: 'ADD_TO_CART',
//         payload: {
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           image: product.image,
//           fabric: product.fabric,
//         },
//       });

//       let sessionId = localStorage.getItem('sessionId');
//       if (!sessionId) {
//         sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
//         localStorage.setItem('sessionId', sessionId);
//       }

//       const response = await axios.post(`/api/cart/${sessionId}/add`, {
//         sareeId: product.id,
//         quantity: 1,
//       });

//       if (response.status !== 201) {
//         dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
//         throw new Error('Failed to add to cart');
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Failed to add item to cart. Please try again.');
//     } finally {
//       setAddingToCart(null);
//     }
//   };

//   const handleBuyNow = async (product: SareeData) => {
//     if (!product.stack || product.stack <= 0) {
//       alert('This product is out of stock');
//       return;
//     }

//     try {
//       await addToCart(product);
//       navigate('/cart');
//     } catch (error) {
//       console.error('Error in buy now:', error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Shop Sarees</h1>

//       {/* Category Filter */}
//       <div className="flex flex-wrap gap-3 justify-center mb-4">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setSelectedCategory(cat)}
//             className={`px-4 py-2 rounded-full text-sm border font-semibold ${
//               selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </div>

//       {/* Fabric Filter */}
//       {/* <div className="flex flex-wrap gap-3 justify-center mb-6">
//         {fabrics.map((fabric) => (
//           <button
//             key={fabric}
//             onClick={() => setSelectedFabric(fabric)}
//             className={`px-4 py-2 rounded-full text-sm border font-semibold ${
//               selectedFabric === fabric ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
//             }`}
//           >
//             {fabric}
//           </button>
//         ))}
//       </div> */}

//       {/* Sort Dropdown */}
//       <div className="flex justify-end mb-4">
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
//           className="border border-gray-300 px-3 py-2 rounded text-sm"
//         >
//           <option value="asc">Price: Low to High</option>
//           <option value="desc">Price: High to Low</option>
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredSarees.map((product) => (
//           <div
//             key={product.id}
//             onClick={() => navigate(`/product/${product.id}`)}
//             className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition relative group"
//           >
//             <div className="relative h-60 w-full overflow-hidden rounded-t-xl">
//               <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
//               {!product.stack || product.stack <= 0 ? (
//                 <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
//                   <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium shadow">
//                     OUT OF STOCK
//                   </span>
//                 </div>
//               ) : null}
//             </div>

//             <div className="p-4" onClick={(e) => e.stopPropagation()}>
//               <h3 className="font-semibold text-md mb-1">{product.name}</h3>
//               <p className="text-sm text-gray-500 mb-2">{product.fabric} Saree</p>

//               <div className="flex items-center gap-2 mb-2">
//                 <span className="text-lg font-bold">₹{product.price}</span>
//                 {product.originalPrice && (
//                   <span className="text-sm line-through text-gray-400">
//                     ₹{product.originalPrice}
//                   </span>
//                 )}
//               </div>

//               {product.rating && (
//                 <div className="text-yellow-500 text-sm mb-3">⭐ {product.rating}</div>
//               )}

//               <div className="flex space-x-2">
//                 {product.stack > 0 ? (
//                   <>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleBuyNow(product);
//                       }}
//                       disabled={addingToCart === product.id}
//                       className={`flex-1 bg-black text-white py-2 px-4 text-xs font-medium hover:bg-gray-800 rounded ${
//                         addingToCart === product.id ? 'opacity-70 cursor-not-allowed' : ''
//                       }`}
//                     >
//                       {addingToCart === product.id ? 'PROCESSING...' : 'BUY NOW'}
//                     </button>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         addToCart(product);
//                       }}
//                       disabled={addingToCart === product.id}
//                       className={`flex-1 bg-gray-100 text-gray-900 py-2 px-4 text-xs font-medium hover:bg-gray-200 rounded flex items-center justify-center space-x-1 ${
//                         addingToCart === product.id ? 'opacity-70 cursor-not-allowed' : ''
//                       }`}
//                     >
//                       <ShoppingCart size={12} />
//                       <span>{addingToCart === product.id ? 'ADDING...' : 'ADD TO CART'}</span>
//                     </button>
//                   </>
//                 ) : (
//                   <button
//                     disabled
//                     className="w-full bg-gray-200 text-gray-500 py-2 px-4 text-xs font-medium rounded cursor-not-allowed"
//                   >
//                     OUT OF STOCK
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         {!loading && filteredSarees.length === 0 && (
//           <p className="col-span-full text-center text-gray-500">No products found.</p>
//         )}
//         {loading && (
//           <p className="col-span-full text-center text-gray-400">Loading products...</p>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

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
  stack: number;
  features: string[] | null;
  tags: string[] | null;
  category: string;
  subcategory: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export default function ShopPage() {
  const [sarees, setSarees] = useState<SareeData[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchSarees = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get<SareeData[]>('/api/sarees');
  //       setSarees(response.data);
  //     } catch (error) {
  //       console.error('Error fetching sarees:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSarees();
  // }, []);
   useEffect(() => {
    const fetchSarees = async () => {
      try {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get<SareeData[]>(`${baseUrl}/api/sarees`);
        setSarees(response.data);
      } catch (error) {
        console.error('Error fetching sarees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSarees();
  }, []);

  const categories = ['All', 'Wedding', 'Party', 'Daily', 'Silk', 'Cotton', 'Georgette', 'Chiffon'];

  const filteredSarees = sarees
    .filter(
      (s) =>
        (selectedFabric === 'All' || s.fabric === selectedFabric) &&
        (selectedCategory === 'All' || s.category === selectedCategory)
    )
    .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));

  const addToCart = async (product: SareeData) => {
    if (!product.stack || product.stack <= 0) {
      alert('This product is out of stock');
      return;
    }

    setAddingToCart(product.id);

    try {
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

      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('sessionId', sessionId);
      }

      const response = await axios.post(`/api/cart/${sessionId}/add`, {
        sareeId: product.id,
        quantity: 1,
      });

      if (response.status !== 201) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setAddingToCart(null);
    }
  };

  const handleBuyNow = (product: SareeData) => {
    if (!product.stack || product.stack <= 0) {
      alert('This product is out of stock');
      return;
    }

    navigate('/checkout', { state: { product: { ...product, quantity: 1 } } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shop Sarees</h1>

      <div className="flex flex-wrap gap-3 justify-center mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm border font-semibold ${
              selectedCategory === cat ? 'bg-black text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredSarees.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition relative group"
          >
            <div className="relative h-60 w-full overflow-hidden rounded-t-xl">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              {!product.stack || product.stack <= 0 ? (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
                  <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium shadow">
                    OUT OF STOCK
                  </span>
                </div>
              ) : null}
            </div>

            <div className="p-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-semibold text-md mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{product.fabric} Saree</p>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm line-through text-gray-400">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              {product.rating && (
                <div className="text-yellow-500 text-sm mb-3">⭐ {product.rating}</div>
              )}

              <div className="flex space-x-2">
                {product.stack > 0 ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBuyNow(product);
                      }}
                      disabled={addingToCart === product.id}
                      className={`flex-1 bg-black text-white py-2 px-4 text-xs font-medium hover:bg-gray-800 rounded ${
                        addingToCart === product.id ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {addingToCart === product.id ? 'PROCESSING...' : 'BUY NOW'}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      disabled={addingToCart === product.id}
                      className={`flex-1 bg-gray-100 text-gray-900 py-2 px-4 text-xs font-medium hover:bg-gray-200 rounded flex items-center justify-center space-x-1 ${
                        addingToCart === product.id ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      <ShoppingCart size={12} />
                      <span>{addingToCart === product.id ? 'ADDING...' : 'ADD TO CART'}</span>
                    </button>
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-200 text-gray-500 py-2 px-4 text-xs font-medium rounded cursor-not-allowed"
                  >
                    OUT OF STOCK
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {!loading && filteredSarees.length === 0 && (
          <p className="col-span-full text-center text-gray-500">No products found.</p>
        )}
        {loading && (
          <p className="col-span-full text-center text-gray-400">Loading products...</p>
        )}
      </div>
    </div>
  );
}
