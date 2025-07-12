import { getUsers, addUser } from './user.js';

document.getElementById('signup-form')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('.js-name-input').value.trim();
    const username = document.querySelector('.js-username-input').value.trim();
    const password = document.querySelector('.js-password-input').value;
    const confirmPassword = document.querySelector('.js-confirm-password-input').value;

    const alphaerr = 'must only contain letters !';

    const nameLength = name.length;
    const usernameLength = username.length;

    const hasNumber = /\d/.test(name);

    const users = getUsers();
    
    passwordValidation(password, confirmPassword);

    if(hasNumber) {
      Swal.fire({
        title: 'ANO YAN!',
        text: 'must only contain letters',
        icon: 'warning'
      });
      return;
    } 
    

    //validation for characters inputed
    if(nameLength <= 8 || usernameLength <= 8) {
      Swal.fire({
        title: 'too short',
        text: 'the name, username, and password should be 8 char and above',
        icon: 'warning'
      });
      return;
    }

    // validation for empty fields
    if (!name || !username || !password || !confirmPassword) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'All fields are required!',
        icon: 'warning'
      });
      return;
    }

    // validation for name and username should be different
    if (name.toLowerCase() === username.toLowerCase()) {
      Swal.fire({
        title: 'Invalid Entry',
        text: 'Name and Username cannot be the same.',
        icon: 'warning'
      });
      return;
    }


    // validation for username already exists
    const usernameTaken = users.some(user => user.username.toLowerCase() === username.toLowerCase());

    if (usernameTaken) {
      Swal.fire({
        title: 'Username Taken',
        text: `The username "${username}" is already in use.`,
        icon: 'error'
      });
      return;
    }

    // validation for all passed created user
    const newUser = {
      id: users.length + 1,
      name,
      username,
      password,
      isAdmin: false
    };

    addUser(newUser);

    Swal.fire({
      title: 'Account Created!',
      text: 'Redirecting to login',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });

    setTimeout(() => {
      const loc = window.location.origin  + '/Diary/login.html'; 
      window.location.href = loc;
    }, 1600);
  });

  function passwordValidation(password, confirmPassword) {
    if (password !== confirmPassword) {
      Swal.fire({
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        icon: 'warning'
      });
      return;
    }

    if(password === password.toLowerCase()){
      Swal.fire({
        title: 'Password error',
        text: 'pass',
        icon: 'warning'
      });
      return;
    }
  }

  