// import React, { useState, useEffect } from 'react';
// import { Link as ScrollLink } from 'react-scroll';

// // Fixed image paths
// const heroData = [
//   {
//     title: 'ELEGANT',
//     highlight: 'SAREES',
//     description: 'Discover our exquisite collection of traditional and contemporary sarees. From handwoven cotton to luxurious silk, find your perfect drape.',
//     image: '/h1.jpg',
//   },
//   {
//     title: 'GRACEFUL',
//     highlight: 'DESIGNS',
//     description: 'Step into timeless beauty with sarees that speak elegance and charm. Perfect for every occasion.',
//     image: '/h4.jpg',
//   },
//   {
//     title: 'TRADITIONAL',
//     highlight: 'WEAVES',
//     description: 'Celebrate heritage with finely crafted sarees sourced from India’s renowned weaving clusters.',
//     image: '/h1.jpg',
//   },
//   {
//     title: 'MODERN',
//     highlight: 'ELEGANCE',
//     description: 'Embrace fusion fashion with our modern take on the classic saree — bold, beautiful, and stylish.',
//     image: '/h4.jpg',
//   },
// ];

// export default function Hero() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % heroData.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, []);

//   const current = heroData[index];

//   return (
//     <section className="bg-white min-h-[600px] flex items-start py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           {/* Left side - Text content */}
//           <div className="space-y-8 pt-6 pl-4 lg:pl-12">
//             <div className="space-y-6">
//               <h1 className="text-4xl lg:text-6xl font-light tracking-wide text-gray-900">
//                 {current.title}
//                 <br />
//                 <span className="text-pink-600">{current.highlight}</span>
//               </h1>
//               <p className="text-gray-600 text-lg leading-relaxed max-w-md">
//                 {current.description}
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <ScrollLink
//                   to="shop-section"
//                   smooth={true}
//                   duration={500}
//                   className="bg-black text-white px-8 py-3 text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-center"
//                 >
//                   SHOP NOW
//                 </ScrollLink>
//                 <ScrollLink
//                   to="featured-section"
//                   smooth={true}
//                   duration={500}
//                   className="border border-black text-black px-8 py-3 text-sm font-medium tracking-wide hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-center"
//                 >
//                   VIEW COLLECTION
//                 </ScrollLink>
//               </div>
//             </div>
//           </div>

//           {/* Right side - Hero image */}
//           <div className="relative py-4">
//             <div className="relative z-10 transition-all duration-700">
//               <img
//                 key={current.image}
//                 src={current.image}
//                 alt="Saree Showcase"
//                 className="w-full max-w-md h-[450px] object-cover mx-auto rounded-lg shadow-2xl"
//               />
//             </div>

//             {/* Decorative circles */}
//             <div className="absolute -top-4 -right-4 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>
//             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { Link as ScrollLink } from 'react-scroll';
// import axios from 'axios';

// interface HeroSlide {
//   title: string;
//   highlight: string;
//   description: string;
//   image_url: string;
// }

// export default function Hero() {
//   const [heroData, setHeroData] = useState<HeroSlide[]>([]);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         const response = await axios.get<HeroSlide[]>( `${process.env.REACT_APP_API_BASE_URL}/api/hero-slides`);
//         setHeroData(response.data);
//       } catch (error) {
//         console.error('❌ Error fetching hero data:', error);
//       }
//     };
//     fetchSlides();
//   }, []);

//   useEffect(() => {
//     if (heroData.length === 0) return;
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % heroData.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [heroData]);

//   const current = heroData[index];
//   if (!current) return null;

//   return (
//     <section className="bg-white min-h-[600px] flex items-start py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           <div className="space-y-8 pt-6 pl-4 lg:pl-12">
//             <div className="space-y-6">
//               <h1 className="text-4xl lg:text-6xl font-light tracking-wide text-gray-900">
//                 {current.title}
//                 <br />
//                 <span className="text-pink-600">{current.highlight}</span>
//               </h1>
//               <p className="text-gray-600 text-lg leading-relaxed max-w-md">
//                 {current.description}
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <ScrollLink
//                   to="shop-section"
//                   smooth
//                   duration={500}
//                   className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-center"
//                 >
//                   SHOP NOW
//                 </ScrollLink>
//                 <ScrollLink
//                   to="featured-section"
//                   smooth
//                   duration={500}
//                   className="border border-black text-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-center"
//                 >
//                   VIEW COLLECTION
//                 </ScrollLink>
//               </div>
//             </div>
//           </div>

