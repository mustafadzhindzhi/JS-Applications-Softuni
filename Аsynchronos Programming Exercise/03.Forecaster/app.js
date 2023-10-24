function attachEvents() {
    const locationInputElement = document.getElementById('location');
    const getWeatherButtonElement = document.getElementById('submit');
    const forecastDivElement = document.getElementById('forecast');
    const currentDivElement = document.getElementById('current');
    const upcomingDivElement = document.getElementById('upcoming');

    const divElement = document.createElement('div');
    divElement.classList = 'forecasts';
    const divInfoElement = document.createElement('div');
    divInfoElement.classList = 'forecast-info';

    getWeatherButtonElement.addEventListener('click', getWeather);

    const symbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°',
    };

    function getWeather() {
        if (locationInputElement.value.length === 0) {
            return;
        }

        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        forecastDivElement.style.display = 'block';

        divElement.replaceChildren();
        divInfoElement.replaceChildren();

        fetch(url)
            .then(response => {
                if (response.ok === false) {
                    throw new Error('Error');
                }

                return response.json();
            })
            .then(data => {
                const location = data.find(x => x.name === locationInputElement.value);
                const url = `http://localhost:3030/jsonstore/forecaster/today/${location.code}`;

                fetch(url)
                    .then(response => {
                        if (response.ok === false) {
                            throw new Error('Error');
                        }

                        return response.json();
                    })
                    .then(data => {
                        const url = `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`;
                        const cityName = data.name;
                        const [currentCondition, high, low] = Object.values(data.forecast);

                        const spanSymbolElement = document.createElement('span');
                        spanSymbolElement.classList = 'condition symbol';
                        spanSymbolElement.textContent = symbols[currentCondition];
                        divElement.appendChild(spanSymbolElement);

                        const conditionSpanElement = document.createElement('span');
                        conditionSpanElement.classList = 'condition';

                        const cityNameSpanElement = document.createElement('span');
                        cityNameSpanElement.classList = 'forecast-data';
                        cityNameSpanElement.textContent = cityName;
                        conditionSpanElement.appendChild(cityNameSpanElement);

                        const degreesSpanElement = document.createElement('span');
                        degreesSpanElement.classList = 'forecast-data';
                        degreesSpanElement.textContent = `${low}${symbols.Degrees}/${high}${symbols.Degrees}`;
                        conditionSpanElement.appendChild(degreesSpanElement);

                        const weatherSpanElement = document.createElement('span');
                        weatherSpanElement.classList = 'forecast-data';
                        weatherSpanElement.textContent = currentCondition;
                        conditionSpanElement.appendChild(weatherSpanElement);

                        divElement.appendChild(conditionSpanElement);
                        currentDivElement.appendChild(divElement);

                        fetch(url)
                            .then(response => {
                                if (response.ok === false) {
                                    throw new Error('Error');
                                }

                                return response.json();
                            })
                            .then(data => {
                                data.forecast.forEach(el => {
                                    const [condtion, high, low] = Object.values(el);

                                    const upcomingSpanElement = document.createElement('span');
                                    upcomingSpanElement.classList = 'upcoming';

                                    const symbolSpanElement = document.createElement('span');
                                    symbolSpanElement.classList = 'symbol';
                                    symbolSpanElement.textContent = symbols[condtion];
                                    upcomingSpanElement.appendChild(symbolSpanElement);

                                    const spanDegreesElement = document.createElement('span');
                                    spanDegreesElement.classList = 'forecast-data';
                                    spanDegreesElement.textContent = `${low}${symbols.Degrees}/${high}${symbols.Degrees}`;
                                    upcomingSpanElement.appendChild(spanDegreesElement);

                                    const spanWeatherElement = document.createElement('span');
                                    spanWeatherElement.classList = 'forecast-data';
                                    spanWeatherElement.textContent = condtion;
                                    upcomingSpanElement.appendChild(spanWeatherElement);

                                    divInfoElement.appendChild(upcomingSpanElement);
                                    upcomingDivElement.appendChild(divInfoElement);
                                });
                            })
                            .catch();
                    })
                    .catch();
            })
            .catch(() => {
                forecastDivElement.textContent = 'Error';
            });
    }
}

attachEvents();