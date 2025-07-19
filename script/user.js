let users = [];

if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('user');

  if (stored) {
    users = JSON.parse(stored);
  } else {
    users = [{
      id: crypto.randomUUID(),
      name: "alwyn",
      username: "adrianoalwyn",
      password: "superadmin",
      isSuperAdmin: true,
      isActive: true
    }];
    localStorage.setItem('user', JSON.stringify(users));
  }
}


export function getUsers() {
  return JSON.parse(localStorage.getItem('user')) || [];
}

export function addUser(newUser) {
  users.push(newUser);
  localStorage.setItem('user', JSON.stringify(users));
}