//           <div className="relative py-4">
//             <div className="relative z-10 transition-all duration-700">
//               <img
//                 key={current.image_url}
//                 src={current.image_url}
//                 alt="Saree Showcase"
//                 className="w-full max-w-md h-[450px] object-cover mx-auto rounded-lg shadow-2xl"
//               />
//             </div>
//             <div className="absolute -top-4 -right-4 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>
//             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { Link as ScrollLink } from 'react-scroll';
// import axios from 'axios';

// interface HeroSlide {
//   title: string;
//   highlight: string;
//   description: string;
//   image_url: string;
// }

// export default function Hero() {
//   const [heroData, setHeroData] = useState<HeroSlide[]>([]);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const fetchSlides = async () => {
//       try {
//         // Get backend URL from environment or fallback
//         const baseURL =
//           process.env.REACT_APP_API_BASE_URL || process.env.REPLIT_BACKEND_URL;
        
//         if (!baseURL) {
//           console.error("❌ Backend URL not defined in .env");
//           return;
//         }

//         const response = await axios.get<HeroSlide[]>(
//           `${baseURL}/api/hero-slides`
//         );
//         setHeroData(response.data);
//       } catch (error) {
//         console.error('❌ Error fetching hero data:', error);
//       }
//     };

//     fetchSlides();
//   }, []);

//   // Auto slide every 4 seconds
//   useEffect(() => {
//     if (heroData.length === 0) return;
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % heroData.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [heroData]);

//   const current = heroData[index];
//   if (!current) return null;

//   return (
//     <section className="bg-white min-h-[600px] flex items-start py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
//         <div className="grid lg:grid-cols-2 gap-12 items-start">
//           {/* Left content */}
//           <div className="space-y-8 pt-6 pl-4 lg:pl-12">
//             <div className="space-y-6">
//               <h1 className="text-4xl lg:text-6xl font-light tracking-wide text-gray-900">
//                 {current.title}
//                 <br />
//                 <span className="text-pink-600 font-semibold">
//                   {current.highlight}
//                 </span>
//               </h1>
//               <p className="text-gray-600 text-lg leading-relaxed max-w-md">
//                 {current.description}
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <ScrollLink
//                   to="shop-section"
//                   smooth
//                   duration={500}
//                   className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-center"
//                 >
//                   SHOP NOW
//                 </ScrollLink>
//                 <ScrollLink
//                   to="featured-section"
//                   smooth
//                   duration={500}
//                   className="border border-black text-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-center"
//                 >
//                   VIEW COLLECTION
//                 </ScrollLink>
//               </div>
//             </div>
//           </div>

//           {/* Right image */}
//           <div className="relative py-4">
//             <div className="relative z-10 transition-all duration-700">
//               <img
//                 key={current.image_url}
//                 src={current.image_url}
//                 alt="Saree Showcase"
//                 className="w-full max-w-md h-[450px] object-cover mx-auto rounded-lg shadow-2xl"
//               />
//             </div>
//             <div className="absolute -top-4 -right-4 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>
//             <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import axios from 'axios';

interface HeroSlide {
  title: string;
  highlight: string;
  description: string;
  image_url: string;
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroSlide[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;

        if (!baseURL) {
          console.error("❌ Backend URL not defined in .env");
          return;
        }

        const response = await axios.get<HeroSlide[]>(`${baseURL}/api/hero-slides`);
        setHeroData(response.data);
      } catch (error) {
        console.error('❌ Error fetching hero data:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (heroData.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroData]);

  const current = heroData[index];
  if (!current) return null;

  return (
    <section className="bg-white min-h-[600px] flex items-start py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 pt-6 pl-4 lg:pl-12">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-light tracking-wide text-gray-900">
                {current.title}
                <br />
                <span className="text-pink-600 font-semibold">
                  {current.highlight}
                </span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                {current.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <ScrollLink
                  to="shop-section"
                  smooth
                  duration={500}
                  className="bg-black text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors duration-200 cursor-pointer text-center"
                >
                  SHOP NOW
                </ScrollLink>
                <ScrollLink
                  to="featured-section"
                  smooth
                  duration={500}
                  className="border border-black text-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer text-center"
                >
                  VIEW COLLECTION
                </ScrollLink>
              </div>
            </div>
          </div>

          <div className="relative py-4">
            <div className="relative z-10 transition-all duration-700">
              <img
                key={current.image_url}
                src={current.image_url}
                alt="Saree Showcase"
                className="w-full max-w-md h-[450px] object-cover mx-auto rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-pink-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
