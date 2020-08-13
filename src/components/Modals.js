import React from "react";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { deleteLevel } from "../utils/getQuestion"; 

const { confirm } = Modal;

export function deleteLevelModal(level) {
    return function () {
        confirm({
            title: 'Are you sure you want to delete this level ?',
            icon: <ExclamationCircleOutlined />,
            content: 'All related Questions will also be deleted.',
            onOk() {
                return new Promise((resolve, reject) => {
                    deleteLevel(level._id).then(resolve).catch(reject);
                }).catch();
            },
            onCancel() { },
        });
    }
}