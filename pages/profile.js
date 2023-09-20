/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  return (
    <div className="center-container">
      <h1>Hello, {user.displayName}</h1>
      <img src={user.photoURL} alt="User" />
      <h3>Logged in as: {user.email}</h3>
      <h4>Last Known Logged in Date: {user.metadata.lastSignInTime}</h4>
    </div>
  );
}
