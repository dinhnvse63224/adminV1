<template>
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget
        class="tile"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="dataCounter.employers"
        label="Nhà tuyển dụng"
      />
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiAccount"
        :number="dataCounter.students"
        label="Sinh viên"
      />
      <card-widget
        class="tile"
        color="text-red-500"
        :icon="mdiChartTimelineVariant"
        :number="dataCounter.jobs"
        label="Công việc đã đăng"
      />
    </div>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <card-component :icon="mdiChartBar"
        title="Báo cáo của tháng 08/2021"
        has-table>
      </card-component>
      <card-component
      :icon="mdiChartBar"
        title="Báo cáo của quý 03/2021"
        has-table>
      </card-component>
    </div>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <card-component
        :icon="mdiChartBar"
        title="Báo cáo của năm 2021"
        has-table>
      </card-component>
    </div>
  </main-section>
</template>

<script>
// @ is an alias to /src
import {
  mdiAccountMultiple,
  mdiAccount,
  mdiChartTimelineVariant,
  mdiChartBar
} from '@mdi/js'

import MainSection from '@/components/MainSection'
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import { ref } from '@vue/reactivity'

export default {
  name: 'Dashboard',
  components: {
    MainSection,
    CardComponent,
    CardWidget,
    HeroBar
  },
  setup () {
    const dataCounter = ref({ employers: 10, students: 111, jobs: 11 })

    return {
      mdiAccountMultiple,
      mdiAccount,
      mdiChartTimelineVariant,
      mdiChartBar,
      dataCounter
    }
  }
}
</script>
