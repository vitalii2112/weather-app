<script setup lang="ts">
import { computed } from 'vue'
import moment from 'moment'
import { useForecastStore } from '@/store/forecast'
import { storeToRefs } from 'pinia'
import WeatherIcon from '@/components/WeatherIcon.vue'

const props = defineProps<{
  date: string
  temp: number
  realFeel: number
  humidity?: number
  wind?: number
  sunrise?: string
  sunset?: string
  weatherConditionId: number
}>()

const store = useForecastStore()
const { selectedDate } = storeToRefs(store)
const { selectDate } = store

const isActive = computed(() => moment(selectedDate.value).isSame(props.date))
const currentTime = computed(() => moment().format('h:mm A'))
const sunsetTime = computed(() => moment(props.sunset).format('h:mm A'))
const sunriseTime = computed(() => moment(props.sunrise).format('h:mm A'))
const day = computed(() => moment(props.date).format(isActive.value ? 'dddd' : 'ddd'))

const activeHandler = () => {
  selectDate(props.date)
}
</script>

<template>
  <div
    :class="{ 'min-w-60': isActive, 'min-w-40': !isActive }"
    class="h-60 cursor-pointer"
    @click="activeHandler"
  >
    <h3
      class="p-4 rounded-t-2xl text-xl flex items-center justify-between transition-all"
      :class="{
        'bg-[#91bede]': isActive,
        'bg-[#dcdcdc] dark:bg-[#1e1e1e] relative after:absolute after:h-[2px] after:w-[calc(100%_-_2rem)] after:bg-[#919191] dark:after:bg-[#3d3d3d] after:bottom-0 after:m-auto after:left-0 after:right-0':
          !isActive
      }"
    >
      <span>{{ day }}</span>
      <span v-show="isActive">{{ currentTime }}</span>
    </h3>
    <div
      class="p-4 rounded-b-2xl h-full transition-all"
      :class="{ 'bg-[#9ccbf1]': isActive, 'bg-[#dcdcdc] dark:bg-[#1e1e1e]': !isActive }"
    >
      <Transition name="fade" mode="out-in">
        <div v-if="isActive">
          <div class="flex transition-all">
            <h2 class="font-black text-5xl">{{ Math.round(temp) }}°</h2>
            <WeatherIcon :weatherConditionId />
          </div>
          <div class="font-semibold">
            <div class="flex gap-1">
              <span class="text-gray-600">Real feel:</span>
              <span class="text-black">{{ Math.round(realFeel) }}°</span>
            </div>
            <div v-if="sunrise" class="flex gap-1">
              <span class="text-gray-600">Sunrise:</span>
              <span class="text-black">{{ sunriseTime }}</span>
            </div>
            <div v-else class="flex gap-1">
              <span class="text-gray-600">Wind:</span>
              <span class="text-black">{{ wind }}m/s</span>
            </div>
            <div v-if="sunset" class="flex gap-1">
              <span class="text-gray-600">Sunset:</span>
              <span class="text-black">{{ sunsetTime }}</span>
            </div>
            <div v-else class="flex gap-1">
              <span class="text-gray-600">Humidity:</span>
              <span class="text-black">{{ humidity }}%</span>
            </div>
          </div>
        </div>
        <div v-else class="flex transition-all flex-col-reverse items-center gap-8">
          <h2 class="font-black text-5xl">{{ Math.round(temp) }}°</h2>
          <WeatherIcon :weatherConditionId />
        </div>
      </Transition>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
