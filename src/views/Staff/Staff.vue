<template>
  <hero-bar>Nhân viên</hero-bar>
  <main-section>
    <card-component title="Thông tin nhân viên" :icon="mdiSearch" @submit.prevent="submit" form>
      <field>
        <control placeholder="Tài khoản" place :icon="mdiAccount" v-model="form.username" />
        <control placeholder="Mật khẩu" type="password" :icon="mdiLock" v-model="form.password" />
      </field>
     <field>
        <control placeholder="Họ và tên" place :icon="mdiAccount" v-model="form.fullName" />
        <control placeholder="Nhập lại mật khẩu"  type="password" :icon="mdiLock" v-model="form.confirmPassword" />
      </field>
      <jb-buttons>
        <jb-button type="submit" color="info" label="Submit" />
      </jb-buttons>
    </card-component>
     <card-component :icon="mdiAccount" title="Danh sách nhân viên" has-table>
      <staff-table />
    </card-component>
  </main-section>
</template>

<script>
import StaffTable from './StaffTable'
import { reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail, mdiCheck, mdiLock } from '@mdi/js'
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
    StaffTable,
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
      confirmPassword: '',
      fullName: ''
    })

    const submit = () => {
      store.dispatch('StaffInsert', { ...form })
      form.username = ''
      form.password = ''
      form.confirmPassword = ''
      form.fullName = ''
    }

    return {
      form,
      submit,
      StaffTable,
      mdiBallot,
      mdiBallotOutline,
      mdiAccount,
      mdiMail,
      mdiCheck,
      mdiLock
    }
  }
}
</script>
