import React from "react";
import { useDispatch } from "react-redux";
import { Dropdown, Avatar, Menu } from "antd";
import { withRouter } from "react-router-dom";

import { setAuthUser } from "../actions/authUser";

const { Item } = Menu;

function NavBar(props) {
    const dispatch = useDispatch();

    const logoutUser = () => {
        localStorage.clear();
        dispatch(setAuthUser(false));
        props.history.push('/');
    }

    const menu = (
        <Menu>
            <Item key="logout" onClick={logoutUser}>
                Logout
            </Item>
        </Menu>
    );

    return (
        <>
            <div>
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['home']}
                >
                </Menu>
            </div>
            <Dropdown overlay={menu}>
                <div className="flex-avatar-center">
                    <Avatar src="https://api.adorable.io/avatars/285/cryptixAdmin" style={{ marginRight: 16 }} />
                    <span>Admin</span>
                </div>
            </Dropdown>
        </>
    )
}

export default withRouter(NavBar);