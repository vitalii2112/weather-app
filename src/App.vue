<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import WeatherItem from '@/components/WeatherItem.vue'
import { useForecastStore } from '@/store/forecast'
import { useCountryStore } from '@/store/country'
import { storeToRefs } from 'pinia'
import { watchEffect } from 'vue'
import RainChart from '@/components/RainChart.vue'
import PollutionChart from '@/components/PollutionChart.vue'

const forecastStore = useForecastStore()
const countryStore = useCountryStore()
const { forecast } = storeToRefs(forecastStore)
const { loadForecast } = forecastStore
const { countryCoords } = storeToRefs(countryStore)

watchEffect(() => loadForecast(countryCoords.value.latitude, countryCoords.value.longitude))
</script>

<template>
  <AppHeader />
  <main class="px-8">
    <div class="flex gap-12 justify-between">
      <div class="max-w-[70%]">
        <h2 class="mb-4 font-semibold text-xl">Forecast</h2>
        <div class="flex gap-4">
          <WeatherItem
            v-for="(item, index) in forecast"
            :key="index"
            :date="item.dt_txt"
            :sunset="item.sunset"
            :weatherConditionId="item.weatherConditionId"
            :sunrise="item.sunrise"
            :humidity="item.humidity"
            :wind="item.wind"
            :temp="item.temp"
            :realFeel="item.realFeel"
          />
        </div>
      </div>
      <RainChart class="min-w-[30%]" />
    </div>
    <PollutionChart />
  </main>
</template>

<style scoped></style>
