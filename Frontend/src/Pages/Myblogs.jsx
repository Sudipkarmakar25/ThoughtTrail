import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

export default function Myblogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUserBlogs = async () => {
    setLoading(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        setError('User not found. Please login.');
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${userId}`);

      // Check if the response is successful
      if (response.status === 200 && response.data.success) {
        setBlogs(response.data.userBlog.blogs || []);
      } else {
        setError(response.data.message || 'Failed to load blogs');
      }
    } catch (err) {
      console.error('Error fetching blogs:', err.response ? err.response.data : err.message);
      setError('An error occurred while fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBlogs(); // Call the function to fetch blogs
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <div>
      <h1>My Blogs</h1>
      <div className="p-4">
        {loading && <p>Loading blogs...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <Card
                  id={blog._id}
                  is_user={true}
                  title={blog.title}
                  content={blog.content}
                  user={blog.user?.username || 'Unknown User'} // Fallback to 'Unknown User' if user is undefined
                  image={blog.image || '/default-image.jpg'} // Provide a default image if none exists
                  description={blog.description}
                  time={new Date(blog.createdAt).toLocaleString() || 'No Date Available'} // Format date
                />
              ))
            ) : (
              <p>No blogs available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
