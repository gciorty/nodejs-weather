console.log('Client side js file loaded')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')

// msgOne.textContent = 'From js!'

weatherForm.addEventListener('submit', (e) => {
    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    e.preventDefault()
    const location = searchElement.value
    fetch('http://localhost:3000/weather?address=' + location ).then((response) => {
        response.json().then((data) => {
            if (data.error){
                msgOne.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = data.forecast
            }
        })
    })  

    console.log(location)
})