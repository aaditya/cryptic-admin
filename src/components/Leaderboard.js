import React, { useEffect, useState } from "react";
import { Table, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { getBoard } from "../utils/getQuestion";

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
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
    },
    {
        title: 'Questions',
        dataIndex: 'solved',
        key: 'solved',
    },
    {
        title: 'Completed On',
        dataIndex: 'date',
        key: 'date',
        render: text => new Date(text).toDateString()
    },
    {
        title: 'Time Spent (hh:mm:ss)',
        dataIndex: 'time',
        key: 'time',
        render: text => {
            let tm = parseFloat(text);
            let hours = tm / 60;
            let fh = parseInt(hours);
            let minutes = (hours - fh) * 60;
            let fm = parseInt(minutes);
            let seconds = (minutes - fm) * 60;
            let fs = parseInt(seconds);
            return `${fh}:${fm}:${fs}`
        }
    }
];

export default function Leaderboard() {
    let [board, setBoard] = useState([]);

    useEffect(() => {
        getBoard().then(lb => {
            setBoard(lb.map((b, i) => ({ ...b, key: i })));
        });
    }, []);

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 15 }}>
                <Button type="primary" icon={<DownloadOutlined />} >Download Results</Button>
            </div>
            <Table columns={columns} dataSource={board} />
        </div>
    )
}