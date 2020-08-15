import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Space, Tag, Button, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import GeneralModal from "./General";
import { DeleteQuestion } from "./Delete";

export default function GetQuestion(props) {
    const dispatch = useDispatch();
    let [modalView, setModalView] = useState(false);
    let [modalContext, setModalContext] = useState("");
    let [modalRecord, setModalRecord] = useState({});

    const showModal = (context, record) => () => {
        setModalView(true);
        setModalContext(context);
        setModalRecord(record)
    }

    const columns = [
        {
            title: 'Type',
            dataIndex: 'qType',
            key: 'type',
            render: text => (
                <>
                    {text === "text"
                        ? <Tag color='geekblue' key={text}>{text.toUpperCase()}</Tag>
                        : <Tag color='volcano' key={text}>{text.toUpperCase()}</Tag>
                    }
                </>
            ),
        },
        {
            title: 'Text',
            dataIndex: 'text',
            key: 'text',
            render: text => <p>{text.substr(0, 8)}...</p>
        },
        {
            title: 'Hint Count',
            dataIndex: 'hints',
            key: 'hints',
            render: text => <p>{text.length}</p>
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip placement="topLeft" title="Edit Question" arrowPointAtCenter><Button type="primary" icon={<EditOutlined />} onClick={showModal('edit-question', record)}></Button></Tooltip>
                    <Tooltip placement="topLeft" title="Delete Question" arrowPointAtCenter><Button type="danger" icon={<DeleteOutlined />} onClick={DeleteQuestion(record.levelID, record._id, dispatch)}></Button></Tooltip>
                </Space>
            )
        },
    ];

    return (
        <>
            <GeneralModal visible={modalView} parentVisible={setModalView} context={modalContext} record={modalRecord} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
                <Button type="dashed" icon={<PlusOutlined />} disabled={props.record.questions.length === props.record.total} onClick={showModal('add-question', { _id: props.record._id })}>Add Question</Button>
            </div>
            <Table columns={columns} dataSource={props.record.questions.map((b, i) => ({ ...b, key: i, levelID: props.record._id }))} />
        </>
    )
}