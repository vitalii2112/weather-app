import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import moment from 'moment'

export interface AirPollution {
  components: {
    co: number
    no: number
    no2: number
    o3: number
    so2: number
    pm2_5: number
    pm10: number
    nh3: number
  }
  dt: number
}

export const usePollutionStore = defineStore('pollution', () => {
  const airQuality = ref<AirPollution[]>([])

  const loadPollution = async (lat: number, lon: number, date: string) => {
    if (lat && lon && date) {
      try {
        const specificDate = moment.utc(date).hours(0).minutes(0).seconds(0).milliseconds(0)
        const { data } = await axios.get<{
          list: AirPollution[]
        }>(
          `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&appid=25392cc844e33a6380df0cd63a9b935a&start=${specificDate.unix()}&end=${specificDate.add(1, 'd').unix()}`
        )
        if (data) {
          airQuality.value = data.list
        }
      } catch (e) {
        return
      }
    }
  }

  return { loadPollution, airQuality }
})
