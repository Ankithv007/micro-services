import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [values, setValues] = useState({ 
    publisher_id: '', // Make sure this matches your backend expectation
    name: '', 
    date: '' 
  });
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // Fetch publishers on component mount
  useEffect(() => {
    setLoading(true);
    axios.get(`${apiBaseUrl}/publishers`)
      .then((res) => {
        setPublishers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching publishers:', err);
        setError('Failed to load publishers');
        setLoading(false);
      });
  }, [apiBaseUrl]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    axios.post(`${apiBaseUrl}/books`, values) // Changed to match backend endpoint
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error('Creation error:', err.response?.data);
        setError(err.response?.data?.error || 'Failed to create book. Please try again.');
        setLoading(false);
      });
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold">Add New Book</h2>
      
      {error && <div className="alert alert-danger mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label htmlFor="publisher_id" className="form-label fw-semibold">
            Publisher
          </label>
          <select
            id="publisher_id"
            name="publisher_id"
            value={values.publisher_id}
            onChange={handleChange}
            className="form-select"
            required
            disabled={loading}
          >
            <option value="">Select Publisher</option>
            {publishers.map((pub) => (
              <option key={pub.id} value={pub.id}> {/* Using ID as value */}
                {pub.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">
            Book Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter Book Name"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label fw-semibold">
            Publish Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            className="form-control"
            required
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-success w-100 fw-bold"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Creating...
            </>
          ) : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;