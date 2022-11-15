import * as FrontEndUrl from '../constants/FrontendUrl';
import { DashboardOutlined, LogoutOutlined, AppstoreOutlined } from '@ant-design/icons';

export const adminNavTree = [{
  key: 'dashboards',
  title: 'Dashboard',
  icon: DashboardOutlined,
  breadcrumb: true,
  submenu: [
    {
      breadcrumb: false,
      key: 'commodities',
      title: 'Commodités',
      icon: AppstoreOutlined,
      path: FrontEndUrl.HOUSE.COMMODITY.SELF,
    },
  ]
}, {
  key: 'general',
  title: 'General',
  icon: DashboardOutlined,
  breadcrumb: true,
  submenu: [
    {
      key: 'general-logout',
      title: 'Déconnexion',
      icon: LogoutOutlined,
      breadcrumb: false,
      action: 'logout'
    },
  ]
}];

export const agentNavTree = [{
  key: 'dashboards',
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: true,
  submenu: [

  ]
}];
