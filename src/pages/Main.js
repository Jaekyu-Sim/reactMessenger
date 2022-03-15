import React, { useState } from "react";
import {Button, Form, Input} from "antd"
import io from 'socket.io-client';
import { Link } from "react-router-dom";

const socket =  io.connect('http://localhost:5000');

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

    const [form] = Form.useForm();
    const [userId, setUserId] = useState("");
    
    return (
        <div style={{textAlign:"center"}}>
            <div>
                <img src="../yalari.gif">
                </img>
            </div>
            <div>
                <Form {...layout} form={form}>
                    <Form.Item
                        name="Name"
                        label="Name"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input onChange={(e) => {setUserId(e.target.value)}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Link to={`/chat?userId=${userId}`}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Main;