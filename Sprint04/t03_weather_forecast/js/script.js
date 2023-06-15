const forecastEl = document.getElementById('forecast');

const cityEl = document.createElement('div');
cityEl.className = 'city';
const cityText = document.createElement('h2');
cityText.textContent = 'Kharkiv';
cityEl.appendChild(cityText);
forecastEl.appendChild(cityEl);

fetch('http://api.weatherapi.com/v1/forecast.json?key=7da265eadce9413ebff151511233105&q=Kharkiv&days=5&aqi=no&alerts=no').then(response => response.json())
.then(data => {
    const days = data.forecast.forecastday;
    days.forEach(forDay => {
        const date = forDay.date;
        const temp = forDay.day.avgtemp_c;
        const cond = forDay.day.condition.text;
        const imgD = forDay.day.condition.icon;

        const forDayElem = document.createElement('div');
        forDayElem.className = 'day';

        const dateEl = document.createElement('p');
        dateEl.textContent = date;
        dateEl.className = 'date';
        forDayElem.appendChild(dateEl);

        const iconEl = document.createElement('img');
        iconEl.src = 'https:' + imgD;
        iconEl.alt = cond;
        forDayElem.appendChild(iconEl);

        const tempElem = document.createElement('p');
        tempElem.textContent = temp + '°C';
        forDayElem.appendChild(tempElem);

        forecastEl.appendChild(forDayElem);
    });
})