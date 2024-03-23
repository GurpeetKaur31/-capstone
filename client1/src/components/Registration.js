import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      // Registration successful
      console.log('User registered successfully');
    } catch (error) {
      setError('Registration failed. Please try again.'); // Display error message
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="email" label="Email" value={formData.email} onChange={handleInputChange} />
      <TextField name="password" label="Password" type="password" value={formData.password} onChange={handleInputChange} />
      <Button type="submit" variant="contained" color="primary">Register</Button>
      {error && <p>{error}</p>} {/* Display error message if registration fails */}
    </form>
  );
};

export default RegistrationForm;
