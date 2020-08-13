import React from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Sider } = Layout;

export default function SideBar() {
    return (
        <Sider width={250} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['m1']}
                style={{ marginTop: '65px', height: 'calc(100% - 63px)', borderRight: 0 }}
            >
                <Menu.Item key="m1" icon={<QuestionCircleOutlined />}>Questions</Menu.Item>
                <Menu.Item key="m2" icon={<UserOutlined />}>Users</Menu.Item>
            </Menu>
        </Sider>
    );
}