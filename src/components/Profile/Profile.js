import React from 'react'
import { Form, Input, Select, Tooltip, Button, Space, Typography } from 'antd';

export default function Profile() {

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const { Option } = Select;

    return (
        <div>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Profile Info</h1>
            <Form name="complex-form" onFinish={onFinish} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <Form.Item label="Username">
                    <Space>
                        <Form.Item
                            name="username"
                            noStyle
                            rules={[{ required: true, message: 'Username is required' }]}
                        >
                            <Input style={{ width: 160 }} placeholder="Please input" />
                        </Form.Item>
                        <Tooltip title="Useful information">
                            <Typography.Link href="#API">Need Help?</Typography.Link>
                        </Tooltip>
                    </Space>
                </Form.Item>
                <Form.Item label="Bio">
                    <Space>
                        <Form.Item
                            name="Your Bio"
                            noStyle
                            rules={[{ required: false}]}
                        >
                            <Input style={{ width: 220 }} placeholder="Write your bio" />
                        </Form.Item>
                    </Space>
                </Form.Item>
                <Form.Item label="Address">
                    <Input.Group compact>
                        <Form.Item
                            name={['address', 'province']}
                            noStyle
                            rules={[{ required: true, message: 'Province is required' }]}
                        >
                            <Select placeholder="Select province">
                                <Option value="Sindh">Sindh</Option>
                                <Option value="Punjab">Punjab</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={['address', 'street']}
                            noStyle
                            rules={[{ required: true, message: 'Street is required' }]}
                        >
                            <Input style={{ width: '20%' }} placeholder="Your City" />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
                    <Form.Item
                        name="year"
                        rules={[{ required: true }]}
                        style={{ display: 'inline-block', width: 'calc(20% - 8px)' }}
                    >
                        <Input type="date" placeholder="Input birth year" />
                    </Form.Item>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}