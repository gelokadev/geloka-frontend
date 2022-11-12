import utils from '../../utils';
import { Menu, Grid } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Icon from "../util-components/Icon";
import { signOut } from '../../redux/actions/Auth';
import { onMobileNavToggle } from "../../redux/actions/Theme";
import navigationConfig from "../../configs/NavigationConfig";
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from "../../constants/ThemeConstant";

const { SubMenu } = Menu;
const { useBreakpoint } = Grid;

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = "";
  if (key) {
    const arr = key.split("-");
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

const SideNavContent = (props) => {
	const { sideNavTheme, routeInfo, hideGroupTitle, onMobileNavToggle, user } = props;
	const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
	const closeMobileNav = () => {
		if (isMobile) {
			onMobileNavToggle(false)
		}
	}

  const actions = (type) => {
    switch (type) {
      case "logout":
          props.signOut();
        break;
    
      default:
        break;
    }
  }

  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
      mode="inline"
      style={{ height: "100%", borderRight: 0 }}
      defaultSelectedKeys={[routeInfo?.key]}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      className={hideGroupTitle ? "hide-group-title" : ""}
    >
      {navigationConfig.filter(navConfig => navConfig.role.toUpperCase() === user?.role.toUpperCase()).map((menu) =>
        menu.submenu.length > 0 ? (
          <Menu.ItemGroup
            key={menu.key}
            title={menu.title}
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  key={subMenuFirst.key}
                  title={subMenuFirst.title}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      {subMenuSecond.icon ? (
                        <Icon type={subMenuSecond?.icon} />
                      ) : null}
                      <span>
                        {subMenuSecond.title}
                      </span>
                      <Link onClick={() => closeMobileNav()} to={subMenuSecond.path} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key} onClick={() => {
                  if(subMenuFirst.action) actions(subMenuFirst.action)
                }}>
                  {subMenuFirst.icon ? <Icon type={subMenuFirst.icon} /> : null}
                  <span>{subMenuFirst.title}</span>
                  <Link onClick={() => closeMobileNav()} to={subMenuFirst.path} />
                </Menu.Item>
              )
            )}
          </Menu.ItemGroup>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{menu?.title}</span>
            {menu.path ? <Link onClick={() => closeMobileNav()} to={menu.path} /> : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const TopNavContent = (props) => {
  const { topNavColor, user } = props;
  return (
    <Menu mode="horizontal" style={{ backgroundColor: topNavColor }}>
      {navigationConfig.filter(navConfig => navConfig.role.toUpperCase() === user?.role.toUpperCase()).map((menu) =>
        menu.submenu.length > 0 ? (
          <SubMenu
            key={menu.key}
            popupClassName="top-nav-menu"
            title={
              <span>
                {menu.icon ? <Icon type={menu?.icon} /> : null}
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.submenu.map((subMenuFirst) =>
              subMenuFirst.submenu.length > 0 ? (
                <SubMenu
                  key={subMenuFirst.key}
                  popupClassName="top-nav-menu"
                  icon={
                    subMenuFirst.icon ? (
                      <Icon type={subMenuFirst?.icon} />
                    ) : null
                  }
                  title={subMenuFirst.title}
                >
                  {subMenuFirst.submenu.map((subMenuSecond) => (
                    <Menu.Item key={subMenuSecond.key}>
                      <span>
                        {subMenuSecond.title}
                      </span>
                      <Link to={subMenuSecond.path} />
                    </Menu.Item>
                  ))}
                </SubMenu>
              ) : (
                <Menu.Item key={subMenuFirst.key}>
                  {subMenuFirst.icon ? (
                    <Icon type={subMenuFirst?.icon} />
                  ) : null}
                  <span>{subMenuFirst.title}</span>
                  <Link to={subMenuFirst.path} />
                </Menu.Item>
              )
            )}
          </SubMenu>
        ) : (
          <Menu.Item key={menu.key}>
            {menu.icon ? <Icon type={menu?.icon} /> : null}
            <span>{menu?.title}</span>
            {menu.path ? <Link to={menu.path} /> : null}
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

const MenuContent = (props) => {
  return props.type === NAV_TYPE_SIDE ? (
    <SideNavContent {...props} />
  ) : (
    <TopNavContent {...props} />
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { user } = auth;
  const { sideNavTheme, topNavColor } = theme;
  return { sideNavTheme, topNavColor, user };
};

export default connect(mapStateToProps, { onMobileNavToggle, signOut })(MenuContent);
