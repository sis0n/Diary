import { getUsers, addUser } from './user.js';
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
  document.getElementById('signup-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.querySelector('.js-name-input').value.trim();
    const username = document.querySelector('.js-username-input').value.trim();
    const password = document.querySelector('.js-password-input').value;
    const confirmPassword = document.querySelector('.js-confirm-password-input').value;

    const users = getUsers();

    if (
      !nameValidation(name) || !usernameValidation(username, users) || !passwordValidation(password, confirmPassword)
    ) {
      return;
    }

    if (name.toLowerCase() === username.toLowerCase()) {
      Swal.fire({
        title: 'Invalid Entry',
        text: 'Name and Username cannot be the same.',
        icon: 'warning'
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
      window.location.href = `${window.location.origin}/login.html`;
    }, 1600);
  });
}

function passwordValidation(password, confirmPassword) {
  if (!password || !confirmPassword) {
    Swal.fire({
      title: 'Missing Fields',
      text: 'All fields are required!',
      icon: 'warning'
    });
    return false;
  }

  if (password !== confirmPassword) {
    Swal.fire({
      title: 'Password Mismatch',
      text: 'Passwords do not match.',
      icon: 'warning'
    });
    return false;
  }

  return true;
}

function nameValidation(name) {
  if (!name) {
    Swal.fire({
      title: 'Missing Fields',
      text: 'All fields are required!',
      icon: 'warning'
    });
    return false;
  }

  if (/\d/.test(name)) {
    Swal.fire({
      title: 'Invalid Name',
      text: 'Name must only contain letters!',
      icon: 'warning'
    });
    return false;
  }

  if (name.length > 10) {
    Swal.fire({
      title: 'Too Long',
      text: 'Name must be between 1 and 10 letters',
      icon: 'warning'
    });
    return false;
  }

  return true;
}

function usernameValidation(username, users) {
  if (!username) {
    Swal.fire({
      title: 'Missing Fields',
      text: 'All fields are required!',
      icon: 'warning'
    });
    return false;
  }

  if (username.length < 8) {
    Swal.fire({
      title: 'Too Short',
      text: 'Username should be 8 characters or more.',
      icon: 'warning'
    });
    return false;
  }

  const usernameTaken = users.some(user => user.username.toLowerCase() === username.toLowerCase());
  if (usernameTaken) {
    Swal.fire({
      title: 'Username Taken',
      text: `The username "${username}" is already in use.`,
      icon: 'error'
    });
    return false;
  }

  return true;
}