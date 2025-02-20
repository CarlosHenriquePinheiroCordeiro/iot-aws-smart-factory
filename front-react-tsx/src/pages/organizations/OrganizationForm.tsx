// OrganizationForm.tsx

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Organization } from './Organizations';

const OrganizationForm: React.FC = () => {
  const [formData, setFormData] = useState<Organization>({
    id: 0,
    name: '',
    logo: '',
    number: '',
    street: '',
    city: '',
    state: '',
    country: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'image/png') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="card bg-base-200 shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Organization Form</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter organization name"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="number" className="block font-medium">Number</label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Enter number"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="street" className="block font-medium">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter street"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="city" className="block font-medium">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="state" className="block font-medium">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="country" className="block font-medium">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="logo" className="block font-medium">Logo (PNG file)</label>
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-dashed border-2 border-gray-400 rounded p-6 text-center cursor-pointer hover:border-primary transition-all"
                >
                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt={`${formData.name || 'Organization'} logo`}
                      className="mx-auto h-24 object-contain"
                    />
                  ) : (
                    <span className="text-gray-500">Drag and drop a PNG file here, or click to select one.</span>
                  )}
                </div>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/png"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>
            </form>
          </div>

          <div className="flex flex-col justify-center items-center">
            <motion.div
              className="card bg-base-200 shadow-xl m-4 transition-transform transform hover:scale-105 h-96 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="card-body flex flex-col text-center items-center">
                <h2 className="card-title text-2xl" style={{ fontSize: '1.5rem' }}>
                  {formData.name || 'Organization Name'}
                </h2>
                <div className="my-4">
                  {formData.logo ? (
                    <img
                      src={formData.logo}
                      alt={`${formData.name || 'Organization'} logo`}
                      className="w-full h-48 object-contain"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-100">
                      Logo Preview
                    </div>
                  )}
                </div>
                <p className="text-lg text-gray-500">
                  {[
                    formData.number,
                    formData.street,
                    formData.city,
                    formData.state,
                    formData.country
                  ]
                    .filter(Boolean)
                    .join(', ') || 'Address Info'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationForm;
