const initialState = {
    events: [],
  };
  
  const eventReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'REGISTER_EVENT':
        const { eventId, userName } = action.payload;
        // Find the event by ID
        const updatedEvents = state.events.map(event => {
          if (event.id === eventId) {
            // If event found, update its registrations
            const updatedEvent = {
              ...event,
              registrations: [...event.registrations, userName] // Assuming registrations is an array
            };
            return updatedEvent;
          }
          return event; // If event not found, return unchanged
        });
        return {
          ...state,
          events: updatedEvents
        };
      default:
        return state;
    }
  };
  
  export default eventReducer;
  