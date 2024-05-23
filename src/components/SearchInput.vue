<script setup lang="ts">
import SearchIcon from '@/components/icons/SearchIcon.vue'
import { ref } from 'vue'
import { type CountryGEO, useCountryStore } from '@/store/country'
import { useToast } from 'vue-toast-notification'

const searchValue = ref('')
const hits = ref<CountryGEO[]>([])
const store = useCountryStore()
const $toast = useToast()

const { loadCountry, setCountry } = store

const onSubmit = async (e: any) => {
  if (e.code === 'Enter') {
    const data = await loadCountry(searchValue.value)
    if (data.length === 0) {
      $toast.info('City not found', {
        dismissible: true,
        duration: 10000,
        position: 'bottom',
        pauseOnHover: true
      })
      return
    }
    hits.value = data
  }
}

const selectCountry = (country: CountryGEO) => {
  setCountry({
    city: country.name,
    country: country.country,
    latitude: country.lat,
    longitude: country.lon,
    state: country.state
  })
  hits.value = []
  searchValue.value = ''
}
</script>

<template>
  <div class="flex flex-col items-center relative">
    <div
      :class="{ 'rounded-b-2xl': !hits.length, '!border-b-white': hits.length }"
      class="flex bg-[#dcdcdc] dark:bg-[#1e1e1e] border-b border-b-transparent rounded-t-2xl gap-4 p-2 min-w-96"
    >
      <SearchIcon class="w-6 dark:fill-[#fcfcfc]" />
      <input
        type="text"
        class="bg-transparent outline-none w-full placeholder:text-gray-500"
        placeholder="Search city......"
        @keydown="onSubmit"
        v-model="searchValue"
      />
    </div>
    <div v-show="hits.length" class="w-full absolute z-10 top-[2.55rem]">
      <div v-for="(item, index) in hits" :key="index">
        <div
          :class="{ 'rounded-b-2xl': index === hits.length - 1 }"
          class="w-full bg-[#1e1e1e] p-2 transition-colors cursor-pointer hover:bg-[#454545]"
          @click="selectCountry(item)"
        >
          {{ `${item.name}, ${item.state ? `${item.state},` : ''} ${item.country}` }}
        </div>
      </div>
    </div>
  </div>
</template>
