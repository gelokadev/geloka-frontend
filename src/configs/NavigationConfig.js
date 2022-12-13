import * as FrontEndUrl from '../constants/FrontendUrl';
import { DashboardOutlined, LogoutOutlined, AppstoreOutlined, TagOutlined, TeamOutlined } from '@ant-design/icons';

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
      submenu: [
        {
          breadcrumb: false,
          title: 'Catégories',
          key: 'commoditiy-categories',
          path: FrontEndUrl.HOUSE.COMMODITY.CATEGORY.LIST,
        },
        {
          breadcrumb: false,
          title: 'Commodités',
          key: 'commodity-self',
          path: FrontEndUrl.HOUSE.COMMODITY.LIST
        },
      ]
    },
    {
      breadcrumb: false,
      title: 'Catégories',
      key: 'categories',
      icon: TagOutlined,
      path: FrontEndUrl.HOUSE.CATEGORY.LIST,
    },
    {
      breadcrumb: false,
      title: 'Bailleurs',
      key: 'lessors',
      icon: TeamOutlined,
      path: FrontEndUrl.USER.LESSOR.LIST,
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
