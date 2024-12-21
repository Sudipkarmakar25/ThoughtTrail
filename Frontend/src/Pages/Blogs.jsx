import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/blog/all-blogs");
      if (data?.success) {
        setBlogs(data.blogs);
      } else {
        setError(data.message || "Failed to fetch blogs.");
      }
    } catch (err) {
      setError("Error fetching blogs: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <Card
                id={blog._id}
                is_user={localStorage.getItem('userId')===blog.user._id}
                title={blog.title}
                content={blog.content}
                user={blog.user.username}
                image={blog.image}
                description={blog.description}
                time={blog.createdAt}
              />
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      )}
    </div>
  );
}
