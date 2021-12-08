import React from 'react'
import { Collapse, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export const PostForm = () => {

    const { Panel } = Collapse;

    const onFinish = (values) => {
        const file = values.upload[0].originFileObj;
        console.log('Success:', values);
        // const file = values.upload[0];
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e) => {
        console.log('Upload event:', e);

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    
    return (
        <div>
            <div style={{ marginBottom: 30 }}>
                <Collapse defaultActiveKey={['1']} >
                    <Panel header="Create Post" key="1">
                        <Form
                            name="posts-form"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Post Title"
                                name="post title"
                                rules={[{ required: true, message: 'Please input post title!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input post description!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{ offset: 0, span: 24 }}
                                name="upload"
                                label="Upload Image"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload name="logo" listType="picture" accept="image/*" multiple={false}
                                    maxCount={2}>
                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}
