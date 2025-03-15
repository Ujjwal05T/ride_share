'use client'
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaArrowLeft, FaSave } from 'react-icons/fa';

function EditProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });

  // Validation states
  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get JWT token from localStorage or cookies
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/login');
          return;
        }

        // Fetch user data from backend API
        const response = await axios.get('http://localhost:5000/profile/get-profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const profileData = response.data.data.profile;
        
        // Update form data with fetched profile data
        setFormData({
          fullName: profileData.fullName || "",
          username: profileData.username || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
        });
      } catch (err:unknown) {
        const error = err as AxiosError;
        if (error.response) {
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            router.push('/login');
            return;
          }
          setError(`Error ${error.response.status}: ${error.response.statusText}`);
        } else if (error.request) {
          setError('No response received from server. Please try again later.');
        } else {
          setError(`Error: ${error.message}`);
        }
        console.error('Failed to fetch user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when the user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Validate fullName
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // Validate phone
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone format (e.g., 123-456-7890)";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear any previous messages
    setError("");
    setSuccess("");
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }
      
      // Create update object, omit password fields if they're empty
      const updateData = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
      };
      
      // Send update to server
      await axios.put('http://localhost:5000/profile/update-profile', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSuccess("Profile updated successfully!");
      setSaving(false);
      
    } catch (err:unknown) {
      const error = err as AxiosError;
      setSaving(false);
      
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }
        setError(`Error: ${'Failed to update profile'}`);
      } else if (error.request) {
        setError('No response received from server. Please try again later.');
      } else {
        setError(`Error: ${error.message}`);
      }
      console.error('Failed to update profile:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#0b1018] to-[#1a1f2e] text-white">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-lg font-medium text-blue-300">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1018] to-[#1a1f2e] text-white pb-12">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0b1018]/80 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="mr-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
          <button 
            onClick={handleSubmit}
            disabled={saving}
            className={`sm:flex items-center py-1.5 px-3 rounded-lg transition-colors hidden ${
              saving 
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <FaSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {error && (
          <div className="mb-6 bg-red-900/30 border border-red-700 text-red-100 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-900/30 border border-green-700 text-green-100 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Personal Information */}
          <div className="bg-gradient-to-br from-[#121418] to-[#131824] rounded-xl p-6 shadow-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-blue-300">Personal Information</h2>
            
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-gray-300 mb-1 text-sm" htmlFor="fullName">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`bg-[#0b1018] text-white w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                      errors.fullName ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:border-blue-500`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>
              
              {/* Username */}
              <div>
                <label className="block text-gray-300 mb-1 text-sm" htmlFor="username">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className="text-gray-500">@</div>
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`bg-[#0b1018] text-white w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                      errors.username ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:border-blue-500`}
                    placeholder="Enter username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-[#121418] to-[#131824] rounded-xl p-6 shadow-xl border border-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-blue-300">Contact Information</h2>
            
            <div className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-gray-300 mb-1 text-sm" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-[#0b1018] text-white w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:border-blue-500`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              
              {/* Phone */}
              <div>
                <label className="block text-gray-300 mb-1 text-sm" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-500" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`bg-[#0b1018] text-white w-full pl-10 pr-3 py-2.5 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-700'
                    } focus:outline-none focus:border-blue-500`}
                    placeholder="123-456-7890"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Format: 123-456-7890</p>
              </div>
            </div>
          </div>

          {/* Submit Button for Mobile */}
          <div className="md:hidden flex justify-center">
            <button
              type="submit"
              disabled={saving}
              className={`w-[85%] flex items-center justify-center py-3 px-6 rounded-lg transition-colors ${
                saving 
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {saving ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-t-transparent border-white rounded-full mr-2"></div>
                  Saving Changes...
                </>
              ) : (
                <>
                  <FaSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;