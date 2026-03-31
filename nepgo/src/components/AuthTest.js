import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthTest = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h3>Loading authentication...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Authentication Status</h2>
      
      <div style={{ 
        background: '#f8f9fa', 
        padding: '1rem', 
        borderRadius: '8px', 
        marginBottom: '1rem' 
      }}>
        <h3>Current Status:</h3>
        <p><strong>Is Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Is Loading:</strong> {isLoading ? '✅ Yes' : '❌ No'}</p>
      </div>

      {user ? (
        <div style={{ 
          background: '#e8f5e8', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem' 
        }}>
          <h3>User Information:</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          
          <button 
            onClick={logout}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={{ 
          background: '#fff3cd', 
          padding: '1rem', 
          borderRadius: '8px', 
          marginBottom: '1rem' 
        }}>
          <h3>Not Logged In</h3>
          <p>Please log in to see your user information.</p>
        </div>
      )}

      <div style={{ 
        background: '#d1ecf1', 
        padding: '1rem', 
        borderRadius: '8px' 
      }}>
        <h3>Local Storage:</h3>
        <p><strong>Token:</strong> {localStorage.getItem('token') ? '✅ Present' : '❌ Not found'}</p>
        <p><strong>User Data:</strong> {localStorage.getItem('user') ? '✅ Present' : '❌ Not found'}</p>
      </div>
    </div>
  );
};

export default AuthTest; 