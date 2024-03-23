
export const registerEvent = (eventId, userName) => ({
    type: 'REGISTER_EVENT',
    payload: { eventId, userName },
  });
  