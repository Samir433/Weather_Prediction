document.addEventListener("DOMContentLoaded", function () {
    const locationInput = document.getElementById("locationInput");
    const getWeatherButton = document.getElementById("getWeatherButton");
    const weatherInfo = document.getElementById("weatherInfo");

    getWeatherButton.addEventListener("click", () => {
        const location = locationInput.value;

        // Replace with your OpenWeatherMap API key
        const apiKey = "3923455d775630c10dfc2e9a327f6663";
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Clear previous weather information
                weatherInfo.innerHTML = "";

                let currentDate = null;

                // Iterate through the forecast data
                data.list.forEach((forecast) => {
                    const date = new Date(forecast.dt * 1000);
                    const day = date.toLocaleDateString("en-US", { weekday: "long" });

                    // Check if this forecast is for a new day
                    if (currentDate !== day) {
                        const temperatureCelsius = forecast.main.temp - 273.15;
                        const description = forecast.weather[0].description;
                        const rainChance = (forecast.pop || 0) * 100; // Probability of precipitation in percentage
                        const cloudCover = forecast.clouds.all;
                        const windSpeed = forecast.wind.speed;

                        // Create a card element to display the daily weather information
                        const card = document.createElement("div");
                        card.classList.add("weather-card");

                        // Populate the card with weather data
                        card.innerHTML = `
                            <h2>${day}</h2>
                            <p>Description: ${description}</p>
                            <p>Temperature: ${temperatureCelsius.toFixed(2)}°C</p>
                            <p>Rain Chance: ${rainChance}%</p>
                            <p>Cloud Cover: ${cloudCover}%</p>
                            <p>Wind Speed: ${windSpeed} m/s</p>
                        `;

                        // Append the card to the weatherInfo container
                        weatherInfo.appendChild(card);

                        // Update the current date
                        currentDate = day;
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                weatherInfo.innerHTML = "Error fetching weather data. Please try again.";
            });
    });
});
