export let users = Array.isArray(JSON.parse(localStorage.getItem('user'))) ? JSON.parse(localStorage.getItem('user'))
  : [{
      id: crypto.randomUUID(),
      name: "alwyn",
      username: "adrianoalwyn",
      password: "keirauy",
      isSuperAdmin: true,
      isActive: true
    }];

export function getUsers() {
  const raw = localStorage.getItem('user');

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error('Parsing users failed:', error);
    return [];
  }
}

export function addUser(newUser) {
  users.push(newUser);
  localStorage.setItem('user', JSON.stringify(users));
}