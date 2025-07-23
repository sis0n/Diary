export const currentUser = JSON.parse(localStorage.getItem('currentUser'));

export function getCurrentUser() {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
}