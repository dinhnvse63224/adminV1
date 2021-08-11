<template>
  <!-- <title-bar :title-stack="titleStack" /> -->
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
    <!-- <card-component title="Custom elements" :icon="mdiBallotOutline">

      <field label="Checkbox" wrap-body>
        <check-radio-picker
          name="sample-checkbox"
          v-model="customElementsForm.checkbox"
          :options="{ lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }"
        />
      </field>

      <divider />

      <field label="Radio" wrap-body>
        <check-radio-picker
          name="sample-radio"
          type="radio"
          v-model="customElementsForm.radio"
          :options="{ one: 'One', two: 'Two' }"
        ></check-radio-picker>
      </field>

      <divider />

      <field label="Switch">
        <check-radio-picker
          name="sample-switch"
          type="switch"
          v-model="customElementsForm.switch"
          :options="{ one: 'One', two: 'Two' }"
        ></check-radio-picker>
      </field>

      <divider />

      <file-picker v-model="customElementsForm.file" />
    </card-component> -->
  </main-section>

  <!-- <bottom-other-pages-section /> -->
</template>

<script>
import { ref, reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail, mdiCheck, mdiMonitorCellphone } from '@mdi/js'
import MainSection from '@/components/MainSection'
// import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import Field from '@/components/Field'
import Control from '@/components/Control'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'
import { useStore } from 'vuex'
// import BottomOtherPagesSection from '@/components/BottomOtherPagesSection'

export default {
  name: 'Forms',
  components: {
    MainSection,
    HeroBar,
    CardComponent,
    // TitleBar,
    Field,
    Control,
    JbButton,
    JbButtons
    // BottomOtherPagesSection
  },
  setup () {
    const titleStack = ref(['Admin', 'Forms'])

    const store = useStore()

    const selectOptions = [
      { id: 1, label: 'Business development' },
      { id: 2, label: 'Marketing' },
      { id: 3, label: 'Sales' }
    ]

    const form = reactive({
      username: '',
      password: '',
      full_name: '',
      mobile_phone: ''
    })

    const customElementsForm = reactive({
      checkbox: ['lorem'],
      radio: 'one',
      switch: ['one'],
      file: null
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
      titleStack,
      selectOptions,
      form,
      customElementsForm,
      submit,
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
