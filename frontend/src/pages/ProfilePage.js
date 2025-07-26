// src/pages/ProfilePage.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Profile</h2>

        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" value={user?.username || ''} readOnly />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={user?.email || ''} readOnly />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;