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
      password: "keirauy",
      isSuperAdmin: true,
      isActive: true
    }];
    localStorage.setItem('user', JSON.stringify(users));
  }
}


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