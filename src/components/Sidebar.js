import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined, QuestionCircleOutlined, LineChartOutlined } from '@ant-design/icons';
import { withRouter } from "react-router-dom";

const { Sider } = Layout;

function SideBar(props) {
    const { location } = props;
    const { pathname } = location;

    const [currentlySelected, setCurrentlySelected] = useState(
        pathname === "/" ? "home" : pathname
    );

    const handleClick = (e) => {
        setCurrentlySelected(e.key);

        if (e.key === "home") {
            return props.history.push("/");
        }

        props.history.push(`/${e.key}`);
    };

    return (
        <Sider width={250} className="site-layout-background">
            <Menu
                mode="inline"
                selectedKeys={currentlySelected}
                style={{ marginTop: 64, height: 'calc(100% - 64px)', borderRight: 0 }}
                onClick={handleClick}
            >
                <Menu.Item key="home" icon={<QuestionCircleOutlined />}>Questions</Menu.Item>
                <Menu.Item key="users" icon={<UserOutlined />}>Users</Menu.Item>
                <Menu.Item key="board" icon={<LineChartOutlined />}>Leaderboard</Menu.Item>
            </Menu>
        </Sider>
    );
}

export default withRouter(SideBar);