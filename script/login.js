import { getUsers } from './user.js';
import { UserMessageEntries } from './data.js';
import { getCurrentUser } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();

  if (currentUser) {
    window.location.href = `${window.location.origin}/diary.html`;
  } else {
    userNotFound();
  }
});

function userNotFound() {
  const submitBtn = document.querySelector('.submit-button');

  if (!submitBtn) return;

  submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const inputUsername = document.querySelector('.js-name-input')?.value.trim();
    const inputPass = document.querySelector('.js-password-input')?.value;

    if (!inputUsername || !inputPass) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please enter both username and password.',
        icon: 'warning'
      });
      return;
    }

    const users = getUsers();

    const foundUser = users.find(user => user.username === inputUsername);

    if (!foundUser) {
      Swal.fire({
        title: 'User not found',
        text: `No account with username "${inputUsername}" exists.`,
        icon: 'warning'
      });
      return;
    }

    if (foundUser.password !== inputPass) {
      Swal.fire({
        title: 'Incorrect password',
        text: `This account belongs to: ${foundUser.name}`,
        icon: 'warning'
      });
      return;
    }

    if (!foundUser.isActive) {
      Swal.fire({
        title: 'Account Deactivated',
        text: 'Please contact your administrator.',
        icon: 'error'
      });
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(foundUser));
    UserMessageEntries(foundUser);

    if (foundUser.isAdmin || foundUser.isSuperAdmin) {
      Swal.fire({
        title: `Welcome Admin ${foundUser.name}`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        window.location.href = `${window.location.origin}/admin.html`;
      }, 1600);
    } else {
      Swal.fire({
        title: `Welcome, ${foundUser.name}`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        window.location.href = `${window.location.origin}/diary.html`;
      }, 1000);
    }
  });
}
