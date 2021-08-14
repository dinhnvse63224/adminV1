import { createStore } from 'vuex'
import { ApiService } from '../services/api.service'
import { handleResponse } from '../utils/handle-response'

export default createStore({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* FormScreen - fullscreen form layout (e.g. login page) */
    isFormScreen: false,

    /* Aside */
    isAsideMobileExpanded: false,
    isAsideLgActive: false,

    staffs: [],
    jobs: []
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    /* User */
    user (state, payload) {
      if (payload.fullName) {
        state.userName = payload.fullName
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },

    /* =============== JOB =============== */
    job_delete (state, payload) {
      const index = state.jobs.findIndex(t => t.id === payload.id)
      if (index > -1) {
        state.jobs.splice(index, 1)
      }
    }
  },
  actions: {
    asideMobileToggle ({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideMobileExpanded
      document.getElementById('app').classList[isShow ? 'add' : 'remove']('ml-60')
      document.documentElement.classList[isShow ? 'add' : 'remove']('m-clipped')
      commit('basic', {
        key: 'isAsideMobileExpanded',
        value: isShow
      })
    },
    asideLgToggle ({ commit, state }, payload = null) {
      commit('basic', { key: 'isAsideLgActive', value: payload !== null ? payload : !state.isAsideLgActive })
    },
    formScreenToggle ({ commit, state }, value) {
      commit('basic', { key: 'isFormScreen', value })

      document.documentElement.classList[value ? 'add' : 'remove']('form-screen')
    },

    fetchJobs ({ commit }) {
      ApiService.get('job/pending-jobs')
        .then(handleResponse)
        .then(jobs => {
          commit('basic', {
            key: 'jobs',
            value: jobs.data || []
          })
        })
    },

    approveJob ({ commit }, payload) {
      ApiService.put('job/approve', payload)
        .then(() => {
          alert('Duyệt thành công')
          commit('job_delete', payload)
        })
        .catch(() => {
          alert('Duyệt không thành công')
        })
    },

    denyJob ({ commit }, payload) {
      ApiService.put('job/deny', payload)
        .then(() => {
          alert('Từ chối thành công')
          commit('job_delete', payload)
        })
        .catch(() => {
          alert('Từ chối không thành công')
        })
    },

    fetchStaff ({ commit }) {
      ApiService.get('admin')
        .then(handleResponse)
        .then(staffs => {
          commit('basic', {
            key: 'staffs',
            value: staffs.data || []
          })
        }).catch(handleResponse)
    }
  },
  modules: {
  }
})
