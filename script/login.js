import { getUsers } from './user.js';
import { UserMessageEntries } from './data.js';

let foundUser = null;

document.querySelector('.submit-button')
  .addEventListener('click', (event) => {
    event.preventDefault();

    const inputUsername = document.querySelector('.js-name-input').value;
    const inputPass = document.querySelector('.js-password-input').value;

    const users = getUsers();

    users.forEach((user) => {
      if(user.username === inputUsername && user.password === inputPass){
        foundUser = user;
      }
    });
    if(!foundUser) {
      let matchedUser = null;

      users.forEach(user => {
        if (user.username === inputUsername) {
          matchedUser = user;
        }
      });

      if (matchedUser) {
        Swal.fire({
          title: 'incorrect password',
          text: `this account belongs to: ${matchedUser.name}`,
          icon: 'warning'
        });
      } else {
        Swal.fire({
          title: 'user not found',
          text: `no account with username "${inputUsername}" exists`,
          icon: 'warning'
        });
      }
      return;
    }

      console.log(`Welcome, ${foundUser.name}`);

      UserMessageEntries(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));

      const loc = window.location.origin + '/Diary/index.html'; 
      window.location.href = loc;
  });

