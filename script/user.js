export let users = JSON.parse(localStorage.getItem('user')) || [{
  name: "alwyn",
  username: "adrianoalwynm",
  password: "keirauy",
  isAdmin: true
}];

export function getUsers() {
  return users;
}

export function addUser(newUser) {
  users.push(newUser);
  localStorage.setItem('user', JSON.stringify(users));
}