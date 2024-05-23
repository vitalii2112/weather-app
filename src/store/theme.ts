import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'dark' | 'light'>('dark')

  const setTheme = (value?: 'dark' | 'light') => {
    let themeData: string | undefined = value
    if (!value) themeData = localStorage.getItem('theme') || ''
    if (window.matchMedia('(prefers-color-scheme: dark)').matches && themeData !== 'light') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      theme.value = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      theme.value = 'light'
    }
  }

  return { setTheme, theme }
})
