<template>
  <table>
    <tbody>
    <tr>
      <td>Số nhà tuyển dụng tham gia vào hệ thống</td>
      <td>{{ YearReportData.numberOfRecruiters }}</td>
    </tr>
    <tr>
      <td>Số việc làm được đăng lên</td>
      <td>{{ YearReportData.numberOfJobs }}</td>
    </tr>
    <tr>
     <td>Số lượng sinh viên nhà tuyển dụng có nhu cầu tuyển dụng</td>
     <td>{{ YearReportData.numberOfDesiredStudents }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from 'vue'
import { mdiEye, mdiDownload, mdiAccount, mdiLockOpenVariant } from '@mdi/js'
import { useStore } from 'vuex'

export default {
  name: 'YearReportTable',
  components: {
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()

    store.dispatch('fetchStaff')
    store.dispatch('getYearReport')

    const items = computed(() => store.state.staffs)

    const YearReportData = computed(() => store.state.yearReportData)

    return {
      mdiEye,
      mdiDownload,
      mdiAccount,
      mdiLockOpenVariant,
      items,
      YearReportData
    }
  }
}
</script>
