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
          title: 'ACCOUNT CREATED !!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

        setTimeout(() => {
          const loc = window.location.origin + '/Diary/login.html';
          window.location.href = loc;
        }, 1000);
      } else {
          Swal.fire({
            title: 'PASSWORD DO NOT MATCH',
            icon: 'warning',
            timer: 1500,
            showConfirmButton: false
          });
        }
    }
  });