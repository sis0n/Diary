export let users = JSON.parse(localStorage.getItem('user')) || [];

export function getUsers() {
  return users;
}

export function addUser(newUser) {
  users.push(newUser);
  localStorage.setItem('user', JSON.stringify(users));
}