// client/src/Pages/Publisher.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Publisher = () => {
  const [publishers, setPublishers] = useState([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/publishers`)
      .then((res) => setPublishers(res.data))
      .catch((err) => console.error('Error fetching publishers:', err));
  }, [apiBaseUrl]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this publisher?')) {
      axios
        .delete(`${apiBaseUrl}/publishers/${id}`)
        .then(() => {
          setPublishers((prev) => prev.filter((p) => p.id !== id));
        })
        .catch((err) => console.error('Delete failed:', err));
    }
  };

  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">Publishers</h2>

      {publishers.length > 0 ? (
        <div className="table-responsive shadow rounded">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((pub, index) => (
                <tr key={pub.id}>
                  <td>{index + 1}</td>
                  <td>{pub.id}</td>
                  <td>{pub.name}</td>
                  <td>{pub.address}</td>
                  <td>{pub.contact}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(pub.id)}
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
        <div className="alert alert-info text-center">No publishers found.</div>
      )}
    </div>
  );
};

export default Publisher;
