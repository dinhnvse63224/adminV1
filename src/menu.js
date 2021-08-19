import {
  mdiDesktopMac,
  mdiAccount,
  mdiAlphaJBox,
  mdiImageAlbum
} from '@mdi/js'
import { Role } from './utils/enum'

export const Menu = [
  {
    to: '/',
    icon: mdiDesktopMac,
    label: 'Dashboard',
    authorize: [Role.Admin]
  },
  {
    to: '/staff',
    label: 'Quản lý nhân viên',
    icon: mdiAccount,
    authorize: [Role.Admin]
  },
  {
    to: '/recruiter',
    label: 'Nhà tuyển dụng',
    icon: mdiAccount,
    authorize: [Role.Admin]
  },
  {
    to: '/student',
    label: 'Sinh viên',
    icon: mdiAccount,
    authorize: [Role.Admin]
  },
  {
    to: '/job',
    label: 'Duyệt công việc',
    icon: mdiAlphaJBox,
    authorize: [Role.Staff]
  },
  {
    to: '/banner',
    label: 'Banner',
    icon: mdiImageAlbum,
    authorize: [Role.Staff]
  }
]
