async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey ='6e8b480980829c0a65f0c9ac5986b1cd';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert('Error fetching weather data');
    }
}

function displayWeather(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    const days = {};

    data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0];
        if (!days[date]) {
            days[date] = [];
        }
        days[date].push(item);
    });

    Object.keys(days).slice(0, 5).forEach(date => {
        const dayData = days[date][0];
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        
        const dateElem = document.createElement('div');
        dateElem.className = 'date';
        dateElem.innerText = new Date(date).toLocaleDateString();
        
        const tempElem = document.createElement('div');
        tempElem.className = 'temp';
        tempElem.innerText = `${Math.round(dayData.main.temp)}°C`;
        
        const iconElem = document.createElement('img');
        iconElem.className = 'icon';
        iconElem.src = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;
        
        const descriptionElem = document.createElement('div');
        descriptionElem.className = 'description';
        descriptionElem.innerText = dayData.weather[0].description;

        forecastDay.appendChild(dateElem);
        forecastDay.appendChild(tempElem);
        forecastDay.appendChild(iconElem);
        forecastDay.appendChild(descriptionElem);

        forecastContainer.appendChild(forecastDay);
    });
}
