<template>
  <hero-bar>Banner</hero-bar>
  <main-section>
    <card-component title="Cập nhật banner" :icon="mdiSearch" @submit.prevent="submit" form>
      <field>
        <control placeholder="URL" place :icon="mdiAccount" v-model="form.url" />
        <control type="file" :icon="mdiMail" v-model="form.image" />
      </field>
     <field>
        <control :options="options" :icon="mdiAccount" v-model="form.type" />
      </field>
      <jb-buttons>
        <jb-button type="submit" color="info" label="Submit" />
      </jb-buttons>
    </card-component>
  </main-section>
</template>

<script>
import { reactive } from 'vue'
import { mdiBallot, mdiBallotOutline, mdiAccount, mdiMail, mdiCheck, mdiMonitorCellphone } from '@mdi/js'
import MainSection from '@/components/MainSection'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import Field from '@/components/Field'
import Control from '@/components/Control'
import JbButton from '@/components/JbButton'
import JbButtons from '@/components/JbButtons'

export default {
  name: 'Banner',
  components: {
    MainSection,
    HeroBar,
    CardComponent,
    Field,
    Control,
    JbButton,
    JbButtons
  },
  setup () {
    const options = [
      { label: 'Trang chủ bên trái', value: 'HOME_LEFT' },
      { label: 'Trang chủ bên phải', value: 'HOME_RIGHT' },
      { label: 'Trang làm việc bên trái', value: 'DASHBOARD_LEFT' },
      { label: 'Trang làm việc bên phải', value: 'DASHBOARD_RIGHT' }
    ]
    const form = reactive({
      url: '',
      image: '',
      type: ''
    })

    const submit = () => {
      console.log(JSON.stringify(form))
    }

    return {
      form,
      mdiBallot,
      mdiBallotOutline,
      mdiAccount,
      mdiMail,
      mdiCheck,
      mdiMonitorCellphone,
      options,
      submit
    }
  }
}
</script>
