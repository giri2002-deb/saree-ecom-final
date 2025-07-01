import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { validateImageFile, resizeImage, generateImageId } from '../../utils/fileUpload';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  mainImage: string;
  onMainImageChange: (imageUrl: string) => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onImagesChange,
  mainImage,
  onMainImageChange,
  onSuccess,
  onError
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Create a proper fallback image using a data URL
  const createFallbackImage = (size: string) => {
    const [width, height] = size.split('x').map(Number);
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="10" fill="#9ca3af" text-anchor="middle" dy=".3em">Error</text>
      </svg>
    `)}`;
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file
        const validationError = validateImageFile(file);
        if (validationError) {
          onError(`${file.name}: ${validationError}`);
          continue;
        }

        try {
          // Resize and compress image
          const compressedImage = await resizeImage(file, 800, 800, 0.8);
          newImages.push(compressedImage);
        } catch (error) {
          onError(`Failed to process ${file.name}`);
        }
      }

      if (newImages.length > 0) {
        const updatedImages = [...images, ...newImages];
        onImagesChange(updatedImages);
        
        // Set first uploaded image as main if no main image exists
        if (!mainImage && newImages.length > 0) {
          onMainImageChange(newImages[0]);
        }
        
        onSuccess(`Successfully uploaded ${newImages.length} image(s)`);
      }
    } catch (error) {
      onError('Failed to upload images. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeImage = (index: number) => {
    const imageToRemove = images[index];
    const updatedImages = images.filter((_, i) => i !== index);
    onImagesChange(updatedImages);
    
    // If removing the main image, set the first remaining image as main
    if (mainImage === imageToRemove) {
      onMainImageChange(updatedImages[0] || '');
    }
    
    onSuccess('Image removed successfully');
  };

  const setAsMainImage = (imageUrl: string) => {
    onMainImageChange(imageUrl);
    onSuccess('Main image updated');
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />
        
        <div className="text-center">
          <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
            {isUploading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            ) : (
              <Upload className="h-12 w-12" />
            )}
          </div>
          
          <div className="text-sm text-gray-600">
            {isUploading ? (
              <p>Uploading and processing images...</p>
            ) : (
              <>
                <p className="font-medium">
                  Drop images here or{' '}
                  <span className="text-blue-600 hover:text-blue-500 cursor-pointer">
                    browse files
                  </span>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supports: JPEG, PNG, GIF, WebP (Max 5MB each)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <ImageIcon className="h-4 w-4 mr-2" />
              Uploaded Images ({images.length})
            </h4>
            <div className="text-xs text-gray-500">
              Click to set as main image
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-2 border border-gray-200 rounded-lg">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <div
                  className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    img === mainImage
                      ? 'ring-2 ring-blue-500 ring-offset-2'
                      : 'hover:opacity-75'
                  }`}
                  onClick={() => setAsMainImage(img)}
                >
                  <img
                    src={img}
                    alt={`Saree ${index + 1}`}
                    className="w-full h-24 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = createFallbackImage('150x150');
                    }}
                  />
                  
                  {/* Main image indicator */}
                  {img === mainImage && (
                    <div className="absolute top-1 left-1 px-2 py-1 bg-blue-500 text-white text-xs rounded font-medium">
                      Main
                    </div>
                  )}
                  
                  {/* Image number */}
                  <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-black bg-opacity-60 text-white text-xs rounded">
                    {index + 1}
                  </div>
                </div>
                
                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 z-10"
                  title="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          
          {images.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No images uploaded yet</p>
              <p className="text-xs">At least one image is required</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;