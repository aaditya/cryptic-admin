import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Tooltip } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UserAddOutlined } from '@ant-design/icons';

import { refreshUsers, disableUser, grantAdmin } from "../utils/users";

export default function Users() {
    const dispatch = useDispatch();
    let source = useSelector(state => state.users);
    let [users, setUsers] = useState([]);

    useEffect(() => {
        if (source) {
            setUsers(Object.values(source).map((b, i) => ({ ...b, key: i })));
        }
    }, [source]);

    const manageUser = (action, id, status) => {
        return async function () {
            let stat = null;
            if (action === "disable") {
                stat = await disableUser(id, status);
            }
            if (action === "grant") {
                stat = await grantAdmin(id, status);
            }
            if (stat) {
                refreshUsers().then(dispatch);
            }
        }
    }

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: text => <p>{parseInt(text, 10) + 1}</p>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'School',
            dataIndex: 'school',
            key: 'school',
            render: text => <p>{text}</p>,
        },
        {
            title: 'Account Status',
            dataIndex: 'status',
            key: 'status',
            render: text => <p>{text === -1 ? "Disabled" : text === 0 ? "Not Activated" : "Activated"}</p>
        },
        {
            title: 'Admin',
            dataIndex: 'access',
            key: 'access',
            render: text => <p>{text === "admin" ? "Yes" : "No"}</p>
        },
        {
            title: 'Last Login',
            dataIndex: 'history',
            key: 'lastLogin',
            render: text => {
                let ll = text.lastLogin.slice(-1)[0];
                let ld = new Date(ll.accessOn).toDateString()
                return <p>{ld} from {ll.from}</p>
            }
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {record.access === "user"
                        ? <Tooltip placement="topLeft" title="Grant Admin" arrowPointAtCenter><Button type="primary" onClick={manageUser("grant", record._id, "admin")} icon={<UserAddOutlined />}></Button></Tooltip>
                        : <Tooltip placement="topLeft" title="Remove Admin" arrowPointAtCenter><Button type="danger" onClick={manageUser("grant", record._id, "user")} icon={<UserAddOutlined />}></Button></Tooltip>}
                    {record.status === -1
                        ? <Tooltip placement="topLeft" title="Enable User" arrowPointAtCenter><Button type="primary" onClick={manageUser("disable", record._id, 1)} icon={<EyeOutlined />}></Button></Tooltip>
                        : <Tooltip placement="topLeft" title="Disable User" arrowPointAtCenter><Button type="danger" onClick={manageUser("disable", record._id, -1)} icon={<EyeInvisibleOutlined />}></Button></Tooltip>}
                </Space>
            ),
        }
    ];

    return (
        <Table columns={columns} dataSource={users} pagination={{ defaultPageSize: 7, position: ['bottomCenter'] }} />
    )
}