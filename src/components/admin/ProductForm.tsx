import React, { useState, useEffect } from 'react';
import { Plus, X, Star, Tag, DollarSign, Boxes } from 'lucide-react';
import { Product, ProductFormData } from '../../types/Product';
import ImageUpload from './ImageUpload';

export interface ProductFormProps {
  selectedProduct: Product | null;
  onSave: (product: Product) => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  onFormSubmit?: () => void;
}

const API_URL = 'http://localhost:5000/api/sarees';

const ProductForm: React.FC<ProductFormProps> = ({
  selectedProduct,
  onSuccess,
  onError,
  onFormSubmit
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    image: '',
    images: [],
    description: '',
    features: [],
    isNew: false,
    isFeatured: false,
    rating: '5.0',
    stack: 0
  });

  const [currentFeature, setCurrentFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        category: selectedProduct.category || '',
        price: selectedProduct.price.toString(),
        originalPrice: selectedProduct.originalPrice?.toString() || '',
        image: selectedProduct.image,
        images: selectedProduct.images || [],
        description: selectedProduct.description,
        features: selectedProduct.features || [],
        isNew: selectedProduct.isNew,
        isFeatured: selectedProduct.isFeatured,
        rating: selectedProduct.rating.toString(),
        stack: selectedProduct.stack || 0
      });
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : name === 'stack'
          ? parseInt(value)
          : value
    }));
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images,
      image: prev.image || images[0] || ''
    }));
  };

  const handleMainImageChange = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
  };

  const addFeature = () => {
    if (currentFeature.trim() && !formData.features.includes(currentFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()]
      }));
      setCurrentFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push('Saree name is required');
    if (!formData.category.trim()) errors.push('Category is required');
    if (!formData.price || isNaN(Number(formData.price)) || parseFloat(formData.price) <= 0)
      errors.push('Valid price is required');
    if (!formData.originalPrice || isNaN(Number(formData.originalPrice)) || parseFloat(formData.originalPrice) <= 0)
      errors.push('Valid original price is required');
    if (parseFloat(formData.price) > parseFloat(formData.originalPrice))
      errors.push('Current price cannot be higher than original price');
    if (formData.stack < 0 || isNaN(formData.stack))
      errors.push('Valid stock quantity is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (formData.images.length === 0) errors.push('At least one saree image is required');

    if (errors.length > 0) {
      onError(errors.join(', '));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    onFormSubmit?.();

    const isEdit = !!selectedProduct;
    const method = isEdit ? 'PUT' : 'POST';
    const url = isEdit ? `${API_URL}/${selectedProduct.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          category: formData.category.trim(),
          price: parseFloat(formData.price),
          originalPrice: parseFloat(formData.originalPrice),
          image: formData.image || formData.images[0] || '',
          images: formData.images,
          description: formData.description.trim(),
          features: formData.features,
          isNew: formData.isNew,
          isFeatured: formData.isFeatured,
          rating: parseFloat(formData.rating),
          stack: formData.stack,
          ...(isEdit && { id: selectedProduct.id })
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      onSuccess(isEdit ? 'Saree updated successfully!' : 'Saree added successfully!');

      if (!isEdit) resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      onError('Failed to save saree. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      originalPrice: '',
      image: '',
      images: [],
      description: '',
      features: [],
      isNew: false,
      isFeatured: false,
      rating: '5.0',
      stack: 0
    });
    setCurrentFeature('');
  };

  const handleFeatureKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Tag className="h-5 w-5 mr-2 text-pink-600" />
          {selectedProduct ? 'Update Saree' : 'Add New Saree'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Saree Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter saree name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select category</option>
                <option value="Wedding">Wedding</option>
                <option value="Party">Party</option>
                <option value="Casual">Casual</option>
                <option value="Formal">Formal</option>
                <option value="Festival">Festival</option>
                <option value="Traditional">Traditional</option>
                <option value="Designer">Designer</option>
                <option value="Bridal">Bridal</option>
              </select>
            </div>

            {/* Price, Original Price, Stack */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹) *</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  name="stack"
                  value={formData.stack}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                step="0.1"
                max="5"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-pink-600 border-gray-300"
                />
                <span className="ml-2 text-sm">New Arrival</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-pink-600 border-gray-300"
                />
                <span className="ml-2 text-sm">Featured</span>
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Saree Images *</label>
            <ImageUpload
              images={formData.images}
              onImagesChange={handleImagesChange}
              mainImage={formData.image}
              onMainImageChange={handleMainImageChange}
              onSuccess={onSuccess}
              onError={onError}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            placeholder="Enter detailed saree description"
            required
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Saree Features</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={currentFeature}
              onChange={(e) => setCurrentFeature(e.target.value)}
              onKeyPress={handleFeatureKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="e.g., Pure Silk, Zari Work"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 p-1 hover:bg-pink-200 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium text-white ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
            }`}
          >
            {isSubmitting ? 'Saving...' : selectedProduct ? 'Update Saree' : 'Add Saree'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
