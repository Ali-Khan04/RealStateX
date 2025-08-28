import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import { FaUser, FaEdit, FaCamera } from "react-icons/fa";

export default function Profile() {
  const { state } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: state.user?.name || "",
    email: state.user?.email || "",
    phone: state.user?.phone || "",
    bio: state.user?.bio || "",
  });

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    state.user = {
      ...state.user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
    };
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: state.user?.name || "",
      email: state.user?.email || "",
      phone: state.user?.phone || "",
      bio: state.user?.bio || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-slate-400 to-slate-500 h-32"></div>

          <div className="relative px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="relative inline-block">
                {!imageError && state.user.avatar ? (
                  <>
                    <img
                      src={state.user.avatar}
                      alt="Profile"
                      className={`w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg transition-opacity duration-200 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onError={handleImageError}
                      onLoad={handleImageLoad}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 w-32 h-32 rounded-full bg-slate-400 animate-pulse border-4 border-white"></div>
                    )}
                  </>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-slate-500 flex items-center justify-center border-4 border-white shadow-lg">
                    <FaUser className="text-white text-4xl" />
                  </div>
                )}
                <button className="absolute bottom-2 right-2 bg-slate-600 hover:bg-slate-700 text-white p-2 rounded-full shadow-md transition-colors duration-200">
                  <FaCamera className="text-sm" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  {state.user.name}
                </h1>
                <p className="text-slate-600">RealEstateX</p>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <FaEdit className="text-sm" />
                  Edit Profile
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                      {state.user.name || "Not provided"}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                      {state.user.email || "Not provided"}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                      {formData.phone || "Not provided"}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="p-3 bg-slate-100 rounded-lg text-slate-700 min-h-[100px]">
                    {formData.bio || "No bio provided yet."}
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-700 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Account Settings
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700">Change Password</span>
                <button className="text-slate-600 hover:text-slate-800 transition-colors duration-200 cursor-pointer">
                  Update
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700">Change Email</span>
                <button className="text-slate-600 hover:text-slate-800 transition-colors duration- cursor-pointer">
                  Manage
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700">View Listings</span>
                <button className="text-slate-600 hover:text-slate-800 transition-colors duration- cursor-pointer">
                  View
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-red-500">Delete Account</span>
                <button className="text-red-700 hover:text-slate-800 transition-colors duration-200 cursor-pointer">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              Activity Summary
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Properties Viewed</span>
                <span className="font-medium text-slate-800">PlaceHolder</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Saved Searches</span>
                <span className="font-medium text-slate-800">PlaceHolder</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Favorite Properties</span>
                <span className="font-medium text-slate-800">PlaceHolder</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Messages Sent</span>
                <span className="font-medium text-slate-800">PlaceHolder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
