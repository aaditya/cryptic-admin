import React from "react";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { deleteLevel, refreshQuestion } from "../utils/questions";

const { confirm } = Modal;

export default function DeleteLevel(level, dispatch) {
    return function () {
        confirm({
            title: 'Are you sure you want to delete this level ?',
            icon: <ExclamationCircleOutlined />,
            content: 'All related Questions will also be deleted.',
            onOk() {
                return new Promise((resolve, reject) => {
                    (async () => {
                        try {
                            await deleteLevel(level._id);
                            let levels = await refreshQuestion();
                            dispatch(levels);
                            resolve(true);
                        } catch (err) {
                            reject(err);
                        }
                    })();
                });
            },
            onCancel() { },
        });
    }
}