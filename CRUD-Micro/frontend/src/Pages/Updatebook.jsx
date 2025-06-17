import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const { id } = useParams();
  const [values, setValues] = useState({ 
    publisher_id: '', 
    name: '', 
    date: '' 
  });
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Fetch publishers and book data
    setLoading(true);
    Promise.all([
      axios.get(`${apiBaseUrl}/publishers`),
      axios.get(`${apiBaseUrl}/books/${id}`)
    ])
    .then(([pubsRes, bookRes]) => {
      setPublishers(pubsRes.data);
      const bookData = bookRes.data;
      setValues({
        publisher_id: bookData.publisher_id,
        name: bookData.name,
        date: bookData.date.split('T')[0] // Format date for input
      });
    })
    .catch(err => {
      console.error('Fetch error:', err);
      setError('Failed to load data');
    })
    .finally(() => setLoading(false));
  }, [id, apiBaseUrl]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    axios.put(`${apiBaseUrl}/books/${id}`, values)
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        console.error('Update error:', err);
        setError(err.response?.data?.error || 'Failed to update book');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 fw-bold">Update Book</h2>
      
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
              <option key={pub.id} value={pub.id}>
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
          className="btn btn-primary w-100 fw-bold"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;