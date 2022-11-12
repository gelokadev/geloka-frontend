import Logo from './Logo';
import utils from '../../utils'
import { Layout, Switch } from "antd";
import { connect } from "react-redux";
// import { NavPanel } from './NavPanel';
import { NavProfile } from "./NavProfile";
import { signOut } from '../../redux/actions/Auth';
import { useThemeSwitcher } from "react-css-theme-switcher";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from '../../constants/ThemeConstant';
import { toggleCollapsedNav, onMobileNavToggle, onHeaderNavColorChange, onSwitchTheme } from '../../redux/actions/Theme';

const { Header } = Layout;

export const HeaderNav = props => {

  const { signOut, user, navCollapsed, mobileNav, navType, headerNavColor, toggleCollapsedNav, 
    onMobileNavToggle, isMobile, currentTheme, direction, onSwitchTheme } = props;

  const { switcher, themes } = useThemeSwitcher();

  const onToggle = () => {
    if(!isMobile) {
      toggleCollapsedNav(!navCollapsed)
    } else {
      onMobileNavToggle(!mobileNav)
    }
  }

  const toggleTheme = (isChecked) => {
		onHeaderNavColorChange('')
		const changedTheme = isChecked ? 'dark' : 'light'
		onSwitchTheme(changedTheme)
    switcher({ theme: themes[changedTheme] });
  };

  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  const mode = ()=> {
    if(!headerNavColor) {
      return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff' )
    }
    return utils.getColorContrast(headerNavColor)
  }
  const navMode = mode()
  const getNavWidth = () => {
    if(isNavTop || isMobile) {
      return '0px'
    }
    if(navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`
    } else {
      return `${SIDE_NAV_WIDTH}px`
    }
  }

  return (
    <Header className={`app-header ${navMode}`} style={{backgroundColor: headerNavColor}}>
      <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
        <Logo logoType={navMode}/>
        <div className="nav" style={{width: `calc(100% - ${getNavWidth()})`}}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">          
              {
                isNavTop && !isMobile ?
                null
                :
                <li className="ant-menu-item ant-menu-item-only-child" onClick={() => {onToggle()}}>
                  {navCollapsed || isMobile ? <MenuUnfoldOutlined className="nav-icon" /> : <MenuFoldOutlined className="nav-icon" />}
                </li>
              }
            </ul>
          </div>
          <div className="nav-right">
            <div style={{ width: '150px' }}>
              <img src={`/dashboard/img/others/${currentTheme === 'dark' ? 'moon' : 'sun'}.png`} alt='Theme icon' width={'25px'}/>
              <Switch checked={currentTheme === 'dark'} onChange={toggleTheme} style={{ marginLeft: '10px' }}/>
            </div>
            <NavProfile direction={direction} user={user} signOut={signOut}  />
            {/* <NavPanel direction={direction} /> */}
          </div>
        </div>
      </div>
    </Header>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction } =  theme;
  const { user } =  auth;
  return { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, direction, user }
};

export default connect(mapStateToProps, {toggleCollapsedNav, onMobileNavToggle, signOut, onHeaderNavColorChange, onSwitchTheme})(HeaderNav);