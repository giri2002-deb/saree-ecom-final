import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { fabrics } from '../data/sarees';

const fabricImages = {
  Cotton: "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=400",
  Silk: "https://images.pexels.com/photos/8839888/pexels-photo-8839888.jpeg?auto=compress&cs=tinysrgb&w=400",
  Chiffon: "https://images.pexels.com/photos/8839889/pexels-photo-8839889.jpeg?auto=compress&cs=tinysrgb&w=400",
  Georgette: "https://images.pexels.com/photos/8839890/pexels-photo-8839890.jpeg?auto=compress&cs=tinysrgb&w=400",
  Linen: "https://images.pexels.com/photos/8839891/pexels-photo-8839891.jpeg?auto=compress&cs=tinysrgb&w=400",
  Crepe: "https://images.pexels.com/photos/8839892/pexels-photo-8839892.jpeg?auto=compress&cs=tinysrgb&w=400",
  Organza: "https://images.pexels.com/photos/8839893/pexels-photo-8839893.jpeg?auto=compress&cs=tinysrgb&w=400",
  Net: "https://images.pexels.com/photos/8839894/pexels-photo-8839894.jpeg?auto=compress&cs=tinysrgb&w=400",
  Satin: "https://images.pexels.com/photos/8839895/pexels-photo-8839895.jpeg?auto=compress&cs=tinysrgb&w=400",
  Tissue: "https://images.pexels.com/photos/8839896/pexels-photo-8839896.jpeg?auto=compress&cs=tinysrgb&w=400"
};

interface ShopByFabricProps {
  onFabricSelect: (fabric: string) => void;
}

export default function ShopByFabric({ onFabricSelect }: ShopByFabricProps) {
  const handleFabricClick = (fabric: string) => {
    onFabricSelect(fabric);
    // Scroll to products section
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="shop-section" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-gray-900 mb-4">
            SHOP BY FABRIC
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our premium collection of sarees crafted from the finest fabrics
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {fabrics.map((fabric) => (
            <button
              key={fabric}
              onClick={() => handleFabricClick(fabric)}
              className="group relative overflow-hidden rounded-lg bg-gray-50 aspect-square hover:shadow-lg transition-all duration-300"
            >
              <img
                src={fabricImages[fabric as keyof typeof fabricImages]}
                alt={fabric}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-white text-sm font-medium tracking-wide text-center">
                    {fabric.toUpperCase()}
                  </h3>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}