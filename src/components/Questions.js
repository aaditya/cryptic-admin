import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Space, Button, Tooltip, DatePicker } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import moment from "moment";

import { DeleteLevel } from "../modals/Delete";
import GeneralModal from "../modals/General";

import { setKillswitch } from "../utils/questions";
import { getKillswitch } from "../actions/killswitch";

export default function Question() {
    const dispatch = useDispatch();
    let source = useSelector(state => state.questions);
    let ks = useSelector(state => state.killswitch);
    let [questions, setQuestions] = useState([]);
    let [modalView, setModalView] = useState(false);
    let [modalContext, setModalContext] = useState("");
    let [modalRecord, setModalRecord] = useState({});
    let [killswitch, setKs] = useState();

    useEffect(() => {
        if (source) setQuestions(Object.values(source).map((d, i) => ({ ...d, key: i })));
        if (ks) setKs(moment(ks));
    }, [source, ks]);

    const showModal = (context, record) => () => {
        setModalView(true);
        setModalContext(context);
        setModalRecord(record)
    }

    const setKsAPI = async (value) => {
        await setKillswitch(value.toISOString());
        dispatch(getKillswitch(value.toISOString()));
    }

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
                    <Tooltip placement="topLeft" title="Edit Level" arrowPointAtCenter><Button type="primary" icon={<EditOutlined />} onClick={showModal('edit-level', record)}></Button></Tooltip>
                    <Tooltip placement="topLeft" title="View Questions" arrowPointAtCenter><Button type="primary" icon={<EyeOutlined />} onClick={showModal('view-questions', record)}></Button></Tooltip>
                    <Tooltip placement="topLeft" title="Delete Level" arrowPointAtCenter><Button type="danger" icon={<DeleteOutlined />} onClick={DeleteLevel(record, dispatch)}></Button></Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <GeneralModal visible={modalView} parentVisible={setModalView} context={modalContext} record={modalRecord} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 15 }}>
                <DatePicker allowClear={false} value={killswitch} style={{ marginRight: 15 }} showTime placeholder="Killswitch" onOk={setKsAPI} />
                <Button type="primary" icon={<PlusOutlined />} onClick={showModal('add-level')}>Add Level</Button>
            </div>
            <Table
                columns={columns}
                dataSource={questions}
                pagination={{ defaultPageSize: 7, position: ['bottomCenter'] }}
            />
        </div>
    )
}