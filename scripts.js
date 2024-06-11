function getForecast (location) {
    if (location == '') {
        console.log('No location entered')
    } else {
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=1b6e3493db6147c3bc5155935242605&q=${location}&days=7`, {mode: 'cors'})
    .then(function(response) {
       return response.json()
    })
    .then(function(response) {
        console.log(response)
    })
    displayForecast()
    }
}

function displayForecast() {
    
}

let locationInput = document.querySelector('.location-input')
const button = document.querySelector('.location-button')
button.addEventListener('click', function() {
    getForecast(locationInput.value)
})