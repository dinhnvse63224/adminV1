<template>
  <section class="bg-white border-b border-gray-100 p-6">
    <level>
      <h1 class="text-3xl font-semibold leading-tight">
        <slot />
      </h1>
    </level>
  </section>
</template>

<script>
import { mdiMonitorClean } from '@mdi/js'
import Level from '@/components/Level'

export default {
  name: 'HeroBar',
  components: {
    Level
  },
  setup () {
    return {
      mdiMonitorClean
    }
  }
}
</script>
