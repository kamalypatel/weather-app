function getForecastCoordinates() {
    navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude
    let longitude = position.coords.longitude

        fetch(`https://api.weatherapi.com/v1/forecast.json?key=1b6e3493db6147c3bc5155935242605&q=${latitude},${longitude}&days=7`, {mode: 'cors'})
        .then(function(response) {
        return response.json()
        })
        .then(function(response) {
            console.log(response)
            displayForecast(response)
        })
    })
}

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
    let currentDisplay = document.querySelector('.current-weather')
    currentDisplay.innerHTML = ''

    let city = document.createElement('p')
    city.innerHTML = `${response.location.name}`
    city.classList.add('city-name')

    let currentCondition = document.createElement('p')
    currentCondition.innerHTML = `${response.current.condition.text}`
    currentCondition.classList.add('current-condition')

    let conditionCurrentDisplay = document.createElement('img')
    conditionCurrentDisplay.setAttribute('src', `https:${response.current.condition.icon}`)
    conditionCurrentDisplay.classList.add('currentConditionIcon')

    let currentTemp = document.createElement('p')
    currentTemp.innerHTML = `${response.current.temp_f}°`
    currentTemp.classList.add('current-temp')
    
    currentDisplay.appendChild(city)
    currentDisplay.appendChild(currentCondition)
    currentDisplay.appendChild(conditionCurrentDisplay)
    currentDisplay.appendChild(currentTemp)



    let display = document.querySelector('.display-forecast')
    display.innerHTML = ''

    response.forecast.forecastday.forEach(function(day) {
        let dayDisplay = document.createElement('div')
        dayDisplay.classList.add('forecast-day')

        let date = new Date(day.date_epoch *1000).getDate()
        let avgTemp = day.day.avgtemp_f

        let dateDisplay = document.createElement('p')
        dateDisplay.innerHTML = `${date}`
        dateDisplay.classList.add('forecast-date)')

        let conditionDisplay = document.createElement('img')
        conditionDisplay.setAttribute('src', `https:${day.day.condition.icon}`)
        conditionDisplay.classList.add('condition')

        let tempDisplay = document.createElement('p')
        tempDisplay.innerHTML = `${avgTemp}°`
        tempDisplay.classList.add('temp')

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

if ("geolocation" in navigator) {
    getForecastCoordinates()
}