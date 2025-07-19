import { getUsers, addUser } from './user.js';
import { currentUser } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  if(!currentUser){
    userNotFound();
  } else {
    const loc = window.location.origin  + '/Diary/diary.html'; 
    window.location.href = loc;
  }
});

function userNotFound() {
  document.getElementById('signup-form')
    .addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.querySelector('.js-name-input').value.trim();
      const username = document.querySelector('.js-username-input').value.trim();
      const password = document.querySelector('.js-password-input').value;
      const confirmPassword = document.querySelector('.js-confirm-password-input').value;

      const alphaerr = 'must only contain letters !';
      const lengtherr = 'must be between 1 and 10 letters'

      const usernameLength = username.length;


      const users = getUsers();
      
      passwordValidation(password, confirmPassword);
      usernameValidation(username, usernameLength, users)
      nameValidation(name);
      
      //validation for characters inputed

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

      const newUser = {
        id: crypto.randomUUID(),
        name,
        username,
        password,
        isAdmin: false,
        isSuperAdmin: false,
        isActive: true
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
        const loc = window.location.origin + '/Diary/login.html';
        window.location.href = loc;
      }, 1600);
    });

    
}

function passwordValidation(password, confirmPassword) {
  if (password !== confirmPassword) {
    Swal.fire({
      title: 'Password Mismatch',
      text: 'Passwords do not match.',
      icon: 'warning'
    });
    return;
  }

  // if(password === password.toLowerCase()){
  //   Swal.fire({
  //     title: 'Password error',
  //     text: 'pass',
  //     icon: 'warning'
  //   });
  //   return;
  // }
}

    

function nameValidation(name) {
  const nameLength = name.length;
  const hasNumber = /\d/.test(name);

  if(hasNumber) {
    Swal.fire({
      title: 'ANO YAN!',
      text: `${alphaerr}`,
      icon: 'warning'
    });
    return;
  } 

  if (!name) {
    Swal.fire({
      title: 'Missing Fields',
      text: 'All fields are required!',
      icon: 'warning'
    });
    return;
  }

  if(nameLength <= 10) {
    Swal.fire({
      title: 'too short',
      text: 'must be between 1 and 10 letters',
      icon: 'warning'
    });
    return;
  }

}

function usernameValidation(username, usernameLength, users) {
  const usernameTaken = users.some(user => user.username.toLowerCase() === username.toLowerCase());


  if (usernameTaken) {
    Swal.fire({
      title: 'Username Taken',
      text: `The username "${username}" is already in use.`,
      icon: 'error'
    });
    return;
  }
  if(usernameLength <= 8) {
    Swal.fire({
      title: 'too short',
      text: 'username should be 8 char and above',
      icon: 'warning'
    });
    return;
  }

  if (!username) {
    Swal.fire({
      title: 'Missing Fields',
      text: 'All fields are required!',
      icon: 'warning'
    });
    return;
  }
}

  