export const userId = {
  get: () => {
    return localStorage.getItem('userId');
  },
  set: (id: string) => {
    localStorage.setItem('userId', id);
  },
};
