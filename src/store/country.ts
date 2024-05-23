import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export interface CountryGEO {
  name: string
  country: string
  state?: string
  lat: number
  lon: number
}

export const useCountryStore = defineStore('country', () => {
  const city = ref('Kyiv')
  const country = ref('UA')
  const state = ref<null | string>()
  const latitude = ref(47.8671228)
  const longitude = ref(31.0179572)

  const countryName = computed(
    () => `${city.value}, ${state.value ? `${state.value},` : ''} ${country.value}`
  )
  const countryCoords = computed(() => ({ latitude: latitude.value, longitude: longitude.value }))

  const setCountry = (data: {
    city: string
    country: string
    latitude: number
    longitude: number
    state?: string
  }) => {
    city.value = data.city
    country.value = data.country
    latitude.value = data.latitude
    longitude.value = data.longitude
    state.value = data.state
  }

  const loadCountry = async (name: string): Promise<CountryGEO[]> => {
    if (name) {
      try {
        const { data } = await axios.get<CountryGEO[]>(
          `https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=25392cc844e33a6380df0cd63a9b935a`
        )
        return data
      } catch (e) {
        return []
      }
    }
    return []
  }

  return { city, country, latitude, longitude, setCountry, countryName, countryCoords, loadCountry }
})
