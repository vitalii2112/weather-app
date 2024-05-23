<script setup lang="ts">
import SunnyIcon from '@/components/icons/SunnyIcon.vue'
import PartlyCloudyIcon from '@/components/icons/PartlyCloudyIcon.vue'
import CloudyIcon from '@/components/icons/CloudyIcon.vue'
import OvercastCloudsIcon from '@/components/icons/OvercastCloudsIcon.vue'
import ShowerRainIcon from '@/components/icons/ShowerRainIcon.vue'
import RainIcon from '@/components/icons/RainIcon.vue'
import ThunderstormIcon from '@/components/icons/ThunderstormIcon.vue'
import SnowIcon from '@/components/icons/SnowIcon.vue'
import MistIcon from '@/components/icons/MistIcon.vue'

const props = defineProps<{
  weatherConditionId: number
}>()

import { computed } from 'vue'

const iconMap: Record<number, any> = {
  800: SunnyIcon,
  801: PartlyCloudyIcon,
  802: CloudyIcon,
  803: OvercastCloudsIcon,
  804: OvercastCloudsIcon,
  300: ShowerRainIcon,
  301: ShowerRainIcon,
  302: ShowerRainIcon,
  310: ShowerRainIcon,
  311: ShowerRainIcon,
  312: ShowerRainIcon,
  313: ShowerRainIcon,
  314: ShowerRainIcon,
  321: ShowerRainIcon,
  520: ShowerRainIcon,
  521: ShowerRainIcon,
  522: ShowerRainIcon,
  531: ShowerRainIcon,
  500: RainIcon,
  501: RainIcon,
  502: RainIcon,
  503: RainIcon,
  504: RainIcon,
  200: ThunderstormIcon,
  201: ThunderstormIcon,
  202: ThunderstormIcon,
  210: ThunderstormIcon,
  211: ThunderstormIcon,
  212: ThunderstormIcon,
  221: ThunderstormIcon,
  230: ThunderstormIcon,
  231: ThunderstormIcon,
  232: ThunderstormIcon,
  600: SnowIcon,
  601: SnowIcon,
  602: SnowIcon,
  611: SnowIcon,
  612: SnowIcon,
  613: SnowIcon,
  615: SnowIcon,
  616: SnowIcon,
  620: SnowIcon,
  621: SnowIcon,
  622: SnowIcon
}

const defaultIcon = MistIcon

const currentIcon = computed(() => {
  return iconMap[props.weatherConditionId] || defaultIcon
})
</script>

<template>
  <component :is="currentIcon" />
</template>
