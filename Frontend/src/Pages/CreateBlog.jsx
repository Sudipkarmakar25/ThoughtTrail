import React, { useState } from 'react';
import axios from "axios"

export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id=localStorage.getItem("userId")
    console.log('Form Submitted:', formData);
    try {
        const {data}= await axios.post(`http://localhost:8080/api/v1/blog/create-blog`,{
            title:formData.title,
            image:formData.image,
            description:formData.description,
            user:id

        })
        if(data.success)
        {
            alert("Blog Added successfully!");
        }
        else{
            alert("Blog Uploading", data.message);
        }

    } catch (error) {
        console.log(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-6 bg-green-100 border border-green-300 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-green-700 mb-4">Create a Blog</h1>

        {/* Blog Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-green-800 font-medium mb-2"
          >
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-green-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Blog Image URL */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-green-800 font-medium mb-2"
          >
            Blog Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-green-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Blog Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-green-800 font-medium mb-2"
          >
            Blog Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border border-green-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
