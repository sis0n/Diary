export let entry = JSON.parse(localStorage.getItem('entry')) || [];


export function UserMessageEntries(user) {
  const userEntries = [];
  entry.forEach((message) => {
    if(message.username === user.username){
      userEntries.push(message);
    }
  });
  user.entries = userEntries;
}