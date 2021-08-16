<template>
  <hero-bar>Dashboard</hero-bar>
  <main-section>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
      <card-widget
        class="tile"
        color="text-green-500"
        :icon="mdiAccountMultiple"
        :number="dashboardReportData.numberOfRecruiters"
        label="Nhà tuyển dụng"
      />
      <card-widget
        class="tile"
        color="text-blue-500"
        :icon="mdiAccount"
        :number="dashboardReportData.numberOfStudents"
        label="Sinh viên"
      />
      <card-widget
        class="tile"
        color="text-red-500"
        :icon="mdiChartTimelineVariant"
        :number="dashboardReportData.numberOfPostedJobs"
        label="Công việc đã đăng"
      />
    </div>
    <div>
       <jb-button @click="download" title="Tải báo cáo" label="Tải báo cáo" color="info" :icon="mdiDownload" />
    </div>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <card-component :icon="mdiChartBar"
        :title="'Báo cáo của tháng ' + month +'/2021'"
        has-table>
        <month-report-table />
      </card-component>
      <card-component
      :icon="mdiChartBar"
        :title="'Báo cáo của quý '+ quarter +'/2021'"
        has-table>
      <quarter-report-table />
      </card-component>
    </div>
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
        <card-component
        :icon="mdiChartBar"
        title="Báo cáo của năm 2021"
        has-table>
        <year-report-table />
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
  mdiChartBar,
  mdiDownload
} from '@mdi/js'

import MainSection from '@/components/MainSection'
import HeroBar from '@/components/HeroBar'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import MonthReportTable from './Reports/MonthReportTable'
import YearReportTable from './Reports/YearReportTable.vue'
import QuarterReportTable from './Reports/QuarterReportTable.vue'
import JbButton from '@/components/JbButton'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'

export default {
  name: 'Dashboard',
  components: {
    MainSection,
    CardComponent,
    CardWidget,
    HeroBar,
    MonthReportTable,
    YearReportTable,
    QuarterReportTable,
    JbButton
  },
  setup () {
    const store = useStore()

    store.dispatch('getDashboardReport')

    const month = computed(() => store.state.monthReport)
    const quarter = computed(() => store.state.quarterReport)
    const dashboardReportData = computed(() => store.state.dashboardReportData)

    const download = () => {
      store.dispatch('downloadReport')
    }

    return {
      mdiAccountMultiple,
      mdiAccount,
      mdiChartTimelineVariant,
      mdiChartBar,
      MonthReportTable,
      mdiDownload,
      month,
      quarter,
      dashboardReportData,
      download
    }
  }
}
</script>
