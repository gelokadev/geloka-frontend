import * as FrontEndUrl from '../constants/FrontendUrl';
import { DashboardOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';

const userDashBoardNavTree = [{
  key: 'dashboards',
  title: 'Dashboard',
  icon: DashboardOutlined,
  breadcrumb: true,
  role: 'USER',
  submenu: [
    {
      key: 'dashboards-overview',
      path: FrontEndUrl.HOME,
      title: 'Overview',
      icon: AppstoreOutlined,
      breadcrumb: false,
      submenu: []
    },
  ]
}, {
  key: 'general',
  title: 'General',
  icon: DashboardOutlined,
  breadcrumb: true,
  role: 'USER',
  submenu: [
    {
      key: 'general-logout',
      title: 'Logout',
      icon: LogoutOutlined,
      breadcrumb: false,
      action: 'logout',
      submenu: []
    },
  ]
}];

const adminDashBoardTree = [{
  key: 'dashboards',
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: true,
  role: 'ADMIN',
  submenu: [

  ]
}];

const navigationConfig = [
  ...userDashBoardNavTree,
  ...adminDashBoardTree
]

export default navigationConfig;
