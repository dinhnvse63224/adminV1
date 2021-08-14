<template>
  <table>
    <thead>
    <tr>
      <th>Tên công việc</th>
      <th>Tên nhà tuyển dụng</th>
      <th>Tên công ty</th>
      <th>Ngày tạo</th>
      <th></th>
    </tr>
    <tr>
      <th colspan="50">
        <input v-model="searchText" @keyup="itemFilter" class="search-input" type="text">
      </th>
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
      <b>Số bản ghi: {{ items.length || 0 }}</b>
    </level>
  </div>

  <modal-box
    v-model="jobModalActive"
    title="Thông tin công việc"
    noButton
  >
    <p><b>Tên công việc:</b> {{ Job.name }}</p>
    <p><b>Hình thức:</b> {{ Job.workingFormLabel }} <b>Khu vực:</b> {{ Job.locationLabel }}</p>
    <p><b>Địa chỉ:</b> {{ Job.workingPlace }}</p>
    <p><b>Mô tả công việc:</b> <span v-html="Job.description"></span></p>
    <p v-if="Job.requirement"><b>Yêu cầu công việc:</b> <span v-html="Job.requirement"></span></p>
    <p><b>Mức lương:</b> {{ Job.salaryMin }} - {{ Job.salaryMax }}</p>
    <p><b>Quyền lợi:</b> <span v-html="Job.offer"></span></p>
    <p><b>Số lượng tuyển:</b> {{ Job.quantity }}</p>
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

    const locations = computed(() => store.state.locations)

    const workingforms = computed(() => store.state.workingforms)

    const jobModalActive = ref(false)

    const approveModal = ref(false)
    const denyModal = ref(false)
    const searchText = ref('')

    const Job = ref({})

    const showModalInfo = (job) => {
      jobModalActive.value = true
      Job.value = job
      Job.value.salaryMin = new Intl.NumberFormat().format(Job.value.salaryMin)
      Job.value.salaryMax = new Intl.NumberFormat().format(Job.value.salaryMax)
      Job.value.locationLabel = locations.value.find(l => l.value === Job.value.location)?.label
      Job.value.workingFormLabel = workingforms.value.find(l => l.value === Job.value.workingForm)?.label
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
        store.dispatch('denyJob', { id })
      }
    }

    const itemFilter = () => {
      const cloneData = [...items.value]
      if (searchText.value) {
        const Items = cloneData.filter(t => t.name.toLowerCase().indexOf(searchText.value.toLowerCase()) > -1 || t.id.toString() === searchText.value) || []
        store.commit('basic', {
          key: 'jobs',
          value: Items
        })
      } else {
        store.dispatch('fetchJobs')
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
      denyModal,
      itemFilter,
      searchText
    }
  }
}
</script>
