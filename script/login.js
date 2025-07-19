import { getUsers } from './user.js';
import { UserMessageEntries } from './data.js';
import { getCurrentUser } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const loc = window.location.origin + '/diary.html'; 
    window.location.href = loc;
  } else {
    userNotFound();
  }
});

function userNotFound() {
  document.querySelector('.submit-button').addEventListener('click', (event) => {
    event.preventDefault();

    let matchedUser = null;
    let foundUser = null;

    const inputUsername = document.querySelector('.js-name-input').value.trim();
    const inputPass = document.querySelector('.js-password-input').value;

    const users = getUsers();

    users.forEach((user) => {
      if (user.username === inputUsername && user.password === inputPass) {
        foundUser = user;
      }
    });

    if (foundUser && foundUser.isActive === false) {
      Swal.fire({
        title: 'Account deactivated',
        text: 'Please contact your administrator.',
        icon: 'error'
      });
      return;
    }

    if (!foundUser) {
      users.forEach(user => {
        if (user.username === inputUsername) {
          matchedUser = user;
        }
      });

      if (matchedUser) {
        Swal.fire({
          title: 'Incorrect password',
          text: `This account belongs to: ${matchedUser.name}`,
          icon: 'warning'
        });
      } else {
        Swal.fire({
          title: 'User not found',
          text: `No account with username "${inputUsername}" exists.`,
          icon: 'warning'
        });
      }
      return;
    }

    if (foundUser.isAdmin || foundUser.isSuperAdmin) {
      Swal.fire({
        title: `Welcome Admin ${foundUser.name}`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        UserMessageEntries(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        const loc = window.location.origin + '/admin.html';
        window.location.href = loc;
      }, 1600);
      return;
    }

    Swal.fire({
      title: `Welcome, ${foundUser.name}`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    setTimeout(() => {
      UserMessageEntries(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));

      const loc = window.location.origin + '/diary.html';
      window.location.href = loc;
    }, 1000);
  });
}