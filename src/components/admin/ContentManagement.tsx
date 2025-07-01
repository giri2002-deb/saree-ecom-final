import { useState } from 'react';
import { Save, Upload, Eye, Heart, Sparkles } from 'lucide-react';

interface ContentManagementProps {
  page: string;
}

export const ContentManagement = ({ page }: ContentManagementProps) => {
  const [content, setContent] = useState({
    'home-banner': {
      title: 'Discover the Elegance of Indian Sarees',
      subtitle: 'Handpicked sarees that showcase the finest craftsmanship and timeless elegance',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1200',
      buttonText: 'Shop Collection',
      buttonLink: '/products'
    },
    'featured-collection': {
      title: 'Featured Collection',
      subtitle: 'Handpicked sarees that showcase the finest craftsmanship and timeless elegance',
      products: ['1', '2', '4', '6'] // Product IDs
    },
    'about-banner': {
      title: 'About Saree',
      description: 'Discover the elegance, heritage, and diversity of Indian sarees. Sarees are not just garments, but a reflection of Indian culture, tradition, and craftsmanship. From the looms of Banaras to the hills of the Northeast, every region contributes a unique style and legacy.',
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1200',
      heritage: {
        title: 'The Heritage of Sarees',
        description: 'Sarees are not just garments, but a reflection of Indian culture, tradition, and craftsmanship. From the looms of Banaras to the hills of the Northeast, every region contributes a unique style and legacy.'
      }
    },
    'contact': {
      title: 'Contact Us',
      subtitle: "We'd love to hear from you. Get in touch with us for any questions or assistance.",
      address: '123 Fashion Street, Mumbai, Maharashtra 400001, India',
      phone: ['+91 98765 43210', '+91 87654 32109'],
      email: 'info@sareestore.com',
      hours: 'Mon-Sat: 10AM-8PM, Sun: 11AM-6PM',
      mapUrl: 'https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3024.1!2d-74.0059!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuMiJX!5e0!3m2!1sen!2sus!4v1234567890'
    }
  });

  const handleSave = () => {
    // In a real app, this would save to a backend
    alert('Content saved successfully!');
  };

  const getPageTitle = () => {
    switch (page) {
      case 'home-banner':
        return 'Home Banner';
      case 'featured-collection':
        return 'Featured Collection';
      case 'about-banner':
        return 'About Saree Page';
      case 'contact':
        return 'Contact Page';
      default:
        return 'Content Management';
    }
  };

  const getPageIcon = () => {
    switch (page) {
      case 'home-banner':
        return <Sparkles className="h-5 w-5 text-pink-500" />;
      case 'featured-collection':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'about-banner':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'contact':
        return <Heart className="h-5 w-5 text-pink-500" />;
      default:
        return <Heart className="h-5 w-5 text-pink-500" />;
    }
  };

  const renderHomeBanner = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Banner Title</label>
        <input
          type="text"
          value={content['home-banner'].title}
          onChange={(e) => setContent(prev => ({
            ...prev,
            'home-banner': { ...prev['home-banner'], title: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={content['home-banner'].subtitle}
          onChange={(e) => setContent(prev => ({
            ...prev,
            'home-banner': { ...prev['home-banner'], subtitle: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
        <input
          type="url"
          value={content['home-banner'].image}
          onChange={(e) => setContent(prev => ({
            ...prev,
            'home-banner': { ...prev['home-banner'], image: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {content['home-banner'].image && (
          <div className="mt-2">
            <img
              src={content['home-banner'].image}
              alt="Banner preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-200"
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
          <input
            type="text"
            value={content['home-banner'].buttonText}
            onChange={(e) => setContent(prev => ({
              ...prev,
              'home-banner': { ...prev['home-banner'], buttonText: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
          <input
            type="text"
            value={content['home-banner'].buttonLink}
            onChange={(e) => setContent(prev => ({
              ...prev,
              'home-banner': { ...prev['home-banner'], buttonLink: e.target.value }
            }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>
    </div>
  );

  const renderFeaturedCollection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Collection Title</label>
        <input
          type="text"
          value={content['featured-collection'].title}
          onChange={(e) => setContent(prev => ({
            ...prev,
            'featured-collection': { ...prev['featured-collection'], title: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={content['featured-collection'].subtitle}
          onChange={(e) => setContent(prev => ({
            ...prev,
            'featured-collection': { ...prev['featured-collection'], subtitle: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Sarees</label>
        <p className="text-sm text-gray-600 mb-2">Enter saree IDs separated by commas</p>
        <input
          type="text"
          value={content['featured-collection'].products.join(', ')}
          onChange={(e) => setContent(prev => ({
            ...prev,
            'featured-collection': { 
              ...prev['featured-collection'], 
              products: e.target.value.split(',').map(id => id.trim()) 
            }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="1, 2, 3, 4"
        />
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
        <input
          type="text"
          value={content.contact.title}
          onChange={(e) => setContent(prev => ({
            ...prev,
            contact: { ...prev.contact, title: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          value={content.contact.subtitle}
          onChange={(e) => setContent(prev => ({
            ...prev,
            contact: { ...prev.contact, subtitle: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <input
          type="text"
          value={content.contact.address}
          onChange={(e) => setContent(prev => ({
            ...prev,
            contact: { ...prev.contact, address: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={content.contact.email}
          onChange={(e) => setContent(prev => ({
            ...prev,
            contact: { ...prev.contact, email: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours</label>
        <input
          type="text"
          value={content.contact.hours}
          onChange={(e) => setContent(prev => ({
            ...prev,
            contact: { ...prev.contact, hours: e.target.value }
          }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
    </div>
  );

  const renderPageContent = () => {
    switch (page) {
      case 'home-banner':
        return renderHomeBanner();
      case 'featured-collection':
        return renderFeaturedCollection();
      case 'contact':
        return renderContact();
      default:
        return <div className="text-gray-500">Select a page to edit its content</div>;
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
            <div className="flex items-center gap-3">
              {getPageIcon()}
              <div>
                <h1 className="text-2xl font-bold">Content Management</h1>
                <p className="text-pink-100">Edit {getPageTitle()}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {renderPageContent()}

            <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};