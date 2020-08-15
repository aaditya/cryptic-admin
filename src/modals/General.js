import React, { useState, useEffect } from "react";
import { Modal } from 'antd';

import AddLevel from "./forms/AddLevel";

export default function GeneralModal(props) {
    let [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);

    const hideModal = () => {
        setVisible(false);
        props.parentVisible(false);
    }

    const getTitle = (context) => {
        return {
            "add-level": {
                "title": "Add Level Info"
            },
            "edit-level": {
                "title": "Edit Level Info"
            },
            "view-questions": {
                "title": "Get Level Questions"
            },
            "default": {
                "title": "General Modal"
            }
        }[context || "default"]
    }

    return (
        <Modal
            title={getTitle(props.context).title}
            visible={visible}
            onCancel={hideModal}
            footer={null}
        >
            {["add-level", "edit-level"].includes(props.context) && <AddLevel {...props} hide={hideModal} />}
        </Modal>
    )
}