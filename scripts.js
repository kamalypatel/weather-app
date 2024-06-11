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
        displayForecast(response)
    })
    }
}

function displayForecast(response) {
    let display = document.querySelector('.display-forecast')
    display.innerHTML = ''

    response.forecast.forecastday.forEach(function(day) {
        let dayDisplay = document.createElement('div')
        dayDisplay.classList.add('forecast-day')

        let date = new Date(day.date_epoch *1000).toLocaleDateString()
        let avgTemp = day.day.avgtemp_f

        let dateDisplay = document.createElement('p')
        dateDisplay.innerHTML = `${date}`

        let conditionDisplay = document.createElement('img')
        conditionDisplay.setAttribute('src', `https:${day.day.condition.icon}`)

        let tempDisplay = document.createElement('p')
        tempDisplay.innerHTML = `${avgTemp}°F`

        dayDisplay.appendChild(dateDisplay)
        dayDisplay.appendChild(conditionDisplay)
        dayDisplay.appendChild(tempDisplay)
        display.appendChild(dayDisplay)
    })
}

let locationInput = document.querySelector('.location-input')
const button = document.querySelector('.location-button')
button.addEventListener('click', function() {
    getForecast(locationInput.value)
})