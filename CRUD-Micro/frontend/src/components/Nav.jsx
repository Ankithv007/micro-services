import React from 'react';

const Nav = () => {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '70px',
        backgroundColor: '#0d6efd', // Bootstrap primary blue
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '700',
        fontSize: '1.8rem',
        boxShadow: '0 2px 8px rgba(202, 240, 248, 0.5) ',
        zIndex: 1000,
      }}
    >
      Book Management System (BMS)
    </nav>
  );
};

export default Nav;
