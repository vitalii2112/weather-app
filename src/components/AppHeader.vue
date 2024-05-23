<script setup lang="ts">
import MapPin from '@/components/icons/MapPin.vue'
import SunnyIcon from '@/components/icons/SunnyWhiteIcon.vue'
import NightIcon from '@/components/icons/NightIcon.vue'
import SearchInput from '@/components/SearchInput.vue'
import { useCountryStore } from '@/store/country'
import { useThemeStore } from '@/store/theme'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const store = useCountryStore()
const { countryName } = storeToRefs(store)

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { setTheme } = themeStore

onBeforeMount(() => setTheme())
</script>

<template>
  <header class="flex justify-between p-8 items-center">
    <div class="flex items-center gap-2">
      <MapPin class="w-6 dark:fill-[#fcfcfc]" />
      {{ countryName }}
    </div>
    <SearchInput />
    <div class="flex items-center">
      <button v-if="theme === 'dark'">
        <SunnyIcon
          @click="setTheme('light')"
          class="w-7 h-7 transition-colors hover:fill-gray-400"
        />
      </button>
      <button v-else>
        <NightIcon
          @click="setTheme('dark')"
          class="w-7 h-7 fill-black transition-colors hover:fill-gray-600"
        />
      </button>
    </div>
  </header>
</template>
