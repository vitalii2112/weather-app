<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { type ChartOptions, type ChartData } from 'chart.js'
import { ref, watchEffect } from 'vue'
import { useForecastStore } from '@/store/forecast'
import { storeToRefs } from 'pinia'

const dataCollection = ref<ChartData<'bar'>>({
  labels: [],
  datasets: []
})

const store = useForecastStore()
const { precipitation } = storeToRefs(store)

watchEffect(() => {
  if (precipitation.value && precipitation.value.timeArray && precipitation.value.popArray) {
    dataCollection.value = {
      labels: precipitation.value.timeArray,
      datasets: [
        {
          label: 'Chance of Rain',
          backgroundColor: '#71b1f4',
          borderColor: '#71b1f4',
          data: precipitation.value.popArray,
          barThickness: 10,
          maxBarThickness: 10,
          borderRadius: 10
        }
      ]
    }
  }
})

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: '#333'
      },
      min: 0,
      max: 1,
      ticks: {
        padding: 10,
        stepSize: 0.5,
        callback(tickValue) {
          const value = Number(tickValue)
          if (value >= 0.6) return 'Heavy'
          else if (value >= 0.3 && value < 0.6) return 'Rainy'
          else return 'Sunny'
        }
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label(tooltipItem) {
          let label = tooltipItem.dataset.label || ''
          if (label) label += ': '
          label += tooltipItem.parsed.y * 100 + '%'
          return label
        }
      }
    }
  }
}
</script>

<template>
  <div>
    <h2 class="mb-4 font-semibold text-xl">Chance of rain</h2>
    <Bar :data="dataCollection" :options="options" />
  </div>
</template>

<style scoped>
div {
  position: relative;
  height: 300px;
}
</style>
