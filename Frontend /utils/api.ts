const API_BASE_URL = 'http://localhost:3001';

export const eventApi = {
  async createEvent(eventData: { title: string; description: string; date: string; time: string }) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    const eventWithUser = {
      ...eventData,
      userId: user.email,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventWithUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async getUserEvents() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await fetch(`${API_BASE_URL}/events?userId=${user.email}`);
    return response.json();
  },

  async updateEvent(id: number, eventData: { title: string; description: string; date: string; time: string }) {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    return response.json();
  },

  async deleteEvent(id: number) {
    await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
    });
  }
};