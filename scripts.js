fetch('https://api.weatherapi.com/v1/current.json?key=1b6e3493db6147c3bc5155935242605&q=london', {mode: 'cors'})
    .then(function(response) {
       return response.json()
    })
    .then(function(response) {
        console.log(response)
    })