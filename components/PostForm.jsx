"use client";
import { useState } from "react";

export default function PostForm({ users }) {
    const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit form logic here (e.g., calling an API)
//     const newPost ={
//       ...formData,
//     }
//     console.log(newPost)
//   };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create Post</h2>
      <form action='/api/post' 
      method="POST"
      encType='multipart/form-data'
       className="space-y-6">

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
            placeholder="Write your content here..."
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter image URL (optional)"
          />
        </div>

        {/* Likes */}
        <div>
          <label htmlFor="likes" className="block text-sm font-medium text-gray-700 mb-1">
            Likes
          </label>
          <input hidden
            type="number"
            id="likes"
            name="likes"
            value={formData.likes}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Shares */}
        <div>
          <label htmlFor="shares" className="block text-sm font-medium text-gray-700 mb-1">
            Shares
          </label>
          <input hidden
            type="number"
            id="shares"
            name="shares"
            value={formData.shares}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? "Posting...":"Create Post"}
        </button>
      </form>
    </div>
  );
}
