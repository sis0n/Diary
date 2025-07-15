export let users = Array.isArray(JSON.parse(localStorage.getItem('user'))) ? JSON.parse(localStorage.getItem('user'))
  : [{
      id: crypto.randomUUID(),
      name: "alwyn",
      username: "adrianoalwyn",
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