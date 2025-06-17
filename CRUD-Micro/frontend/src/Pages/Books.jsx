import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setLoading(true);
    axios.get(`${apiBaseUrl}/books`)
      .then((res) => setBooks(res.data))
      .catch((err) => {
        console.error('Error fetching books:', err);
        setError('Failed to load books');
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${apiBaseUrl}/books/${id}`);
        fetchBooks(); // Refresh the list after deletion
      } catch (err) {
        console.error('Delete error:', err);
        setError(err.response?.data?.error || 'Failed to delete book');
      }
    }
  };

  if (loading) return <div className="text-center my-4">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Books List</h2>
        <Link to="/create" className="btn btn-primary">
          + Add New Book
        </Link>
      </div>

      {books.length > 0 ? (
        <div className="table-responsive shadow rounded">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Publisher</th>
                <th>Book Name</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr key={book.id}>
                  <td>{index + 1}</td>
                  <td>{book.id}</td>
                  <td>{book.publisher}</td>
                  <td>{book.name}</td>
                  <td>{new Date(book.date).toLocaleDateString()}</td>
                  <td className="text-center">
                    <Link
                      to={`/update/${book.id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">No Books Found</div>
      )}
    </div>
  );
};

export default Books;