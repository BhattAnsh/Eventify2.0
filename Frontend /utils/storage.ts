"use client";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  userId: string;
  createdAt: string;
}

export const eventStorage = {
  createEvent(eventData: Omit<Event, 'id' | 'createdAt'>) {
    if (typeof window === 'undefined') return null;
    
    const events = this.getAllEvents();
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    return newEvent;
  },

  getAllEvents(): Event[] {
    if (typeof window === 'undefined') return [];
    
    const events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
  },

  getUserEvents(userEmail: string): Event[] {
    if (typeof window === 'undefined') return [];
    
    const events = this.getAllEvents();
    return events.filter(event => event.userId === userEmail);
  },

  deleteEvent(id: string) {
    if (typeof window === 'undefined') return;
    
    const events = this.getAllEvents();
    const filteredEvents = events.filter(event => event.id !== id);
    localStorage.setItem('events', JSON.stringify(filteredEvents));
  }
}; 