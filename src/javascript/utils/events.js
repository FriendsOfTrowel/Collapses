export const createNewEvent = eventName => {
  if (typeof(Event) === 'function') {
    var event = new Event(eventName);
  } else {
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }

  return event
}
