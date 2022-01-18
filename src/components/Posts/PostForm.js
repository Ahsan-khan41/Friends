import React, { useContext, useState } from 'react'
import { Form, Input, Button, Upload, message, Progress } from 'antd';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireDB, storage } from '../../firebaseConfig';
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import CurrentUserContext from './../../ContextAPI/CurrentUserContext';
import "./Posts.css"


export const PostForm = ({ closeModal }) => {

    const [form] = Form.useForm();

    const { TextArea } = Input;

    const [progress, setProgress] = useState(0)
    const currentUserInfo = useContext(CurrentUserContext);

    const dataHandler = async (values, downloadURL, fileName) => {

        if (currentUserInfo.profileUrl) {
            setDoc(doc(fireDB, "posts", `${fileName}`), {
                postedBy: currentUserInfo.uid,
                description: values.description,
                url: downloadURL,
                admin: currentUserInfo.name,
                postUid: fileName,
                adminProfile: currentUserInfo.profileUrl,
                time: serverTimestamp()
            })
            setProgress(0);
        } else {
            message.error('First Upload your Profile picture!')
        }

    }


    const onFinish = (values) => {


        const file = values.imageUrl[0].originFileObj;
        const Random = new Date().getTime();

        const storageRef1 = ref(storage, `posts/${Random}`);
        const uploadTask = uploadBytesResumable(storageRef1, file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                message.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    dataHandler(values, downloadURL, Random); //  Handler putting data to firebase
                    closeModal(); //getting as a destructure prop
                    form.resetFields();
                });
            }
        );
    };

    const onFinishFailed = (errorInfo) => {
        message.error("Fill it Correctly please");
    };

    const normFile = (e) => {

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <div style={{ padding: 20 }}>
            <Form
                name="posts-form"
                form={form}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ textAlign: 'center' }}
            >
                <Form.Item
                    label="Caption"
                    name="description"
                    rules={[{ required: true, message: 'Please input post description!' }]}
                >
                    <TextArea rows={3} placeholder='Write caption...' />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 0, span: 24 }}
                    name="imageUrl"
                    // label="Upload Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: false }]}
                >
                    <Upload name="post" listType="picture" accept="image/*" multiple={false}
                        maxCount={1}>
                        <Button type="primary" >Select form Computer</Button>
                    </Upload>
                </Form.Item>

                <Form.Item style={{ marginBottom: 20 }}>
                    <Progress style={{marginBottom: 20}} percent={progress} />
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
