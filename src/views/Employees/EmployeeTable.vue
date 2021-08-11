<template>
  <table>
    <thead>
    <tr>
      <th>Họ tên</th>
      <th>Số điện thoại</th>
      <td></td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="client in itemsPaginated" :key="client.id">
      <td data-label="Name">{{ client.full_name }}</td>
      <td data-label="Phone">{{ client.mobile_phone }}</td>
      <td class="actions-cell">
        <jb-buttons type="justify-start lg:justify-end" no-wrap>
          <jb-button color="danger" :icon="mdiTrashCan" small @click="deleteEmployee(client)" />
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
</template>

<script>
import { computed, ref } from 'vue'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import Level from '@/components/Level'
import JbButtons from '@/components/JbButtons'
import JbButton from '@/components/JbButton'
import { useStore } from 'vuex'

export default {
  name: 'EmployeeTable',
  components: {
    Level,
    JbButtons,
    JbButton
  },
  props: {
    checkable: Boolean
  },
  setup () {
    const store = useStore()

    store.dispatch('fetchEmployes')

    const items = computed(() => store.state.employes)

    // const items = ref([
    //   {
    //     full_name: 'Trần Văn A',
    //     mobile_phone: '12345678'
    //   },
    //   {
    //     full_name: 'Trần Văn B',
    //     mobile_phone: '12345678'
    //   },
    //   {
    //     full_name: 'Trần Văn C',
    //     mobile_phone: '12345678'
    //   }
    // ])

    const isModalActive = ref(false)

    const perPage = ref(10)

    const currentPage = ref(0)

    const checkedRows = ref([])

    const startIndex = ref(0)

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

    const remove = (arr, cb) => {
      const newArr = []

      arr.forEach(item => {
        if (!cb(item)) {
          newArr.push(item)
        }
      })

      return newArr
    }

    const checked = (isChecked, client) => {
      if (isChecked) {
        checkedRows.value.push(client)
      } else {
        checkedRows.value = remove(checkedRows.value, row => row.id === client.id)
      }
    }

    const deleteEmployee = (employee) => {
      if (confirm('Bạn có muốn xóa nhân viên')) {
        store.dispatch('deleteEmployee', { ...employee })
      }
    }

    return {
      isModalActive,
      currentPage,
      currentPageHuman,
      numPages,
      checkedRows,
      itemsPaginated,
      pagesList,
      checked,
      deleteEmployee,
      mdiEye,
      mdiTrashCan,
      startIndex
    }
  }
}
</script>
