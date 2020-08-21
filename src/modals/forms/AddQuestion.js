import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { refreshQuestion, manageQuestion } from "../../utils/questions";

const { Option } = Select;

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
        if (!props.record.text) {
            let body = { ...values, levelId: props.record._id };
            await manageQuestion('add', body);
        } else {
            let body = { ...values, levelId: props.record.levelID, qId: props.record._id }
            await manageQuestion('edit', body);
        }
        refreshQuestion().then(dispatch);
        props.hide();
    };

    const onReset = () => {
        form.resetFields();
    };

    const getFilled = () => {
        if (props.record.text) {
            return {
                type: props.record.qType,
                question: props.record.text,
                hints: props.record.hints
            }
        }
        return {};
    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={getFilled()} hideRequiredMark={true}>
            <Form.Item label="Question">
                <Input.Group compact>
                    <Form.Item
                        name='type'
                        noStyle
                        rules={[{ required: true, message: 'Type is required' }]}
                    >
                        <Select placeholder="Type">
                            <Option value="text">Text</Option>
                            <Option value="image">Image</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='question'
                        noStyle
                        rules={[{ required: true, message: 'Question is required' }]}
                    >
                        <Input style={{ width: '50%' }} />
                    </Form.Item>
                </Input.Group>
            </Form.Item>

            <Form.Item name="answer" label="Answer" rules={[{ required: !props.record, message: "Answer is required" }]}>
                <Input placeholder={props.record.text ? "Answer cannot be viewed" : "Answer"} />
            </Form.Item>

            <Form.List {...layout} name="hints">
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map(field => (
                                <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'name']}
                                        fieldKey={[field.fieldKey, 'name']}
                                    >
                                        <Input placeholder="Name" />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        name={[field.name, 'data']}
                                        fieldKey={[field.fieldKey, 'data']}
                                    >
                                        <Input placeholder="Data" />
                                    </Form.Item>

                                    <MinusCircleOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    style={{ marginLeft: 8 }}
                                    onClick={() => {
                                        add();
                                    }}
                                    block
                                >
                                    <PlusOutlined /> Add Hints
                                    </Button>
                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>

            <Form.Item {...tailLayout}>
                <Button type="primary" style={{ marginRight: 8 }} htmlType="submit">{props.record.text ? "Edit" : "Add"}</Button>
                <Button htmlType="button" style={{ marginRight: 8 }} onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
}