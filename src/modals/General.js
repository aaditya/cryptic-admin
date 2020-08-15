import React, { useState, useEffect } from "react";
import { Modal } from 'antd';

import AddLevel from "./forms/AddLevel";
import AddQuestion from "./forms/AddQuestion"
import GetQuestion from "./GetQuestion";

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
                "title": "View Questions"
            },
            "add-question": {
                "title": "Add Question"
            },
            "edit-question": {
                "title": "Edit Question"
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
            {props.context === "view-questions" && <GetQuestion {...props} hide={hideModal} />}
            {["add-question", "edit-question"].includes(props.context) && <AddQuestion {...props} hide={hideModal} />}
        </Modal>
    )
}