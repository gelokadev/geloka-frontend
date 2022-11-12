import React from 'react';
import utils from '../../utils';
import { Layout, Grid } from "antd";
import { connect } from 'react-redux';
import AppViews from '../../views/app-views';
import { useThemeSwitcher } from "react-css-theme-switcher";
import navigationConfig from "../../configs/NavigationConfig";
import TopNav from '../../components/layout-components/TopNav';
import Footer from '../../components/layout-components/Footer';
import SideNav from '../../components/layout-components/SideNav';
import Loading from '../../components/shared-components/Loading';
import MobileNav from '../../components/layout-components/MobileNav';
import HeaderNav from '../../components/layout-components/HeaderNav';
import PageHeader from '../../components/layout-components/PageHeader';
import {  SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_SIDE, 
  NAV_TYPE_TOP, DIR_RTL, DIR_LTR } from '../../constants/ThemeConstant';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AppLayout = ({ navCollapsed, navType, location, direction }) => {

  const currentRouteInfo = utils.getRouteInfo(navigationConfig, location.pathname)
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg')
  const isNavSide = navType === NAV_TYPE_SIDE
  const isNavTop = navType === NAV_TYPE_TOP
  const getLayoutGutter = () => {
    if(isNavTop || isMobile) {
      return 0
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH
  }

  const { status } = useThemeSwitcher();

  if (status === 'loading') {
    return <Loading cover="page" />;
  }

  const getLayoutDirectionGutter = () => {
    if(direction === DIR_LTR) {
      return {paddingLeft: getLayoutGutter()}
    }  
    if(direction === DIR_RTL) {
      return {paddingRight: getLayoutGutter()}
    }
    return {paddingLeft: getLayoutGutter()}
  }

  return (
    <Layout>
      <HeaderNav isMobile={isMobile}/>
      {(isNavTop && !isMobile) ? <TopNav routeInfo={currentRouteInfo}/> : null}
      <Layout className="app-container">
        {(isNavSide && !isMobile) ? <SideNav routeInfo={currentRouteInfo}/> : null }
        <Layout className="app-layout" style={getLayoutDirectionGutter()}>
          <div className={`app-content ${isNavTop ? 'layout-top-nav' : ''}`}>
            <PageHeader display={currentRouteInfo?.breadcrumb} title={currentRouteInfo?.title} />
            <Content>
              <AppViews />
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {isMobile && <MobileNav />}
    </Layout>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { user } =  auth;
  const { navCollapsed, navType, locale } =  theme;
  return { navCollapsed, navType, locale, user }
};

export default connect(mapStateToProps)(React.memo(AppLayout));