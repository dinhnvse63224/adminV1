<template>
  <hero-bar>Banner</hero-bar>
  <main-section>
    <card-component title="Cập nhật banner" :icon="mdiSearch" @submit.prevent="submit" form>
      <field>
        <control placeholder="URL" place :icon="mdiAccount" v-model="form.url" />
        <control type="file" id="bannerFile" :icon="mdiMail" v-model="form.image" />
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
import { useStore } from 'vuex'

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
    const store = useStore()
    const options = [
      { label: 'Trang chủ bên trái', value: 1 },
      { label: 'Trang chủ bên phải', value: 2 },
      { label: 'Trang làm việc bên trái', value: 3 },
      { label: 'Trang làm việc bên phải', value: 4 }
    ]
    const form = reactive({
      url: '',
      image: '',
      type: ''
    })

    const submit = () => {
      if (!form.image) {
        alert('Vui lòng chọn banner')
        return
      }
      const formData = new FormData()
      const fileEl = document.querySelector('#bannerFile')
      formData.append('image', fileEl.files[0])
      formData.append('id', form.type.value)
      formData.append('url', form.url)
      store.dispatch('updateBanner', formData)
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
