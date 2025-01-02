interface VolunteerRegistration {
    eventId: string;
    userId: string;
    registrationDate: string;
    status: 'pending' | 'approved' | 'rejected';
  }
  
  // This would typically be in a database
  const volunteerRegistrations: VolunteerRegistration[] = [];
  
  export const volunteerManager = {
    // Register a new volunteer
    registerVolunteer: async (eventId: string, userId: string): Promise<boolean> => {
      // Check if user is already registered
      const existingRegistration = volunteerRegistrations.find(
        reg => reg.eventId === eventId && reg.userId === userId
      );

      if (existingRegistration) {
        throw new Error('You have already registered for this event');
      }

      // Add new registration
      const newRegistration: VolunteerRegistration = {
        eventId,
        userId,
        registrationDate: new Date().toISOString(),
        status: 'pending'
      };

      volunteerRegistrations.push(newRegistration);
      return true;
    },
  
    // Check if a user is registered for an event
    isUserRegistered: (eventId: string, userId: string): boolean => {
      return volunteerRegistrations.some(
        reg => reg.eventId === eventId && reg.userId === userId
      );
    },
  
    // Get all registrations for an event
    getEventRegistrations: (eventId: string): VolunteerRegistration[] => {
      return volunteerRegistrations.filter(reg => reg.eventId === eventId);
    },
  
    // Get all registrations for a user
    getUserRegistrations: (userId: string): VolunteerRegistration[] => {
      return volunteerRegistrations.filter(reg => reg.userId === userId);
    },
  
    // Update registration status
    updateRegistrationStatus: async (
      eventId: string,
      userId: string,
      status: 'approved' | 'rejected'
    ): Promise<boolean> => {
      const registration = volunteerRegistrations.find(
        reg => reg.eventId === eventId && reg.userId === userId
      );

      if (!registration) {
        throw new Error('Registration not found');
      }

      registration.status = status;
      return true;
    },
  
    // Cancel registration
    cancelRegistration: async (eventId: string, userId: string): Promise<boolean> => {
      const index = volunteerRegistrations.findIndex(
        reg => reg.eventId === eventId && reg.userId === userId
      );

      if (index === -1) {
        throw new Error('Registration not found');
      }

      volunteerRegistrations.splice(index, 1);
      return true;
    }
  };