import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setAuthUser } from "../actions/authUser";
import { openNotification } from "../components/Notification";
import { config } from "../utils/settings";

const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 6,
    }
};
const tailLayout = {
    wrapperCol: {
        offset: 9,
        span: 6,
    },
};

export default function Login() {
    let [loadings, setLoading] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            let { data } = await axios.post(`${config.url.API_URL}/api/v1/auth/login`, values);
            if (data.frame) {
                localStorage.setItem('access_token', data.data)
                dispatch(setAuthUser(true));
            } else {
                openNotification("Not Authorized");
            }
        } catch (err) {
            openNotification(err.response ? err.response.data.message : "Server Error. Please Try Again");
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = err => {
        setLoading(false);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div style={{ marginTop: "35vh" }}>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                hideRequiredMark={true}
                style={{ height: "30vh" }}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email is not valid',
                        },
                        {
                            required: true,
                            message: 'Email is required',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="pwd"
                    rules={[
                        {
                            required: true,
                            message: 'Password is required',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button style={{ marginRight: "8px" }} type="primary" loading={loadings} htmlType="submit">
                        Submit
                    </Button>
                    <Button style={{ marginRight: "8px" }} htmlType="button" onClick={onReset}>
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};