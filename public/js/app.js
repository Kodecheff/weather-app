console.log('Hello there!');

const weatherForm = document.querySelector('form');
let address = document.getElementById('input');
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let location = address.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json()
    .then((res) => {
    if(res.error) {
      // return console.log(res.error)
      return messageOne.textContent = res.error
    }else {
      messageOne.textContent = res.Data;
      messageTwo.textContent = res.Location;
    }
    })
  })

})