import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Space, Button, Tooltip } from 'antd';
import { AppstoreAddOutlined, EyeOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

import { deleteLevelModal } from "../modals/DeleteLevel";

export default function Question() {
    let source = useSelector(state => state.questions);
    let [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (source) {
            setQuestions(Object.values(source).map((d, i) => ({ ...d, key: i })));
        }
    }, [source]);

    const columns = [
        {
            title: 'S.No',
            dataIndex: 'key',
            key: 'key',
            render: text => <p>{parseInt(text) + 1}</p>,
        },
        {
            title: 'Level',
            dataIndex: 'level',
            key: 'level',
        },
        {
            title: 'Total Questions',
            dataIndex: 'total',
            key: 'total',
        },
        {
            title: 'Questions in Level',
            dataIndex: 'questions',
            key: 'questions',
            render: text => <p>{text.length}</p>
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip placement="topLeft" title="Add Question" arrowPointAtCenter><Button type="primary" icon={<AppstoreAddOutlined />}></Button></Tooltip>
                    <Tooltip placement="topLeft" title="Edit Level" arrowPointAtCenter><Button type="primary" icon={<EditOutlined />}></Button></Tooltip>
                    <Tooltip placement="topLeft" title="View Questions" arrowPointAtCenter><Button type="primary" icon={<EyeOutlined />}></Button></Tooltip>
                    <Tooltip placement="topLeft" title="Delete Level" arrowPointAtCenter><Button type="danger" icon={<DeleteOutlined />} onClick={deleteLevelModal(record)}></Button></Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 15 }}>
                <Button type="primary" icon={<PlusOutlined />}>Add Level</Button>
            </div>
            <Table columns={columns} dataSource={questions} />
        </div>
    )
}