
import React from 'react';
import EventRegistrationForm from './EventRegistrationForm';

const EventList = ({ events, onRegister }) => {
  return (
    <div>
      <h2>Events</h2>
      {events.map((event) => (
        <EventRegistrationForm
          key={event.id}
          event={event}
          onRegister={onRegister}
        />
      ))}
    </div>
  );
};

export default EventList;
