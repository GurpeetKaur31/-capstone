import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Login successful
      console.log('User logged in successfully');
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.'); // Display error message
      console.error('Error logging in user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" label="Email" value={formData.email} onChange={handleInputChange} />
      <TextField name="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
      <Button type="submit" variant="contained" color="primary">Login</Button>
      {error && <p>{error}</p>} {/* Display error message if login fails */}
    </form>
  );
};

export default LoginForm;
