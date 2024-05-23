import moment from 'moment'

export interface ForecastData {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}

export interface WeatherData {
  list: ForecastData[]
  city: {
    timezone: number
    sunrise: number
    sunset: number
  }
}

export interface Forecast {
  dt_txt: string
  temp: number
  realFeel: number
  sunset?: string
  sunrise?: string
  wind?: number
  humidity?: number
  weatherConditionId: number
}

export function getClosestWeatherData(data: WeatherData): ForecastData[] {
  if (!data.list) return []

  const currentTime = moment()

  const groupedData = data.list.reduce((acc: { [key: string]: ForecastData[] }, item) => {
    const date = moment(item.dt_txt).format('YYYY-MM-DD')
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {})

  return Object.values(groupedData).map((dayData) => {
    let closestItem: ForecastData | null = null
    let minDiff = Infinity

    dayData.forEach((item) => {
      const itemTime = moment(item.dt_txt)
      const diff = Math.abs(currentTime.diff(itemTime))

      if (diff < minDiff) {
        minDiff = diff
        closestItem = item
      }
    })

    return closestItem!
  })
}

export function getPopAndTime(data: WeatherData, selectedDate: string) {
  if (!data.list || !data.list.length || !selectedDate) return { popArray: [], timeArray: [] }
  const selectedDay = moment(selectedDate).format('YYYY-MM-DD')

  const filteredData = data.list.filter(
    (item) => moment(item.dt_txt).format('YYYY-MM-DD') === selectedDay
  )

  const popArray = filteredData.map((item) => item.pop)
  const timeArray = filteredData.map((item) => moment(item.dt_txt).format('hA'))

  return { popArray, timeArray }
}
