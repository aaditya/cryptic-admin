import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button } from 'antd';

import { addLevel, refreshQuestion, editLevel } from "../../utils/questions";

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16
    },
};

export default function AddLevel(props) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        form.resetFields();
    }, [form, props.record]);

    const onFinish = async (values) => {
        let { level, count } = values;
        if (!props.record) {
            await addLevel(level, count);
        } else {
            await editLevel(props.record._id, count);
        }
        refreshQuestion().then(dispatch);
        props.hide();
    };

    const onReset = () => {
        form.resetFields();
    };

    const getFilled = () => {
        if (props.record) {
            return {
                level: props.record.level,
                count: props.record.total
            }
        }
        return {};
    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={getFilled()} hideRequiredMark={true}>
            <Form.Item name="level" label="Level" rules={[{ required: true, message: "Level is required" }]}>
                <Input disabled={props.record} />
            </Form.Item>
            <Form.Item name="count" label="Questions Count" rules={[{ required: true, message: "Count is required" }]}>
                <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" style={{ marginRight: 8 }} htmlType="submit">{props.record ? "Edit" : "Add"}</Button>
                <Button htmlType="button" style={{ marginRight: 8 }} onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
}