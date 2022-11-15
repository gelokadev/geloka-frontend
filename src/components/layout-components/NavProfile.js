import React from 'react';
import { Menu, Dropdown, Avatar } from "antd";
import UserService from "../../services/users";
import { USER_ROLE } from "../../configs/AppConfig";
import { EditOutlined, LogoutOutlined } from '@ant-design/icons';

const menuItem = [
	{
    role: USER_ROLE,
		icon: EditOutlined ,
		title: "Editer mon profil",
		path: "/",
  },
]

export const NavProfile = (props) => {

  const logoutUser = () => {
    UserService.logout().finally(() => {
      props.signOut();
    });
  }

  const profileImg = "https://robohash.org/23.238.193.4.png";

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <div>
          <Avatar size={30} src={profileImg} />
          </div>
          <div className="pl-2">
            <h4 className="mb-0">{ props.user?.fullName }</h4>
            <span className="text-muted">{ props.user?.email }</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          <Menu.Item key={menuItem.length + 1} onClick={() => logoutUser()}>
            <span>
              <LogoutOutlined />
              <span className="font-weight-normal">Déconnexion</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
}

export default NavProfile;
