import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';


const Sidebar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4" style={{ minHeight: '100vh' }}>
      {/* Brand Logo */}
      <Link to="/" className="brand-link text-center">
        <span className="brand-text font-weight-bold text-light">📚 My App</span>
      </Link>

      {/* Sidebar */}
      <div className="sidebar">
        {/* User Panel */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
          <div className="info">
            <a href="#" className="d-block text-white font-weight-bold">👤 Ankith</a>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                <i className="nav-icon fa fa-book"></i>
                <p>Book List</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create" className="nav-link text-white">
                <i className="nav-icon fa fa-plus"></i>
                <p>Create Book</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/publisher" className="nav-link text-white">
                <i className="nav-icon fa fa-user"></i>
                <p>Publisher</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/review" className="nav-link text-white">
                <i className="nav-icon fa fa-star"></i>
                <p>Review</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
