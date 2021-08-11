<template>
  <hero-bar>Nhân viên</hero-bar>
  <main-section>
    <card-component title="Forms" :icon="mdiSearch" @submit.prevent="submit" form>
      <field>
        <control placeholder="Tài khoản" place :icon="mdiAccount" v-model="form.username" />
        <control placeholder="Mật khẩu" type="password" :icon="mdiMail" v-model="form.password" />
      </field>
     <field>
        <control placeholder="Họ và tên" place :icon="mdiAccount" v-model="form.full_name" />
        <control placeholder="Số điện thoại" :icon="mdiMonitorCellphone" v-model="form.mobile_phone" />
      </field>
      <jb-buttons>
        <jb-button type="submit" color="info" label="Submit" />
      </jb-buttons>
    </card-component>
     <card-component :icon="mdiMonitorCellphone" title="Danh sách nhân viên" has-table>
      <employee-table />
    </card-component>
  </main-section>
</template>

<script>
import EmployeeTable from './EmployeeTable'
import { reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail, mdiCheck, mdiMonitorCellphone } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import Field from '@/components/Field'
import Control from '@/components/Control'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'
import { useStore } from 'vuex'

export default {
  name: 'Employee',
  components: {
    MainSection,
    HeroBar,
    EmployeeTable,
    CardComponent,
    Field,
    Control,
    JbButton,
    JbButtons
  },
  setup () {
    const store = useStore()
    const form = reactive({
      username: '',
      password: '',
      full_name: '',
      mobile_phone: ''
    })

    const submit = () => {
      console.log('Forms data', JSON.stringify(form))
      store.dispatch('addEmployee', { ...form })
      form.username = ''
      form.password = ''
      form.full_name = ''
      form.mobile_phone = ''
    }

    return {
      form,
      submit,
      EmployeeTable,
      mdiBallot,
      mdiBallotOutline,
      mdiAccount,
      mdiMail,
      mdiCheck,
      mdiMonitorCellphone
    }
  }
}
</script>
