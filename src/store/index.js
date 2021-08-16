import axios from 'axios'
import { createStore } from 'vuex'
import { ApiService } from '../services/api.service'
import { authenticationService } from '../services/authentication.service'
import { handleResponse } from '../utils/handle-response'
import { Role } from '../utils/enum'
import { GetQuarter } from '../utils/helper'
import FileSaver from 'file-saver'

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

    menus: [],

    workingforms: [],
    locations: [],

    staffs: [],
    jobs: [],

    monthReport: new Date().getMonth() + 1,
    monthReportData: {},
    quarterReport: GetQuarter(new Date().getMonth() + 1),
    quarterReportData: {},
    yearReportData: {},
    dashboardReportData: {}
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

    menuRole (state, payload) {
      state.menus = payload
    },

    /* =============== JOB =============== */
    job_delete (state, payload) {
      const index = state.jobs.findIndex(t => t.id === payload.id)
      if (index > -1) {
        state.jobs.splice(index, 1)
      }
    },

    /* =============== Staff =============== */
    staff_insert (state, payload) {
      state.staffs.push(payload)
    },

    banned_staff (state, payload) {
      const index = state.staffs.findIndex(t => t.id === payload.id)
      if (index > -1) {
        state.staffs[index].isBanned = payload.isBanned
      }
    },

    setMonthReport (state, payload) {
      state.monthReport = payload
    },
    setQuarterReport (state, payload) {
      state.quarterReport = payload
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

    fetchLocation ({ commit }) {
      axios.get('data-sources/location.json')
        .then(locations => {
          commit('basic', {
            key: 'locations',
            value: locations.data
          })
        })
    },

    fetchWorkingForm ({ commit }) {
      axios.get('data-sources/working-form.json')
        .then(workingforms => {
          commit('basic', {
            key: 'workingforms',
            value: workingforms.data
          })
        })
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
    },

    StaffInsert ({ commit }, payload) {
      ApiService.post('admin/create', payload)
        .then(() => {
          commit('staff_insert', payload)
        }).catch(handleResponse)
    },

    BannedStaff ({ commit }, payload) {
      if (payload.isBanned) {
        ApiService.remove('admin/ban/staff/' + payload.id)
          .then(handleResponse)
          .then(staffs => {
            alert('Khóa tài khoản thành công')
            commit('banned_staff', payload)
          }).catch(handleResponse)
      } else {
        ApiService.put('admin/unban/staff/' + payload.id)
          .then(handleResponse)
          .then(staffs => {
            alert('Mở khóa tài khoản thành công')
            commit('banned_staff', payload)
          }).catch(handleResponse)
      }
    },

    changePassword ({ commit }, payload) {
      ApiService.put((authenticationService.currentUserValue.role === Role.Admin ? 'admin' : 'staff') + '/update/password', payload)
        .then(handleResponse)
        .then(() => {
          alert('Đổi mật khẩu thành công')
        }).catch(handleResponse)
    },

    getMonthReport ({ commit }, payload) {
      ApiService.get('/admin/report/by-month?month=' + payload)
        .then(handleResponse)
        .then(res => {
          commit('basic', {
            key: 'monthReportData',
            value: res.data
          })
        }).catch(handleResponse)
    },

    getQuarterReport ({ commit }, payload) {
      ApiService.get('/admin/report/by-quarter?quarter=' + payload)
        .then(handleResponse)
        .then(res => {
          commit('basic', {
            key: 'quarterReportData',
            value: res.data
          })
        }).catch(handleResponse)
    },
    getYearReport ({ commit }) {
      ApiService.get('/admin/report/by-year')
        .then(handleResponse)
        .then(res => {
          commit('basic', {
            key: 'yearReportData',
            value: res.data || {}
          })
        }).catch(handleResponse)
    },
    getDashboardReport ({ commit }) {
      ApiService.get('/admin/dashboard-data')
        .then(handleResponse)
        .then(res => {
          commit('basic', {
            key: 'dashboardReportData',
            value: res.data || {}
          })
        }).catch(handleResponse)
    },
    downloadReport ({ state }) {
      ApiService.post('/admin/generate-report', { month: state.monthReport, quarter: state.quarterReport }, true, true)
        .then(res => {
          FileSaver.saveAs(res.data, 'report_file.xlsx')
        }).catch(handleResponse)
    }
  },
  modules: {
  }
})
