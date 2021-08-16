<template>
  <table>
    <tbody>
          <tr>
      <td>
        <field>
          <control :options="months" @change.prevent="onChange" v-model="monthReport" />
        </field>
      </td>
    </tr>
    <tr>
      <td>Số nhà tuyển dụng tham gia vào hệ thống</td>
      <td>{{ monthReportData.numberOfRecruiters }}</td>
    </tr>
    <tr>
      <td>Số việc làm được đăng lên</td>
      <td>{{ monthReportData.numberOfJobs }}</td>
    </tr>
    <tr>
     <td>Số lượng sinh viên nhà tuyển dụng có nhu cầu tuyển dụng</td>
     <td>{{ monthReportData.numberOfDesiredStudents }}</td>
    </tr>
    <tr>
       <td>Số lượng sinh viên tham gia tìm việc</td>
       <td>{{ monthReportData.numberOfStudents }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { computed, ref } from 'vue'
import { mdiEye, mdiDownload, mdiAccount, mdiLockOpenVariant } from '@mdi/js'
import { useStore } from 'vuex'
import JbButton from '@/components/JbButton'
import Field from '@/components/Field'
import Control from '@/components/Control'

export default {
  name: 'MonthReportTable',
  components: {
    Field,
    Control
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()

    store.dispatch('fetchStaff')

    const months = ref(Array.from(Array(12).keys()).map(t => t + 1))

    const items = computed(() => store.state.staffs)

    const monthReport = computed(() => store.state.monthReport)

    store.dispatch('getMonthReport', monthReport.value)

    const monthReportData = computed(() => store.state.monthReportData)

    const onChange = (event) => {
      store.commit('setMonthReport', event.target.value)
      store.dispatch('getMonthReport', event.target.value)
    }

    return {
      mdiEye,
      mdiDownload,
      mdiAccount,
      mdiLockOpenVariant,
      items,
      JbButton,
      monthReport,
      months,
      onChange,
      monthReportData
    }
  }
}
</script>
