const weatherForm = document.querySelector('form');
let address = document.getElementById('input');
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');
let info = document.getElementById('search-info')
let region = document.querySelector('#region');
let latitude = document.querySelector('#lat');
let longitude = document.querySelector('#lon');
let time = document.querySelector('#time');

function infoAttr (){
  info.setAttribute('style', 'display:none')
}
infoAttr()

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  infoAttr()

  let location = address.value
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${location}`).then((response) => {
    response.json()
    .then((res) => {
    if(res.error) {
      // return console.log(res.error)
      return messageOne.textContent = res.error
    }else {
      messageOne.textContent = res.Data;
      region.textContent = res.Location
      latitude.textContent = res.latitude;
      longitude.textContent = res.longitude;
      time.textContent = res.time

      info.setAttribute('style', 'display:flex')
    }

    })
  })

})