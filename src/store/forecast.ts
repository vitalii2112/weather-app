import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import moment from 'moment'
import {
  getClosestWeatherData,
  getPopAndTime,
  type WeatherData,
  type Forecast
} from '@/utils/weather'

export const useForecastStore = defineStore('forecast', () => {
  const forecastData = ref<WeatherData>({ list: [], city: { timezone: 0, sunrise: 0, sunset: 0 } })
  const selectedDate = ref('')

  const selectDate = (date: string) => {
    selectedDate.value = date
  }

  const forecast = computed((): Forecast[] =>
    getClosestWeatherData(forecastData.value).map((item, index) => {
      const obj: Forecast = {
        dt_txt: item.dt_txt,
        temp: item.main.temp,
        realFeel: item.main.feels_like,
        weatherConditionId: item.weather?.[0]?.id || 0
      }
      if (index === 0) {
        obj.sunset = moment
          .unix(forecastData.value.city.sunset)
          .utcOffset(forecastData.value.city.timezone / 60)
          .toISOString()
        obj.sunrise = moment
          .unix(forecastData.value.city.sunrise)
          .utcOffset(forecastData.value.city.timezone / 60)
          .toISOString()
      } else {
        obj.humidity = item.main.humidity
        obj.wind = item.wind.speed
      }

      return obj
    })
  )

  const precipitation = computed(() => getPopAndTime(forecastData.value, selectedDate.value))

  const loadForecast = async (lat: number, lon: number): Promise<WeatherData> => {
    if (lat && lon) {
      try {
        const { data } = await axios.get<WeatherData>(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=25392cc844e33a6380df0cd63a9b935a`
        )
        if (data) {
          forecastData.value = data
          selectDate(getClosestWeatherData(data)[0].dt_txt)
        }
      } catch (e) {
        return { list: [], city: { timezone: 0, sunrise: 0, sunset: 0 } }
      }
    }
    return { list: [], city: { timezone: 0, sunrise: 0, sunset: 0 } }
  }

  return { forecast, loadForecast, selectedDate, selectDate, precipitation }
})
