<template>
  <table>
    <tbody>
        <tr>
      <td>
        <field>
          <control :options="quarters" @change.prevent="onChange" v-model="quarterReport" />
        </field>
      </td>
    </tr>
    <tr>
      <td>Số nhà tuyển dụng tham gia vào hệ thống</td>
      <td>{{ quarterReportData.numberOfRecruiters }}</td>
    </tr>
    <tr>
      <td>Số việc làm được đăng lên</td>
      <td>{{ quarterReportData.numberOfJobs }}</td>
    </tr>
    <tr>
     <td>Số lượng sinh viên nhà tuyển dụng có nhu cầu tuyển dụng</td>
     <td>{{ quarterReportData.numberOfDesiredStudents }}</td>
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
  name: 'QuarterReportTable',
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

    const items = computed(() => store.state.staffs)

    const quarters = ref(Array.from(Array(4).keys()).map(t => t + 1))

    const quarterReport = computed(() => store.state.quarterReport)

    store.dispatch('getQuarterReport', quarterReport.value)

    const quarterReportData = computed(() => store.state.quarterReportData)

    const onChange = (event) => {
      store.commit('setQuarterReport', event.target.value)
      store.dispatch('getQuarterReport', event.target.value)
    }

    return {
      mdiEye,
      mdiDownload,
      mdiAccount,
      mdiLockOpenVariant,
      items,
      JbButton,
      quarters,
      quarterReport,
      onChange,
      quarterReportData
    }
  }
}
</script>
