import React from "react";
import {Button, Form, Input} from "antd"
const Main = () => {
    const layout = {
        labelCol: {
          span: 9,
        },
        wrapperCol: {
          span: 6,
        },
    };
    const tailLayout = {
    wrapperCol: {
        offset: 9,
        span: 6,
    },
    };

    const onSubmit = () => {
        console.log("button clicked");
    }

    const [form] = Form.useForm();

    return (
        <div style={{textAlign:"center"}}>
            <div>
                <img src="../logo512.png">
                </img>
            </div>
            <div>
                <Form {...layout} form={form} onFinish={onSubmit}>
                    <Form.Item
                        name="Name"
                        label="Name"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Main;