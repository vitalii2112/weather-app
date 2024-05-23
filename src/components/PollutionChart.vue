<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { type ChartOptions, type ChartData } from 'chart.js'
import { ref, watchEffect } from 'vue'
import { useCountryStore } from '@/store/country'
import { useForecastStore } from '@/store/forecast'
import { usePollutionStore } from '@/store/pollution'
import { useThemeStore } from '@/store/theme'
import { storeToRefs } from 'pinia'
import moment from 'moment'

const dataCollection = ref<ChartData<'line'>>({
  labels: [],
  datasets: []
})

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const countryStore = useCountryStore()
const { countryCoords } = storeToRefs(countryStore)

const forecastStore = useForecastStore()
const { selectedDate } = storeToRefs(forecastStore)

const pollutionStore = usePollutionStore()
const { airQuality } = storeToRefs(pollutionStore)
const { loadPollution } = pollutionStore

watchEffect(() => {
  if (airQuality.value && airQuality.value.length) {
    const labels = airQuality.value.map((item) => moment.unix(item.dt).format('hA'))
    const coData = airQuality.value.map((item) => item.components.co)
    const noData = airQuality.value.map((item) => item.components.no)
    const no2Data = airQuality.value.map((item) => item.components.no2)
    const o3Data = airQuality.value.map((item) => item.components.o3)
    const so2Data = airQuality.value.map((item) => item.components.so2)
    const pm25Data = airQuality.value.map((item) => item.components.pm2_5)
    const pm10Data = airQuality.value.map((item) => item.components.pm10)
    const nh3Data = airQuality.value.map((item) => item.components.nh3)

    dataCollection.value = {
      labels: labels,
      datasets: [
        { label: 'CO', data: coData, borderColor: 'red', fill: false },
        { label: 'NO', data: noData, borderColor: 'blue', fill: false },
        { label: 'NO2', data: no2Data, borderColor: 'green', fill: false },
        { label: 'O3', data: o3Data, borderColor: 'purple', fill: false },
        { label: 'SO2', data: so2Data, borderColor: 'orange', fill: false },
        { label: 'PM2.5', data: pm25Data, borderColor: 'brown', fill: false },
        { label: 'PM10', data: pm10Data, borderColor: 'grey', fill: false },
        { label: 'NH3', data: nh3Data, borderColor: 'pink', fill: false }
      ]
    }
  }
})

const options = ref<ChartOptions<'line'>>({})

watchEffect(() =>
  loadPollution(countryCoords.value.latitude, countryCoords.value.longitude, selectedDate.value)
)
watchEffect(() => {
  const color = theme.value === 'dark' ? '#ffffff' : '#656565'
  options.value = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
          color
        },
        ticks: {
          color
        },
        grid: {
          color: 'transparent'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Concentration',
          color
        },
        ticks: { color },
        grid: {
          color: theme.value === 'dark' ? '#FFFFFF33' : '#E3E3E3'
        }
      }
    },
    plugins: {
      legend: {
        labels: { color }
      }
    }
  }
})
</script>

<template>
  <div class="mt-32">
    <h2 class="mb-4 font-semibold text-xl">Air pollution</h2>
    <Line :data="dataCollection" :options="options" />
  </div>
</template>

<style scoped>
div {
  position: relative;
  height: 300px;
}
</style>
