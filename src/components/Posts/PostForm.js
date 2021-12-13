import React, { useState } from 'react'
import { Collapse, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebaseConfig';

export const PostForm = () => {

    const { Panel } = Collapse;
    // const storage = getStorage(db);

    const onFinish = (values) => {

        const file = values.upload[0].originFileObj;

        const storageRef1 = ref(storage, `posts/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef1, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );

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

    // const [postImage, setPostImage] = useState(null);

    // const handlePost = e => {
    //     if (e.target.files[0]) {
    //         setPostImage(e.target.files[0]);
    //     }
    // }

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
                                <Upload name="post" listType="picture" accept="image/*" multiple={false}
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
