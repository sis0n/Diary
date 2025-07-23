import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { entry } from './data.js';
import { getCurrentUser } from './auth.js';

const welcomeTitle = document.querySelector('.welcome-title');

const adminControls = document.querySelector('.admin-controls');

const currentUser = getCurrentUser();

// document.addEventListener('DOMContentLoaded', () => {
//   if (!currentUser){
//     setTimeout(() => {
//       document.body.style.display = 'block';
//       document.getElementById('loader').style.display = 'none';
//       document.getElementById('admin-content').style.display = 'block';
//       userNotFound();
//     }, 2000);
//   } else {
//     window.history.back();
//   }
// });

document.addEventListener('DOMContentLoaded', () => {
  if(!currentUser) {
    setTimeout(() => {
      const referrer = document.referrer;

      if(window.history.length > 1) {
        window.history.back();
      }
      else if (referrer && referrer !== window.location.href) {
        setTimeout(() => {
          window.location.href = 'diary.html';
        }, 100);
      }
      else {
        window.location.href = window.location.origin + '/login.html';
      }
    }, 1000);
  } else {
    document.body.style.display = 'block';
    document.getElementById('loader').style.display = 'none';
    document.getElementById('admin-content').style.display = 'block';

    if (welcomeTitle) {
      welcomeTitle.innerHTML = `Hi, ${currentUser.name}`;
    }
  }
});

if (currentUser && currentUser.isAdmin && adminControls || currentUser.isSuperAdmin) {
  const adminBtn = document.createElement('button');
  adminBtn.classList.add('admin-button');
  adminBtn.textContent = 'Manage Users';
  adminBtn.addEventListener('click', () => {
    const loc = window.location.origin  + '/admin.html'; 
    window.location.href = loc;
  });
  adminControls.appendChild(adminBtn);
}

// if (!currentUser) {
//   const loc = window.location.origin + '/login.html' 
//   window.location.href = loc;
// } else if(welcomeTitle) {
//   welcomeTitle.innerHTML = `Hi, ${currentUser.name}`;
// }

document.querySelector('.submit-button')
  .addEventListener('click', () => {
    const date = dayjs();
    const currentDate = date.format('YYYY-MM-DD, HH:mm:ss');

    const inputMessage = document.querySelector('.js-message-input');
    const inputTitleMessage = document.querySelector('.js-title-message-input');
    const messageText = inputMessage.value.trim();
    const titleText = inputTitleMessage.value.trim();

    if (messageText === '' || titleText === ''){
      Swal.fire('you need to enter a message or a title message');
      return;
    } 
      
    const messageObject = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      title: titleText,
      username: currentUser.username,
      name: currentUser.name,
      message: messageText,
      date: currentDate
    };

    entry.unshift(messageObject);

    setTimeout(() => {
      location.reload();
      // displayMessage();
    }, 1000);
    
    saveToStorage();

    inputTitleMessage.value = '';
    inputMessage.value = '';
    
  });

function saveToStorage() {
  localStorage.setItem('entry', JSON.stringify(entry));
}

function displayMessage() {
  const inputedMessage = document.querySelector('.inputed-message');
  inputedMessage.innerHTML = '';

  let userHasMessage = false;

  entry.forEach((messageObject) => {
    if(messageObject.username === currentUser.username) {
      userHasMessage = true;
      inputedMessage.innerHTML += `
        <div class="message-entry">
          <h3 class="message-title">${messageObject.title}</h3>
          <p class="main-message">${messageObject.message}</p>
          <small>${messageObject.date}</small>
        </div><hr>`;
    }
  });

  if(!userHasMessage) {
    inputedMessage.innerHTML = `
      <div class="no-entry-message">
        No messages yet. Be the first to write something
      </div>
    `;
  }
}

displayMessage();

document.querySelector('.logout-button')
  .addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    const loc = window.location.origin + '/login.html'
    window.location.href = loc;
  });