
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   original_price?: number;
//   category?: string;
//   image: string;
//   images?: string[];
//   description?: string;
// };

// type FormDataState = {
//   id?: number;
//   name: string;
//   price: string;
//   originalPrice: string;
//   category: string;
//   description: string;
//   image: File | null;
//   images: File[];
// };

// export default function FeaturedForm() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [formData, setFormData] = useState<FormDataState>({
//     name: '',
//     price: '',
//     originalPrice: '',
//     category: '',
//     description: '',
//     image: null,
//     images: [],
//   });

//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [message, setMessage] = useState('');
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/featured-products');
//       setProducts(res.data);
//     } catch (err) {
//       console.error('❌ Fetch error:', err);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (!files) return;

//     if (name === 'image') {
//       setFormData(prev => ({ ...prev, image: files[0] }));
//       setPreviewUrl(URL.createObjectURL(files[0]));
//     } else {
//       setFormData(prev => ({ ...prev, images: Array.from(files) }));
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       name: '',
//       price: '',
//       originalPrice: '',
//       category: '',
//       description: '',
//       image: null,
//       images: [],
//     });
//     setPreviewUrl(null);
//     setIsEditing(false);
//     setMessage('');
//   };

//   const handleAddOrUpdateProduct = async () => {
//     if (!formData.name || !formData.price || (!formData.image && !isEditing)) {
//       alert('Name, price, and image are required.');
//       return;
//     }

//     const form = new FormData();
//     form.append('name', formData.name);
//     form.append('price', formData.price);
//     form.append('originalPrice', formData.originalPrice || formData.price);
//     form.append('category', formData.category);
//     form.append('description', formData.description);
//     if (formData.image) form.append('image', formData.image);
//     formData.images.forEach(file => form.append('images', file));

//     try {
//       if (isEditing && formData.id) {
//         await axios.put(`http://localhost:5000/api/products/featured/${formData.id}`, {
//           name: formData.name,
//           price: parseFloat(formData.price),
//           original_price: parseFloat(formData.originalPrice || formData.price),
//           category: formData.category,
//           description: formData.description,
//         });
//         setMessage('✅ Product updated successfully!');
//       } else {
//         const res = await axios.post('http://localhost:5000/api/products/featured', form, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         if (res.data?.length > 0) {
//           setProducts(prev => [...prev, res.data[0]]);
//           setMessage('✅ Product added successfully!');
//         }
//       }

//       resetForm();
//       fetchProducts();
//     } catch (err: any) {
//       console.error('❌ Save error:', err?.response?.data || err.message);
//       setMessage('❌ Failed to save product');
//     }
//   };

//   const handleEdit = (product: Product) => {
//     setFormData({
//       id: product.id,
//       name: product.name,
//       price: String(product.price),
//       originalPrice: String(product.original_price || product.price),
//       category: product.category || '',
//       description: product.description || '',
//       image: null,
//       images: [],
//     });
//     setPreviewUrl(product.image);
//     setIsEditing(true);
//     setMessage('');
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/products/featured/${id}`);
//       setProducts(prev => prev.filter(p => p.id !== id));
//       setMessage('✅ Product deleted!');
//     } catch (err) {
//       console.error('❌ Delete error:', err);
//       setMessage('❌ Failed to delete');
//     }
//   };

//   const handleConvertToSaree = async (id: number) => {
//     const stock = window.prompt('Enter stock quantity for this saree:');
//     if (!stock || isNaN(Number(stock)) || Number(stock) <= 0) {
//       alert('Please enter a valid stock quantity.');
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:5000/api/products/convert/${id}`, { stock: Number(stock) });
//       setMessage('✅ Product converted to saree with stock!');
//       fetchProducts();
//     } catch (err: any) {
//       console.error('❌ Convert error:', err?.response?.data || err.message);
//       setMessage('❌ Failed to convert product');
//     }
//   };

//   return (
//     <section className="">
//       {/* This section assumes outer title already exists */}
      
//       {/* Form Subheading */}
//       {/* <div className="px-6 pt-6">
//         <h3 className="text-xl font-semibold text-gray-800">
//           {isEditing ? '✏️ Editing Featured Product' : '🌟 Add New Featured Product'}
//         </h3>
//       </div> */}

//       {/* Form Inputs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
//         <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="border p-2 rounded w-full" />
//         <input name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="border p-2 rounded w-full" />
//         <input name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} placeholder="Original Price" className="border p-2 rounded w-full" />
//         <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" className="border p-2 rounded w-full" />
//         <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded col-span-full" />
        
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">Main Image</label>
//           <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="border p-2 rounded w-full" />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-600 mb-1">Additional Images</label>
//           <input type="file" name="images" multiple accept="image/*" onChange={handleFileChange} className="border p-2 rounded w-full" />
//         </div>
//       </div>

//       {/* Preview */}
//       {previewUrl && (
//         <div className="px-6">
//           <img src={previewUrl} alt="Preview" className="h-40 mt-2 rounded border shadow object-cover" />
//         </div>
//       )}

//       {/* Submit Button */}
//       <div className="px-6 pb-6">
//         <button
//           onClick={handleAddOrUpdateProduct}
//           className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
//         >
//           {isEditing ? 'Update Product' : 'Add Product'}
//         </button>

//         {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
//       </div>

//       {/* Product List */}
//       <hr className="my-4" />
//       <h3 className="text-xl font-semibold mb-4 px-6">📦 Featured Products</h3>

