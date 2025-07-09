


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface FormData {
//   id?: number;
//   title: string;
//   highlight: string;
//   description: string;
//   image_url: string;
// }

// const HeroSlideForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     title: '',
//     highlight: '',
//     description: '',
//     image_url: '',
//   });

//   const [slides, setSlides] = useState<FormData[]>([]);
//   const [message, setMessage] = useState('');
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const fetchSlides = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/admin/hero-slides');
//       setSlides(res.data);
//     } catch (err) {
//       console.error('❌ Failed to fetch slides:', err);
//     }
//   };

//   useEffect(() => {
//     fetchSlides();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setImageFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       let imageUrl = formData.image_url;

//       if (imageFile) {
//         const imageData = new FormData();
//         imageData.append('image', imageFile);
//         const res = await axios.post('http://localhost:5000/api/upload-image', imageData, {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         });
//         imageUrl = res.data.url;
//       }

//       const payload = {
//         title: formData.title,
//         highlight: formData.highlight,
//         description: formData.description,
//         image_url: imageUrl,
//       };

//       if (isUpdating && formData.id) {
//         await axios.put(`http://localhost:5000/api/hero-slides/${formData.id}`, payload);
//         setMessage('✅ Slide updated successfully!');
//       } else {
//         await axios.post('http://localhost:5000/api/admin/update-hero-slides', payload);
//         setMessage('✅ Slide added successfully!');
//       }

//       setFormData({ title: '', highlight: '', description: '', image_url: '' });
//       setImageFile(null);
//       setPreviewUrl(null);
//       setIsUpdating(false);
//       fetchSlides();
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Failed to save slide');
//     }
//   };

//   const handleEdit = (slide: FormData) => {
//     setFormData(slide);
//     setPreviewUrl(slide.image_url);
//     setIsUpdating(true);
//     setMessage('');
//     setImageFile(null);
//   };

//   return (
//     <div className="space-y-6">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Banner Title"
//           value={formData.title}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded"
//         />
//         <input
//           type="text"
//           name="highlight"
//           placeholder="Highlight"
//           value={formData.highlight}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           className="w-full px-3 py-2 border border-gray-300 rounded"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full"
//         />
//         {previewUrl && (
//           <img src={previewUrl} alt="Preview" className="h-48 w-full object-cover rounded border" />
//         )}
//         <button
//           type="submit"
//           className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
//         >
//           {isUpdating ? 'Update Slide' : 'Add Slide'}
//         </button>
//       </form>

//       {message && <p className="text-sm text-green-600">{message}</p>}

//       <div className="overflow-x-auto mt-6">
//         <table className="min-w-full table-auto border border-gray-300 text-sm">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="px-4 py-2 border">Title</th>
//               <th className="px-4 py-2 border">Highlight</th>
//               <th className="px-4 py-2 border">Description</th>
//               <th className="px-4 py-2 border">Image</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {slides.map((slide) => (
//               <tr key={slide.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 border">{slide.title}</td>
//                 <td className="px-4 py-2 border">{slide.highlight}</td>
//                 <td className="px-4 py-2 border">{slide.description}</td>
//                 <td className="px-4 py-2 border">
//                   <img
//                     src={slide.image_url}
//                     alt="Slide"
//                     className="h-20 w-32 object-cover rounded"
//                   />
//                 </td>
//                 <td className="px-4 py-2 border">
//                   <button
//                     onClick={() => handleEdit(slide)}
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default HeroSlideForm;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface FormData {
  id?: number;
  title: string;
  highlight: string;
  description: string;
  image_url: string;
}

const HeroSlideForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    highlight: '',
    description: '',
    image_url: '',
  });

  const [slides, setSlides] = useState<FormData[]>([]);
  const [message, setMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchSlides = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/hero-slides');
      setSlides(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch slides:', err);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        const imageData = new FormData();
        imageData.append('image', imageFile);
        const res = await axios.post('http://localhost:5000/api/upload-image', imageData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = res.data.url;
      }

      const payload = {
        title: formData.title,
        highlight: formData.highlight,
        description: formData.description,
        image_url: imageUrl,
      };

      if (isUpdating && formData.id) {
        await axios.put(`http://localhost:5000/api/hero-slides/${formData.id}`, payload);
        setMessage('✅ Slide updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/admin/update-hero-slides', payload);
        setMessage('✅ Slide added successfully!');
      }

      setFormData({ title: '', highlight: '', description: '', image_url: '' });
      setImageFile(null);
      setPreviewUrl(null);
      setIsUpdating(false);
      fetchSlides();
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to save slide');
    }
  };

  const handleEdit = (slide: FormData) => {
    setFormData(slide);
    setPreviewUrl(slide.image_url);
    setIsUpdating(true);
    setMessage('');
    setImageFile(null);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    const confirmDelete = window.confirm('Are you sure you want to delete this slide?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/hero-slides/${id}`);
      setMessage('🗑️ Slide deleted successfully!');
      fetchSlides();
    } catch (err) {
      console.error('❌ Failed to delete slide:', err);
      setMessage('❌ Failed to delete slide.');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Banner Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="highlight"
          placeholder="Highlight"
          value={formData.highlight}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {previewUrl && (
          <img src={previewUrl} alt="Preview" className="h-48 w-full object-cover rounded border" />
        )}
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {isUpdating ? 'Update Slide' : 'Add Slide'}
        </button>
      </form>

      {message && <p className="text-sm text-green-600">{message}</p>}

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full table-auto border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Highlight</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((slide) => (
              <tr key={slide.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{slide.title}</td>
                <td className="px-4 py-2 border">{slide.highlight}</td>
                <td className="px-4 py-2 border">{slide.description}</td>
                <td className="px-4 py-2 border">
                  <img
                    src={slide.image_url}
                    alt="Slide"
                    className="h-20 w-32 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeroSlideForm;

