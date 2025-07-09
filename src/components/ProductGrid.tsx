
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';

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

// export default function ProductGrid() {
//   const { dispatch } = useCart();
//   const [sarees, setSarees] = useState<SareeData[]>([]);
//   const [selectedFabric, setSelectedFabric] = useState<string>('all');
//   const [visibleCount, setVisibleCount] = useState(6);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchSarees = async () => {
//       try {
//         const response = await axios.get<SareeData[]>('/api/sarees');
//         setSarees(response.data);
//       } catch (error) {
//         console.error('Failed to fetch sarees:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSarees();
//   }, []);

//   const addToCart = async (product: SareeData) => {
//     try {
//       let sessionId = localStorage.getItem('sessionId');
//       if (!sessionId) {
//         sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
//         localStorage.setItem('sessionId', sessionId);
//       }

//       const response = await axios.post(`/api/cart/${sessionId}/add`, {
//         sareeId: product.id,
//         quantity: 1,
//       });

//       if (response.status === 201) {
//         dispatch({
//           type: 'ADD_TO_CART',
//           payload: {
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             image: product.image,
//             fabric: product.fabric || '',
//           },
//         });
//         alert(`Added ${product.name} to cart!`);
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       dispatch({
//         type: 'ADD_TO_CART',
//         payload: {
//           id: product.id,
//           name: product.name,
//           price: product.price,
//           image: product.image,
//           fabric: product.fabric || '',
//         },
//       });
//       alert(`Added ${product.name} to cart (offline)!`);
//     }
//   };

//   const handleBuyNow = (product: SareeData) => {
//     navigate('/checkout', { state: { product } });
//   };

//   const filteredProducts = selectedFabric === 'all'
//     ? sarees
//     : sarees.filter(p => p.fabric.toLowerCase() === selectedFabric.toLowerCase());

//   const visibleProducts = filteredProducts.slice(0, visibleCount);

//   if (loading) {
//     return <div className="p-6 text-center text-gray-600">Loading products...</div>;
//   }

//   return (
//     <section className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Explore Our Sarees</h2>

//         <div className="mb-8 flex justify-end">
//           {/* <select
//             className="border px-4 py-2 rounded text-sm"
//             value={selectedFabric}
//             onChange={(e) => {
//               setSelectedFabric(e.target.value);
//               setVisibleCount(8); // reset pagination on filter change
//             }}
//           >
//             <option value="all">All Fabrics</option>
//             {[...new Set(sarees.map(s => s.fabric))].map(fabric => (
//               <option key={fabric} value={fabric}>{fabric}</option>
//             ))}
//           </select> */}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {visibleProducts.map(product => (
//             <div key={product.id} className="bg-white shadow rounded overflow-hidden group cursor-pointer">
//               <div className="relative" onClick={() => navigate(`/product/${product.id}`)}>
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-72 object-cover group-hover:scale-105 transition"
//                 />
//               </div>

//               <div className="p-4">
//                 <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
//                 <p className="text-sm text-gray-500">{product.fabric}</p>
//                 <div className="flex items-center justify-between mt-2">
//                   {product.originalPrice && (
//                     <span className="text-xs line-through text-gray-400">₹{product.originalPrice}</span>
//                   )}
//                   <span className="text-md font-bold text-gray-800">₹{product.price}</span>
//                 </div>

//                 <div className="flex mt-4 gap-2">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleBuyNow(product);
//                     }}
//                     className="flex-1 bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800"
//                   >
//                     Buy Now
//                   </button>

//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToCart(product);
//                     }}
//                     className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 text-sm rounded hover:bg-gray-200"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {filteredProducts.length === 0 && (
//           <p className="text-center mt-8 text-gray-600">No sarees found for this fabric.</p>
//         )}

//         {/* {visibleCount < filteredProducts.length && (
//           <div className="text-center mt-8">
//             <button
//               onClick={() => setVisibleCount(visibleCount + 8)}
//               className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
//             >
//               Load More...
//             </button>
//           </div>
//         )} */}
//         {visibleCount < filteredProducts.length && (
//   <div className="text-center mt-8">
//     <button
//       onClick={() => setVisibleCount(visibleCount + 8)}
//       className="bg-white text-black border border-black px-6 py-3 rounded hover:bg-black hover:text-white transition duration-300"
//     >
//       Load More...
//     </button>
//   </div>
// )}

//       </div>
//     </section>
//   );
// }
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

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

export default function ProductGrid() {
  const { dispatch } = useCart();
  const [sarees, setSarees] = useState<SareeData[]>([]);
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const baseURL =
    import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchSarees = async () => {
      try {
        const response = await axios.get<SareeData[]>(`${baseURL}/api/sarees`);
        setSarees(response.data);
      } catch (error) {
        console.error('Failed to fetch sarees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSarees();
  }, []);

  const addToCart = async (product: SareeData) => {
    try {
      let sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
        localStorage.setItem('sessionId', sessionId);
      }

      const response = await axios.post(`${baseURL}/api/cart/${sessionId}/add`, {
        sareeId: product.id,
        quantity: 1,
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
        alert(`Added ${product.name} to cart!`);
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
    navigate('/checkout', { state: { product } });
  };

  const filteredProducts = selectedFabric === 'all'
    ? sarees
    : sarees.filter((p) => p.fabric?.toLowerCase() === selectedFabric.toLowerCase());

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Loading products...</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Explore Our Sarees</h2>

        <div className="mb-8 flex justify-end">
          <select
            className="border px-4 py-2 rounded text-sm"
            value={selectedFabric}
            onChange={(e) => {
              setSelectedFabric(e.target.value);
              setVisibleCount(8); // Reset pagination
            }}
          >
            <option value="all">All Fabrics</option>
            {[...new Set(sarees.map(s => s.fabric).filter(Boolean))].map((fabric) => (
              <option key={fabric} value={fabric}>
                {fabric}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id} className="bg-white shadow rounded overflow-hidden group cursor-pointer">
              <div className="relative" onClick={() => navigate(`/product/${product.id}`)}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.fabric}</p>
                <div className="flex items-center justify-between mt-2">
                  {product.originalPrice && (
                    <span className="text-xs line-through text-gray-400">
                      ₹{product.originalPrice}
                    </span>
                  )}
                  <span className="text-md font-bold text-gray-800">₹{product.price}</span>
                </div>

                <div className="flex mt-4 gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyNow(product);
                    }}
                    className="flex-1 bg-black text-white px-4 py-2 text-sm rounded hover:bg-gray-800"
                  >
                    Buy Now
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="flex-1 bg-gray-100 text-gray-900 px-4 py-2 text-sm rounded hover:bg-gray-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="text-center mt-8 text-gray-600">No sarees found for this fabric.</p>
        )}

        {visibleCount < filteredProducts.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => setVisibleCount(visibleCount + 8)}
              className="bg-white text-black border border-black px-6 py-3 rounded hover:bg-black hover:text-white transition duration-300"
            >
              Load More...
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
