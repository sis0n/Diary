import { getUsers, addUser } from './user.js';

document.querySelector('.submit-button')
  .addEventListener('click', (event) => {
    event.preventDefault();

    const inputName = document.querySelector('.js-name-input').value;
    const inputUsername = document.querySelector('.js-username-input').value;
    const inputPassword = document.querySelector('.js-password-input').value;
    // const inputPasswordLength = inputPassword.length;
    const inputConfirmPassword = document.querySelector('.js-confirm-password-input').value;


    if (inputName === '' || inputUsername === '' || inputPassword === '' || inputConfirmPassword === ''){
      Swal.fire({
        title: 'ERROR !!',
        text: 'all fields are required: NAME, USERNAME, and PASSWORD.',
        icon: 'warning'
      });
      return;
    } 

    if(inputName === inputUsername){
      Swal.fire('You cannot put the same input in your NAME and USERNAME');
    } else {
      if (inputPassword === inputConfirmPassword) {
        const userObject = {
          id: getUsers().length + 1,
          name: inputName,
          username: inputUsername,
          password: inputPassword
        };

        addUser(userObject);
        

        Swal.fire({
          title: 'CONGRATS !!',
          text: 'Account created successfully!',
          icon: 'success'
        });
        setTimeout(() => {
          window.location.href = '../login.html';
        }, 1000);
      } else {
          Swal.fire('Passwords do not match', 'error');
        }
    }
  });