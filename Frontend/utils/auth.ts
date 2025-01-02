export interface User {
  email: string;
  name: string;
}

export const auth = {
  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return !!user;
    }
    return false;
  },
  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
};  