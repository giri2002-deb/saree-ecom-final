// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Star } from 'lucide-react';
// import axios from 'axios';

// // ✅ Match this with your actual Supabase table structure
// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   // Optional fields for future use
//   rating?: number;
//   reviews?: number;
// };

// export default function FeaturedProducts() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   // useEffect(() => {
//   //   axios
//   //     .get<Product[]>('http://localhost:5000/api/featured-products') // ✅ Ensure this matches your backend route
//   //     .then((res) => {
//   //       setProducts(res.data);
//   //       setLoading(false);
//   //     })
//   //     .catch((err) => {
//   //       console.error('Error loading products:', err);
//   //       setLoading(false);
//   //     });
//   // }, []);

//   if (loading) return <div className="text-center py-16">Loading...</div>;

//   return (
//     <section id="featured-section" className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-gray-900 mb-4">
//             FEATURED COLLECTION
//           </h2>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Handpicked sarees that showcase the finest craftsmanship and timeless elegance
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div key={product.id} className="group">
//               <div className="relative overflow-hidden rounded-lg mb-4">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
//               </div>

//               <div className="text-center">
//                 {/* ⭐ Rating stars (optional) */}
//                 {product.rating !== undefined && (
//                   <div className="flex items-center justify-center mb-2">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         size={14}
//                         className={`${
//                           i < Math.floor(product.rating!)
//                             ? 'text-yellow-400 fill-current'
//                             : 'text-gray-300'
//                         }`}
//                       />
//                     ))}
//                     <span className="text-sm text-gray-600 ml-2">
//                       ({product.reviews ?? 0})
//                     </span>
//                   </div>
//                 )}

//                 <h3 className="text-sm font-medium text-gray-900 mb-2">
//                   {product.name}
//                 </h3>
//                 <p className="text-lg font-semibold text-gray-900 mb-3">
//                   ₹{product.price}
//                 </p>
//                 <Link
//                   to={`/product/${product.id}`}
//                   className="inline-block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
//                 >
//                   VIEW DETAILS
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import axios from 'axios';

// ✅ Match with Supabase data model
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  rating?: number;
  reviews?: number;
};

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const baseURL =
          import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

        if (!baseURL) {
          console.error("❌ Backend URL is not defined");
          return;
        }

        const response = await axios.get<Product[]>(`${baseURL}/api/featured-products`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading products:", err);
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) return <div className="text-center py-16">Loading...</div>;

  return (
    <section id="featured-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-gray-900 mb-4">
            FEATURED COLLECTION
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked sarees that showcase the finest craftsmanship and timeless elegance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>

              <div className="text-center">
                {product.rating !== undefined && (
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating!)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      ({product.reviews ?? 0})
                    </span>
                  </div>
                )}

                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-lg font-semibold text-gray-900 mb-3">
                  ₹{product.price}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="inline-block bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  VIEW DETAILS
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
