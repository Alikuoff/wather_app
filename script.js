const API = '9e11ad4fdb134d73bb644126241312';
const city = 'Tashkent';
const container = document.querySelector('.container');
const forecastDays = document.querySelector('.forecast-container');
const hourlyForecast = document.querySelector('.hourly-forecast');
const dailyForecast = document.querySelector('.daily-forecast');
// shahar o'zgarishi
const cities = [
  "Tashkent",
  "New York City",
  "Tokyo",
  "London",
  "Los Angeles",
  "Paris",
  "Shanghai",
  "Berlin",
  "Mexico City",
  "Sydney",
  "Mumbai",
  "Seoul",
  "São Paulo",
  "Dubai",
  "Rio de Janeiro",
  "Istanbul",
  "Buenos Aires",
  "Moscow",
  "Bangkok",
  "Cairo",
  "Lagos"
];
const citySelect = document.getElementById('city-select');
cities.forEach(city => {
  citySelect.innerHTML += `<option value="${city}">${city}</option>`;
});
function getWeather(city) {
  axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API}&q=${city}&days=7`)
    .then(response => {
      const data = response.data;
      const location = data.location;
      const current = data.current;
      const forecastDays = data.forecast.forecastday;
      const time = new Date(location.localtime_epoch * 1000);

      document.getElementById('day-name').innerText = time.toLocaleDateString('en-US', { weekday: 'long' });
      document.getElementById('date').innerText = time.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
      document.getElementById('location').innerText = `${location.name}, ${location.country}`;
      document.getElementById('condition-icon').src = current.condition.icon;
      document.getElementById('temperature').innerText = `${current.temp_c}°C`;
      document.getElementById('condition').innerText = current.condition.text;
      document.getElementById('precipitation').innerText = `${current.precip_mm} mm`;
      document.getElementById('humidity').innerText = `${current.humidity}%`;
      document.getElementById('wind').innerText = `${current.wind_kph} km/h`;

      const dailyForecastContainer = document.querySelector('.daily-forecast');
      dailyForecastContainer.innerHTML = ''; 
// kunlik prognozlarni ko'rsatish
      forecastDays.forEach(day => {
        const date = new Date(day.date);
        const dailyItem = document.createElement('div');
        dailyItem.className = 'daily-forecast-item';
        dailyItem.innerHTML = `
          <h4>${date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</h4>
          <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
          <p>${day.day.avgtemp_c}°C</p>
        `;
        dailyItem.onclick = () => showHourlyForecast(day.hour);
        dailyForecastContainer.appendChild(dailyItem);
      });
// har 4 soatda bir marta ko'rsatish
      document.getElementById('toggle-temp').onclick = () => {
        const tempElement = document.getElementById('temperature');
        const currentTemp = parseFloat(tempElement.innerText);
        const isCelsius = tempElement.innerText.includes('°C');
        const newTemp = isCelsius ? (currentTemp * 9/5) + 32 : (currentTemp - 32) * 5/9;
        tempElement.innerText = `${newTemp.toFixed(1)}°${isCelsius ? 'F' : 'C'}`;
      };
    })
    .catch(error => console.error('Error fetching weather data:', error));
}
// har 4 soatda bir marta ko'rsatish
function showHourlyForecast(hours) {
  const hourlyForecastContainer = document.querySelector('.hourly-forecast');
  hourlyForecastContainer.innerHTML = ''; 
  hours.forEach((hour, index) => {
    if (index % 3 === 0) { 
      const time = new Date(hour.time_epoch * 1000);
      const hourlyItem = document.createElement('div');
      hourlyItem.className = 'hourly-forecast-item';
      hourlyItem.innerHTML = `
        <h4>${time.getHours()}:00</h4>
        <img src="${hour.condition.icon}" alt="${hour.condition.text}">
        <p>${hour.temp_c}°C</p>
      `;
      hourlyForecastContainer.appendChild(hourlyItem);
    }
  });
}
getWeather('Tashkent');
// shahar o'zgarishi
citySelect.addEventListener('change', (e) => {
  getWeather(e.target.value);
});



