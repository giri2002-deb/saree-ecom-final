import React, { useState } from 'react';
import Hero from '../components/Hero';
import ShopByFabric from '../components/ShopByFabric';
import ProductGrid from '../components/ProductGrid';
import FeaturedProducts from '../components/FeaturedProducts';
import { sarees } from '../data/sarees';
import Footer from '../components/Footer';

export default function Home() {
  const [selectedFabric, setSelectedFabric] = useState('all');

  return (
    <div>
      <Hero />
      <FeaturedProducts />
    
      <ProductGrid products={sarees} selectedFabric={selectedFabric} />
    
    </div>
  );
}