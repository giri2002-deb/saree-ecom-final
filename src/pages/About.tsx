import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">
            ABOUT SAREE
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the elegance, heritage, and diversity of Indian sarees
          </p>
        </div>

        {/* Saree Heritage Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="h1.jpg"
              alt="Traditional saree weaving"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-light text-gray-900">The Heritage of Sarees</h2>
            <p className="text-gray-600 leading-relaxed">
              Sarees are not just garments, but a reflection of Indian culture, tradition, and craftsmanship.
              From the looms of Banaras to the hills of the Northeast, every region contributes a unique style
              and legacy.
            </p>
            <p className="text-gray-600 leading-relaxed">
              At SAREE, we connect you to that legacy with each thread woven by artisans who dedicate their
              lives to this timeless art.
            </p>
          </div>
        </div>

        {/* Saree Styles Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👰</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Wedding Styles</h3>
            <p className="text-gray-600">
              Explore grand sarees in silk, zari, and brocade—crafted for celebrations and weddings.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎉</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Party Wear</h3>
            <p className="text-gray-600">
              Shine at every party with modern silhouettes in chiffon, net, and georgette fabrics.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Daily & Casual</h3>
            <p className="text-gray-600">
              Embrace comfort and culture daily with cotton and linen sarees that breathe style.
            </p>
          </div>
        </div>

        {/* Saree Fabric Section */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Celebrating Fabric Diversity</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Indian sarees span a wide range of fabrics—each with its own charm. From the glossy drapes of
            satin and tissue to the earthy comfort of khadi and cotton, every saree tells a sensory story.
            At SAREE, we curate collections in silk, chiffon, georgette, crepe, net, and more.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
            To preserve and promote the heritage of Indian sarees while empowering weavers across the country. 
            We strive to deliver authentic, ethically-sourced, and beautifully-crafted sarees that honor tradition 
            and elevate everyday elegance.
          </p>
        </div>
      </div>
    </div>
  );
}
