<template>
    <div class="container">
        <div class="header">
            <h1>WEATHER APP</h1>
            <div class="search-bar">
                <input 
                type="text"
                v-model="city"
                placeholder="Enter city name"
                class="search-input"
                />
                <button @click="searchByCity"
                        class="search-button">Search</button>
            </div>
        </div>
        <main>
        <div v-if="weatherData" style="text-align: center;"> 
          <h2>
              {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
</template>

<script>
import axios from "axios";

const apikey = "aa601dcfb383840afc66508ae1150e98";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273.15)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : null;
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
          await this.fetchWeatherData(url);
        });
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    },
    async searchByCity() {
      const cityInput = this.city.trim();
      let url;
      if (cityInput.includes(',')) {
      const [cityName, countryCode] = cityInput.split(',').map(part => part.trim());
      url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=${apikey}`;
      } else {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apikey}`;
      }
  
      await this.fetchWeatherData(url);
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.header {
  text-align: center;
}

.search-bar {
  display: flex;
  margin-top: 20px;
}

.search-input {
  padding: 10px;
  margin-right: 10px;
}

.search-button {
  padding: 10px;
}

main {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
</style>