const searchBtn = document.getElementById('searchBtn')

searchBtn.addEventListener('click',() =>{
    const city = document.getElementById('cityInput').value;
   
    document.getElementById('error').style.display = 'none';
    //show the spinner
        const loading = document.getElementById('loading');
        loading.style.display = 'block';
    setTimeout(() =>{
        fetchWeather(city)
            .then(data =>{
        // console.log(data)
        //Populate the weather results
        //function to update card background
            const temperature = data.main.temp;

            document.getElementById('cityName').innerText = data.name;
            document.getElementById('temperature').innerText = temperature;
            document.getElementById('weather').innerText = data.weather[0].description;
            document.getElementById('humidity').innerText = data.main.humidity;
            document.getElementById('wind').innerText = data.wind.speed;
    
            document.getElementById('weather-details').style.display = 'block';
            updateCardBackground(temperature);
    
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
    },1000)

    //fetch details from API
    
})

function fetchWeather(city){

    const apiKey = 'befd984de4d3c050671d4eb935e6c660'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return fetch(url)
    .then(response => {
        if(!response.ok){
            throw new Error('City not found')
        }
        return response.json()
    })
}

function updateCardBackground(temperature) {
    const weatherDetails = document.getElementById('weather-details');

    console.log(temperature);
    
    weatherDetails.classList.remove('sunny', 'cloudy', 'rainy','default-background');

    
    if (temperature > 30) {
        weatherDetails.classList.add('sunny');
    } else if (temperature >= 20 && temperature <= 30) {
        weatherDetails.classList.add('cloudy');
    } else if (temperature < 20) {
        weatherDetails.classList.add('rainy');
    }else {
        weatherDetails.classList.add('default-background');
    }
    
}