import React, { useContext } from 'react'
import { Collapse, Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireDB, storage } from '../../firebaseConfig';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import CurrentUserContext from './../../ContextAPI/CurrentUserContext';

export const PostForm = () => {

    const { Panel } = Collapse;
    // const storage = getStorage(db);

    const currentUserInfo = useContext(CurrentUserContext);
    console.log(currentUserInfo);

    const dataHandler = async (values, downloadURL) => {
        const docRef = await addDoc(collection(fireDB, "posts"), {

            postedBy: currentUserInfo.uid,
            description: values.description,
            url: downloadURL,
            admin: currentUserInfo.displayName,
            adminProfile: currentUserInfo.profileUrl,
            time: serverTimestamp()
        })
        console.log("Document written with ID: ", docRef.id);
    }

    const onFinish = (values) => {

        const file = values.imageUrl[0].originFileObj;
        const storageRef1 = ref(storage, `posts/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef1, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    console.log(values);
                    dataHandler(values, downloadURL); //  Handler putting data to firebase
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
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input post description!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{ offset: 0, span: 24 }}
                                name="imageUrl"
                                label="Upload Image"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{ required: false }]}
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
