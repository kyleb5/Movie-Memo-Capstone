/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h1>{user.displayName}</h1>
      <h3>{user.email}</h3>
      <img src={user.photoURL} alt="User" />
      <h4>{user.metadata.lastSignInTime}</h4>
    </div>
  );
}
