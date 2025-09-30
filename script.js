// const weatherInput = document.getElementById("cityInput");
// const weatherButton = document.getElementById("fetchButton");
// const weatherResult = document.getElementById("weatherResult");

// weatherButton.addEventListener("click", () => {
//     const city = weatherInput.value;
//     fetchWeather(city);
//     weatherInput.value = "";

// });

// async function fetchWeather(city) {
//     try {
//         const apiKey = "58187a9aba880c8153f3298cc39a9615";
//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//         const res = await fetch(url);
//         weatherResult.style.display = "block";
//         const data = await res.json();
//         console.log(data);
//         renderWeather(data);
//     }
//     catch (error) {
//         console.error("Error fetching weather data:", error);
//     } finally {
//         console.log("Fetch attempt finished.");
//     }
// }

// function renderWeather(data) {
//         weatherResult.innerHTML = `
//             <h2> 🌤 Weather in ${data.name}, ${data.sys.country}</h2>
//             <p>🌡 Temperature: ${data.main.temp} °C</p>
//             <p>☁️ Weather: ${data.weather[0].description}</p>
//             <p>💧 Humidity: ${data.main.humidity}%</p>
//             <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
//             <p>⚡  Pressure: ${data.main.pressure} hPa</p>
//             <p>👁 Visibility: ${data.visibility} meters</p>
//             <p>☁ Cloudiness: ${data.clouds.all}%</p>
//             <p>🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
//             <p>🌇Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            
//         `;
//         // weatherResult.classList.remove("hidden");
   
// }


const weatherInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("fetchButton");
const weatherResult = document.getElementById("weatherResult");

weatherButton.addEventListener("click", () => {
    const city = weatherInput.value.trim();
    if(city) fetchWeather(city);
    weatherInput.value = "";
});

async function fetchWeather(city) {
    try {
        const apiKey = "58187a9aba880c8153f3298cc39a9615";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);
        if(!res.ok) throw new Error("City not found!");
        const data = await res.json();

        weatherResult.style.display = "block";
        renderWeather(data);
        setBackground(data.weather[0].main);

    } catch (error) {
        weatherResult.innerHTML = `<p style="color:#ff6b6b;">Error: ${error.message}</p>`;
        console.error(error);
    }
}

function renderWeather(data) {
    weatherResult.innerHTML = `
        <h2>🌤 Weather in ${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind Speed: ${data.wind.speed} m/s</p>
        <p>⚡ Pressure: ${data.main.pressure} hPa</p>
        <p>👁 Visibility: ${data.visibility} meters</p>
        <p>☁ Cloudiness: ${data.clouds.all}%</p>
        <p>🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
        <p>🌇 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
    `;
}

// Background & Animations
function setBackground(weather) {
    // Remove existing raindrops/snowflakes
    document.querySelectorAll('.raindrop, .snowflake').forEach(el => el.remove());

    const body = document.body;

    if(weather === "Clear") {
        body.style.background = "linear-gradient(to right, #fbc2eb, #a6c1ee)";
    } 
    else if(weather === "Clouds") {
        body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
    } 
    else if(weather === "Rain") {
        body.style.background = "linear-gradient(to right, #4b79a1, #283e51)";
        createRain();
    } 
    else if(weather === "Snow") {
        body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)";
        createSnow();
    } 
    else {
        body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    }
}

function createRain() {
    for(let i=0; i<100; i++){
        const drop = document.createElement('div');
        drop.classList.add('raindrop');
        drop.style.left = Math.random() * window.innerWidth + "px";
        drop.style.animationDuration = 0.5 + Math.random() * 0.5 + "s";
        document.body.appendChild(drop);
    }
}

function createSnow() {
    for(let i=0; i<50; i++){
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.textContent = "❄️";
        flake.style.left = Math.random() * window.innerWidth + "px";
        flake.style.fontSize = 10 + Math.random() * 20 + "px";
        flake.style.animationDuration = 3 + Math.random() * 2 + "s";
        document.body.appendChild(flake);
    }
}
