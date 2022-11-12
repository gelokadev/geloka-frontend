import { Grid } from 'antd';
import utils from '../../utils';
import { connect } from "react-redux";
import { APP_NAME } from '../../configs/AppConfig';
import { SIDE_NAV_WIDTH, SIDE_NAV_COLLAPSED_WIDTH, NAV_TYPE_TOP } from '../../constants/ThemeConstant';

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  if(isMobile && !props.mobileLogo) {
    return 0
  }
  if(isNavTop) {
    return 'auto'
  }
  if(navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`
  } else {
    return `${SIDE_NAV_WIDTH}px`
  }
}

const getLogo = (props) => {
  const { navCollapsed, logoType } = props;
  if(logoType === 'light') {
    if(navCollapsed) {
      return '/dashboard/img/logo-sm-white.png'
    }
    return '/dashboard/img/logo-white.png'
  }

  if (navCollapsed) {
    return '/dashboard/img/logo-sm.png'
  }
  return '/dashboard/img/logo.png'
}

const getLogoDisplay = (isMobile, mobileLogo) => {
  if(isMobile && !mobileLogo) {
    return 'd-none'
  } else {
    return 'logo'
  }
}

export const Logo = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
  return (
    <div
      className={`${getLogoDisplay(isMobile, props.mobileLogo)} d-flex justify-content-center align-items-center`} 
      style={{width: `${getLogoWidthGutter(props, isMobile)}`}}>
      <img onClick={() => window.location.href = '/'} className="cursor-pointer" src={getLogo(props)} 
      alt={`${APP_NAME} logo`} style={{ width: '80%' }}/>
    </div>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType } =  theme;
  return { navCollapsed, navType }
};

export default connect(mapStateToProps)(Logo);
