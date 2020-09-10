import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Space, Tooltip } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UserAddOutlined, CheckOutlined } from '@ant-design/icons';

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
                let ll = test ? text.lastLogin.slice(-1)[0] : new Date();
                let ld = new Date(ll.accessOn).toDateString()
                return <p>{ld} from {ll.from}</p>
            }
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip placement="topLeft" title="Activate User" arrowPointAtCenter>
                        <Button type="primary" className="btn-green" disabled={record.status !== 0} onClick={manageUser("disable", record._id, 1)} icon={<CheckOutlined />}></Button>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={record.access === "user" ? "Grant Admin" : "Remove Admin"} arrowPointAtCenter>
                        <Button type={record.access === "user" ? "primary" : "danger"} disabled={record.status === -1} onClick={manageUser("grant", record._id, `${record.access === "user" ? "admin" : "user"}`)} icon={<UserAddOutlined />}></Button>
                    </Tooltip>
                    <Tooltip placement="topLeft" title={record.status === -1 ? "Enable User" : "Disable User"} arrowPointAtCenter>
                        <Button type={record.status === -1 ? "primary" : "danger"} disabled={record.access === "admin"} onClick={manageUser("disable", record._id, `${record.status * -1}`)} icon={record.status === -1 ? <EyeOutlined /> : <EyeInvisibleOutlined />}></Button>
                    </Tooltip>
                </Space>
            ),
        }
    ];

    return (
        <Table columns={columns} dataSource={users} pagination={{ defaultPageSize: 7, position: ['bottomCenter'] }} />
    )
}