//       <div className="grid md:grid-cols-3 gap-4 px-6 pb-10">
//         {products.map(product => (
//           <div key={product.id} className="border p-4 rounded shadow hover:shadow-md transition">
//             <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-3 rounded" />
//             <h4 className="font-bold">{product.name}</h4>
//             <p className="text-sm text-gray-600">₹{product.price}</p>
//             <div className="flex flex-wrap gap-2 mt-3">
//               <button onClick={() => handleEdit(product)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
//               <button onClick={() => handleDelete(product.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
//               <button onClick={() => handleConvertToSaree(product.id)} className="bg-green-600 text-white px-3 py-1 rounded">Convert to Saree</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload'; // ✅ Adjust path if needed

type Product = {
  id: number;
  name: string;
  price: number;
  original_price?: number;
  category?: string;
  image: string;
  images?: string[];
  description?: string;
};

type FormDataState = {
  id?: number;
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  description: string;
  mainImage: string;      // Base64 or URL
  images: string[];       // Array of base64
};

export default function FeaturedForm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    price: '',
    originalPrice: '',
    category: '',
    description: '',
    mainImage: '',
    images: [],
  });

  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/featured-products');
      setProducts(res.data);
    } catch (err) {
      console.error('❌ Fetch error:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      category: '',
      description: '',
      mainImage: '',
      images: [],
    });
    setIsEditing(false);
    setMessage('');
  };

  const handleAddOrUpdateProduct = async () => {
    if (!formData.name || !formData.price || (!formData.mainImage && !isEditing)) {
      alert('Name, price, and main image are required.');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('price', formData.price);
    form.append('originalPrice', formData.originalPrice || formData.price);
    form.append('category', formData.category);
    form.append('description', formData.description);

    try {
      // Convert base64 to Blob for main image
      if (formData.mainImage && !isEditing) {
        const blob = await fetch(formData.mainImage).then(r => r.blob());
        form.append('image', blob, `main-${Date.now()}.jpg`);
      }

      // Append additional images
      for (let i = 0; i < formData.images.length; i++) {
        const blob = await fetch(formData.images[i]).then(r => r.blob());
        form.append('images', blob, `extra-${i + 1}.jpg`);
      }

      if (isEditing && formData.id) {
        await axios.put(`http://localhost:5000/api/products/featured/${formData.id}`, {
          name: formData.name,
          price: parseFloat(formData.price),
          original_price: parseFloat(formData.originalPrice || formData.price),
          category: formData.category,
          description: formData.description,
        });
        setMessage('✅ Product updated successfully!');
      } else {
        const res = await axios.post('http://localhost:5000/api/products/featured', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.data?.length > 0) {
          setProducts(prev => [...prev, res.data[0]]);
          setMessage('✅ Product added successfully!');
        }
      }

      resetForm();
      fetchProducts();
    } catch (err: any) {
      console.error('❌ Save error:', err?.response?.data || err.message);
      setMessage('❌ Failed to save product');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: String(product.price),
      originalPrice: String(product.original_price || product.price),
      category: product.category || '',
      description: product.description || '',
      mainImage: product.image,
      images: product.images || [],
    });
    setIsEditing(true);
    setMessage('');
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/featured/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      setMessage('✅ Product deleted!');
    } catch (err) {
      console.error('❌ Delete error:', err);
      setMessage('❌ Failed to delete');
    }
  };

  const handleConvertToSaree = async (id: number) => {
    const stock = window.prompt('Enter stock quantity for this saree:');
    if (!stock || isNaN(Number(stock)) || Number(stock) <= 0) {
      alert('Please enter a valid stock quantity.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/products/convert/${id}`, { stock: Number(stock) });
      setMessage('✅ Product converted to saree with stock!');
      fetchProducts();
    } catch (err: any) {
      console.error('❌ Convert error:', err?.response?.data || err.message);
      setMessage('❌ Failed to convert product');
    }
  };

  return (
    <section className="">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" className="border p-2 rounded w-full" />
        <input name="price" value={formData.price} onChange={handleInputChange} placeholder="Price" className="border p-2 rounded w-full" />
        <input name="originalPrice" value={formData.originalPrice} onChange={handleInputChange} placeholder="Original Price" className="border p-2 rounded w-full" />
        <input name="category" value={formData.category} onChange={handleInputChange} placeholder="Category" className="border p-2 rounded w-full" />
        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="border p-2 rounded col-span-full" />
      </div>

      {/* Image Upload Component */}
      <div className="px-6">
        <ImageUpload
          images={formData.images}
          mainImage={formData.mainImage}
          onImagesChange={(imgs) => setFormData(prev => ({ ...prev, images: imgs }))}
          onMainImageChange={(img) => setFormData(prev => ({ ...prev, mainImage: img }))}
          onSuccess={(msg) => setMessage(msg)}
          onError={(err) => setMessage(err)}
        />
      </div>

      {/* Submit */}
      <div className="px-6 pb-6">
        <button
          onClick={handleAddOrUpdateProduct}
          className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
        {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
      </div>

      {/* Product List */}
      <hr className="my-4" />
      <h3 className="text-xl font-semibold mb-4 px-6">📦 Featured Products</h3>

      <div className="grid md:grid-cols-3 gap-4 px-6 pb-10">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow hover:shadow-md transition">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-3 rounded" />
            <h4 className="font-bold">{product.name}</h4>
            <p className="text-sm text-gray-600">₹{product.price}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <button onClick={() => handleEdit(product)} className="bg-blue-600 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              <button onClick={() => handleConvertToSaree(product.id)} className="bg-green-600 text-white px-3 py-1 rounded">Convert to Saree</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

