import React from 'react';

const LoadingSpinner = () => (
  <div className="spinner">
    <div className="double-bounce1"></div>
    <div className="double-bounce2"></div>
  </div>
);

const loading = () => {
  return (
    <div className="loading-container">
      <LoadingSpinner />
      <p>Loading...</p>
    </div>
  );
};

export default loading;

