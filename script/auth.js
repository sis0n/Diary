export const currentUser = JSON.parse(localStorage.getItem('currentUser'));

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}