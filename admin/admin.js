import { getUsers } from "../script/user.js";
import { entry } from "../script/data.js";
import { getCurrentUser } from "../script/auth.js";

const currentUser = getCurrentUser();
const welcomeTitle = document.querySelector('.welcome-title');
const mainSuperAdmin = "40008e6f-2b92-4597-9619-4565c31a8b76";

if(!currentUser.isAdmin && !currentUser.isSuperAdmin ){
  Swal.fire({
    title: 'Access Denied',
    text: 'Only admins and super admins can access this area.',
    icon: 'error'
  });
}

if (!currentUser) {
  const loc = window.location.origin + '/login.html' 
  window.location.href = loc;
} else if(welcomeTitle) {
  welcomeTitle.innerHTML = `Hi, ${currentUser.name}`;
}

const userTable = document.querySelector('.user-table');
const users = getUsers();

console.log('loaded users: ', users);

function countUserEntries(username) {
  return entry.filter(e => e.username === username).length;
}

users.forEach((user) => {
  const entryCount = countUserEntries(user.username);
  // const isDisabled = (user.isSuperAdmin || user.id === currentUser.id)  ? 'disabled' : '';
  const buttonText = user.isActive === false ? 'Activate' : 'Deactivate';
  const buttonValue = user.isActive === false ? 'activate' : 'deactivate';

  let isDisabled = '';

  
  if (user.id === mainSuperAdmin && currentUser.id !== mainSuperAdmin) {
    isDisabled = 'disabled';
  } else if (user.id === currentUser.id) {
    isDisabled = 'disabled';
}

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>@${user.username}</td>
    <td>${entryCount}</td>
    <td>
      <select class="role-select" data-user-id="${user.id}" ${isDisabled}>
        <option value="user" ${!user.isAdmin && !user.isSuperAdmin ? 'selected' : ''}>User</option>
        <option value="admin" ${user.isAdmin && !user.isSuperAdmin ? 'selected' : ''}>Admin</option>
        <option value="superadmin" ${user.isSuperAdmin ? 'selected' : ''}>Super Admin</option>
      </select>
    </td>
    <td>
      <button class="adminAction" data-user-id="${user.id}" value="${buttonValue}" ${isDisabled}>${buttonText}</button>
    </td>
  `;
  userTable.appendChild(row);

  const actionBtn = row.querySelector('.adminAction');

  actionBtn.addEventListener('click', (action) => {
    const selectedUser = users.find(u => u.id === user.id);

    selectedUser.isActive = !selectedUser.isActive;

    if(!selectedUser.isActive) {
      action.target.value = 'activate';
      action.target.textContent = "Activate";
    } else {
      action.target.value = 'deactivate';
      action.target.textContent = "Deactivate";
    }
    
    if (user.id === mainSuperAdmin && currentUser.id !== mainSuperAdmin) {
      Swal.fire({
        title: 'Access Denied',
        text: 'You cannot activate or deactivate the main super admin.',
        icon: 'error'
      });
      return;
    }

    localStorage.setItem('user', JSON.stringify(users));
  });

});

userTable.addEventListener('change', (e) => {
  if (!e.target.classList.contains('role-select')) return;

  const newRole = e.target.value;
  const userId = e.target.dataset.userId;
  const selectedUser = users.find(user => user.id === userId);

  selectedUser.isAdmin = false;
  selectedUser.isSuperAdmin = false;

  if(newRole === 'admin') {
    selectedUser.isAdmin = true;
  } else if (newRole === 'superadmin') {
    selectedUser.isSuperAdmin = true;
  }

  if(userId === mainSuperAdmin && currentUser.id !== mainSuperAdmin) {
    Swal.fire({
      title: 'Access Denied',
      text: 'You cannot modify the main super admin.',
      icon: 'error'
    });
    return;
  }
  localStorage.setItem('user', JSON.stringify(users));
});

document.querySelector('.logout-button')
  .addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    const loc = window.location.origin + '/login.html';
    window.location.href = loc;
  });