import { getUsers } from "../script/user.js";
import { entry } from "../script/data.js";

const userTable = document.querySelector('.user-table');


const users = getUsers();

function countUserEntries(username) {
  return entry.filter(user => user.username === username).length;
}


users.forEach((user) => {
  const entryCount = countUserEntries(user.username);
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>@${user.username}</td>
    <td>${entryCount}</td>
    <td>${user.isAdmin ? 'Admin' : 'User'}</td>
    <td>
      <button>Edit</button>
      <button>Delete</button>
    </td>
  `;
  userTable.appendChild(row);
});

document.querySelector('.logout-button')
  .addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    const loc = window.location.origin + '/login.html'
    window.location.href = loc;
  });