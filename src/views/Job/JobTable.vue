<template>
  <table>
    <thead>
    <tr>
      <th>Tên công việc</th>
      <th>Tên nhà tuyển dụng</th>
      <th>Tên công ty</th>
      <th>Ngày tạo</th>
      <td></td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="job in items" :key="job.id">
      <td data-label="JobName">
        <a href="javascript:;" @click="showModalInfo(job)">{{ job.name }}</a>
      </td>
      <td data-label="EmployeeName">{{ job.employee_name }}</td>
      <td data-label="Company">{{ job.company }}</td>
      <td data-label="CreateDate">{{ job.createDate }}</td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button @click.prevent="approveModalShow(job)" title="Duyệt công việc" color="success" :icon="mdiClipboardCheckOutline" small />
          <jb-button @click.prevent="denyModalShow(job)" title="Từ chối công việc" color="danger" :icon="mdiClipboardOffOutline" small />
        </jb-buttons>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <small>Số bản ghi: {{ items.length || 0 }}</small>
    </level>
  </div>

  <modal-box
    v-model="jobModalActive"
    title="Thông tin công việc"
    button-label="Đóng"
    button="danger"
  >
    <p>Tên công việc: {{ Job.job_name }}</p>
    <p>Nhà tuyển dụng: {{ Job.employee_name }}</p>
    <p>Tên công ty: {{ Job.company }}</p>
  </modal-box>

  <modal-box
    v-model="approveModal"
    title="Duyệt công việc"
    button-label="Duyệt"
    button="info"
    hasCancel
    v-on:confirm="approveJobAction"
  >
   <p>Xác nhận duyệt công việc: {{ Job.name }}</p>
  </modal-box>

   <modal-box
    v-model="denyModal"
    title="Từ chối công việc"
    button-label="Từ chối"
    button="danger"
    hasCancel
    v-on:confirm="denyJobAction"
  >
   <p>Xác nhận từ chối công việc: {{ Job.name }}</p>
  </modal-box>
</template>

<script>
import { computed, ref } from 'vue'
import { mdiEye, mdiClipboardCheckOutline, mdiClipboardOffOutline } from '@mdi/js'
import Level from '@/components/Level'
import JbButtons from '@/components/JbButtons'
import JbButton from '@/components/JbButton'
import { useStore } from 'vuex'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'JobTable',
  components: {
    Level,
    ModalBox,
    JbButtons,
    JbButton
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()

    store.dispatch('fetchJobs')

    const items = computed(() => store.state.jobs)

    const jobModalActive = ref(false)

    const approveModal = ref(false)
    const denyModal = ref(false)

    const Job = ref({})

    const showModalInfo = (job) => {
      jobModalActive.value = true
      Job.value = job
    }

    const approveModalShow = (job) => {
      approveModal.value = true
      Job.value = job
    }

    const approveJobAction = () => {
      if (Job.value) {
        const id = Job.value.id
        store.dispatch('approveJob', { id })
      }
    }

    const denyModalShow = (job) => {
      denyModal.value = true
      Job.value = job
    }

    const denyJobAction = () => {
      if (Job.value) {
        const id = Job.value.id
        store.dispatch('denyJobAction', { id })
      }
    }

    return {
      mdiEye,
      mdiClipboardCheckOutline,
      mdiClipboardOffOutline,
      showModalInfo,
      approveModalShow,
      denyModalShow,
      approveJobAction,
      denyJobAction,
      jobModalActive,
      Job,
      items,
      approveModal,
      denyModal
    }
  }
}
</script>
