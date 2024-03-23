
import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const EventRegistrationForm = ({ event, onRegister }) => {
  const [name, setName] = useState('');

  const handleRegister = () => {
    if (!name.trim()) return;
    onRegister(event.id, name);
    setName('');
  };

  return (
    <div>
      <h3>{event.title}</h3>
      <TextField
        label="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </div>
  );
};

export default EventRegistrationForm;
