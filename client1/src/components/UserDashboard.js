
import React from 'react';

const UserDashboard = ({ user, registeredEvents }) => {
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <h3>Your Registered Events:</h3>
      <ul>
        {registeredEvents.map((event) => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
