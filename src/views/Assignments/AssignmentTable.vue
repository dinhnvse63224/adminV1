<template>
  <table>
    <thead>
    <tr>
      <th>Tên công việc</th>
      <th>Tên nhà tuyển dụng</th>
      <th>Tên công ty</th>
      <td></td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="client in itemsPaginated" :key="client.id">
      <td data-label="JobName">
        <a href="javascript:;" @click="showModalInfo(client)">{{ client.job_name }}</a>
      </td>
      <td data-label="EmployeeName">{{ client.employee_name }}</td>
      <td data-label="Company">{{ client.company }}</td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button color="success" :icon="mdiCheckBoxOutline" small />
          <jb-button color="danger" :icon="mdiTrashCan" small />
        </jb-buttons>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <level>
      <jb-buttons>
        <jb-button
          v-for="page in pagesList"
          @click="currentPage = page"
          :active="page === currentPage"
          :label="page + 1"
          :key="page"
          small
        />
      </jb-buttons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </level>
  </div>

  <modal-box
    v-model="assignmentModalActive"
    title="Thông tin công việc"
    button-label="Đóng"
    button="danger"
  >
    <p>Tên công việc: {{ Assignment.job_name }}</p>
    <p>Nhà tuyển dụng: {{ Assignment.employee_name }}</p>
    <p>Tên công ty: {{ Assignment.company }}</p>
  </modal-box>
</template>

<script>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan, mdiCheckBoxOutline } from '@mdi/js'
import Level from '@/components/Level'
import JbButtons from '@/components/JbButtons'
import JbButton from '@/components/JbButton'
import { useStore } from 'vuex'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'AssignmentTable',
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

    store.dispatch('fetchAssignments')

    const items = computed(() => store.state.assignments)

    const isModalActive = ref(false)

    const perPage = ref(10)

    const currentPage = ref(0)

    const checkedRows = ref([])

    const startIndex = ref(0)

    const assignmentModalActive = ref(false)

    const Assignment = ref({})

    const itemsPaginated = computed(
      () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
    )

    const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

    const currentPageHuman = computed(() => currentPage.value + 1)

    const pagesList = computed(() => {
      const pagesList = []

      for (let i = 0; i < numPages.value; i++) {
        pagesList.push(i)
      }

      return pagesList
    })

    const showModalInfo = (assignment) => {
      assignmentModalActive.value = true
      Assignment.value = assignment
    }

    return {
      isModalActive,
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      itemsPaginated,
      pagesList,
      mdiEye,
      mdiTrashCan,
      startIndex,
      mdiCheckBoxOutline,
      showModalInfo,
      assignmentModalActive,
      Assignment
    }
  }
}
</script>
