import { getUsers, addUser } from './user.js';

export function usernameValidation(username, usernameLength) {
  const usernameTaken = users.some(user => user.username.toLowerCase() === username.toLowerCase());

  const users = getUsers();

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

export function passwordValidation(password, confirmPassword) {
  if (password !== confirmPassword) {
    Swal.fire({
      title: 'Password Mismatch',
      text: 'Passwords do not match.',
      icon: 'warning'
    });
    return;
  }
  if (!password || !confirmPassword) {
    Swal.fire({
      title: 'Missing Fields',
      text: 'All fields are required!',
      icon: 'warning'
    });
    return;
  }
}

export function nameValidation(name) {
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