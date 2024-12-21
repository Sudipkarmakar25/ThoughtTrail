import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({ 
  title = 'Untitled', 
  description = 'No content available.', 
  user = 'Unknown Author', 
  image = 'https://th.bing.com/th/id/OIP.SjwtoF77oPIDKz6-JBXuegHaEk?rs=1&pid=ImgDetMain', 
  time, 
  id, 
  is_user 
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert('Blog Deleted Successfully');
        navigate('/Myblogs');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      <img
        className="w-full object-cover rounded-t-lg"
        src={image}
        alt={title}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <h3 className="text-sm font-medium text-gray-600 mt-1">
          By {user}
        </h3>
        <p className="text-gray-700 mt-3">{description}</p>
        <h6 className="text-gray-500 text-sm mt-2">Created At: {time}</h6>
      </div>
      {is_user && (
        <div className="p-4">
          <button
            onClick={handleDelete}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

// Adding PropTypes for type checking
Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  is_user: PropTypes.bool.isRequired,
};

export default Card;
