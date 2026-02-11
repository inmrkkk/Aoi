import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseStorage } from '../firebase';

const Upload = ({ onAddFlower, flowers, onUpdateFlower, onDeleteFlower }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingFlower, setEditingFlower] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
    imagePreview: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          image: 'Please select an image file'
        }));
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          image: 'Image size should be less than 5MB'
        }));
        return;
      }

      // Upload to Firebase Storage
      try {
        const timestamp = Date.now();
        const filename = `flowers/${timestamp}-${file.name}`;
        const result = await firebaseStorage.uploadImage(file, filename);
        
        if (result.success) {
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: result.url
          }));
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        // Fallback to local preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            image: file,
            imagePreview: reader.result
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (!/^\$?\d+(\.\d{2})?$/.test(formData.price)) {
      newErrors.price = 'Please enter a valid price (e.g., $45 or 45)';
    }

    if (!formData.image) {
      newErrors.image = 'Please select an image';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing) {
        // Update existing flower
        let imageUrl = formData.imagePreview || editingFlower.image;
        
        // If new image was uploaded, upload it to Firebase Storage
        if (formData.image && formData.image instanceof File) {
          const timestamp = Date.now();
          const filename = `flowers/${timestamp}-${formData.image.name}`;
          const uploadResult = await firebaseStorage.uploadImage(formData.image, filename);
          
          if (uploadResult.success) {
            imageUrl = uploadResult.url;
          } else {
            throw new Error(uploadResult.error);
          }
        }

        const updatedFlower = {
          ...editingFlower,
          title: formData.title,
          description: formData.description,
          price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
          image: imageUrl
        };
        
        await onUpdateFlower(editingFlower.id, updatedFlower);
        alert('Bouquet updated successfully!');
        resetForm();
      } else {
        // Create new flower - upload image first
        let imageUrl = formData.imagePreview;
        
        if (formData.image && formData.image instanceof File) {
          const timestamp = Date.now();
          const filename = `flowers/${timestamp}-${formData.image.name}`;
          const uploadResult = await firebaseStorage.uploadImage(formData.image, filename);
          
          if (uploadResult.success) {
            imageUrl = uploadResult.url;
          } else {
            throw new Error(uploadResult.error);
          }
        }

        const newFlower = {
          title: formData.title,
          description: formData.description,
          price: formData.price.startsWith('$') ? formData.price : `$${formData.price}`,
          image: imageUrl
        };

        await onAddFlower(newFlower);
        alert('Bouquet uploaded successfully!');
        resetForm();
      }
      
    } catch (error) {
      console.error('Error uploading flower:', error);
      alert(`Error ${isEditing ? 'updating' : 'uploading'} bouquet: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      image: null,
      imagePreview: ''
    });
    setIsEditing(false);
    setEditingFlower(null);
  };

  const handleEdit = (flower) => {
    setIsEditing(true);
    setEditingFlower(flower);
    setFormData({
      title: flower.title,
      description: flower.description,
      price: flower.price,
      image: null,
      imagePreview: flower.image
    });
  };

  const handleDelete = async (flowerId) => {
    if (window.confirm('Are you sure you want to delete this bouquet?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        onDeleteFlower(flowerId);
        alert('Bouquet deleted successfully!');
      } catch (error) {
        console.error('Error deleting flower:', error);
        alert('Error deleting bouquet. Please try again.');
      }
    }
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
    // Reset file input
    document.getElementById('image-input').value = '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isEditing ? 'Edit Bouquet' : 'Upload Your Bouquet Design'}
          </h1>
          <p className="text-lg text-gray-600">
            {isEditing ? 'Update your beautiful floral creation' : 'Share your beautiful floral creation with our community'}
          </p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bouquet Image *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-flower-rose transition-colors">
                <div className="space-y-1 text-center">
                  {formData.imagePreview ? (
                    <div className="relative">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="mx-auto h-64 w-auto rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ) : (
                    <>
                      <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image-input"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-flower-rose hover:text-rose-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-flower-rose"
                        >
                          <span>Upload a file</span>
                          <input
                            id="image-input"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              {errors.image && (
                <p className="mt-2 text-sm text-red-600">{errors.image}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Bouquet Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-flower-rose ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter bouquet title"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-flower-rose ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your bouquet design"
              />
              {errors.description && (
                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-flower-rose ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., $45 or 45"
              />
              {errors.price && (
                <p className="mt-2 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  if (isEditing) {
                    resetForm();
                  } else {
                    navigate('/gallery');
                  }
                }}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {isEditing ? 'Cancel' : 'Back to Gallery'}
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    {isEditing ? 'Updating...' : 'Uploading...'}
                  </>
                ) : (
                  <>
                    <i className="fas fa-upload mr-2"></i>
                    {isEditing ? 'Update Bouquet' : 'Upload Bouquet'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Bouquets Management */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Existing Bouquets</h2>
            {flowers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {flowers.map((flower) => (
                  <div key={flower.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={flower.image}
                        alt={flower.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{flower.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{flower.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-flower-rose font-bold">{flower.price}</span>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{flower.category}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(flower)}
                          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          <i className="fas fa-edit mr-1"></i>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(flower.id)}
                          className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm"
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="fas fa-images text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No bouquets uploaded yet. Start by adding your first bouquet!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
