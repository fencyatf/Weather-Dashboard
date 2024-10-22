const searchBtn = document.getElementById('searchBtn')

searchBtn.addEventListener('click',() =>{
    const city = document.getElementById('cityInput').value;
   
    document.getElementById('error').style.display = 'none';
    //show the spinner
    const loading = document.getElementById('loading');
    loading.style.display = 'block';

    //fetch details from API
    fetchWeather(city)
    .then(data =>{
        // console.log(data)
        //Populate the weather results
        //function to update card background
        updateCardBackground(data.weather[0].main);
    })
    .catch(err =>{
        //handle display of error msg
        document.getElementById('error').innerText = err.message;
        document.getElementById('error').style.display = 'block';
        document.getElementById('weather-details').style.display = 'none';

    })
    .finally(()=>{
        //Stop the spinner
        loading.style.display = 'none';
    })
})

function fetchWeather(city){

    const apiKey = 'befd984de4d3c050671d4eb935e6c660'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    return fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error('City not found')
        }
        return response.json()
    })
    .then(data =>{
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temperature').innerText = Math.round((data.main.temp - 273.15).toFixed(2));
        document.getElementById('weather').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('wind').innerText = data.wind.speed;

        document.getElementById('weather-details').style.display = 'block';
        return data;
    })
}

function updateCardBackground(weatherMain) {
    const weatherDetails = document.getElementById('weather-details');

    console.log(weatherMain);
    
    weatherDetails.classList.remove('sunny', 'cloudy', 'rainy','default-background');

    
    if (weatherMain === 'Clear') {
        weatherDetails.classList.add('sunny');
    } else if (weatherMain === 'Clouds') {
        weatherDetails.classList.add('cloudy');
    } else if (weatherMain === 'Rain') {
        weatherDetails.classList.add('rainy');
    }else {
        weatherDetails.classList.add('default-background');
    }
    
}