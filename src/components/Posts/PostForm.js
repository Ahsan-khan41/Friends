import React, { useContext } from 'react'
import { Form, Input, Button, Upload } from 'antd';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireDB, storage } from '../../firebaseConfig';
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import CurrentUserContext from './../../ContextAPI/CurrentUserContext';
import "./Posts.css"


export const PostForm = () => {

    const [form] = Form.useForm();

    const {TextArea} = Input;
    // const storage = getStorage(db);

    const currentUserInfo = useContext(CurrentUserContext);
    console.log("posts form");

    const dataHandler = async (values, downloadURL, fileName) => {
        setDoc(doc(fireDB, "posts", `${fileName}`), {
            postedBy: currentUserInfo.uid,
            description: values.description,
            url: downloadURL,
            admin: currentUserInfo.name,
            postUid: fileName,
            adminProfile: currentUserInfo.profileUrl,
            time: serverTimestamp()
        })
        // console.log("Document written with ID: ", docRef.id);
    }

    const onFinish = (values) => {

        form.resetFields();
        const file = values.imageUrl[0].originFileObj;
        const Random = new Date().getTime();

        const storageRef1 = ref(storage, `posts/${Random}`);
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
                    // console.log('File available at', downloadURL);
                    // console.log(Random);
                    dataHandler(values, downloadURL, Random); //  Handler putting data to firebase
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

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div>
            <div style={{ marginBottom: 30 }}>
                    <Form
                        name="posts-form"
                        // labelCol={{ span: 6 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{textAlign: 'center'}}
                    >
                        <Form.Item
                            // label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input post description!' }]}
                        >
                            <TextArea rows={4} placeholder='Write caption...' />
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
                                maxCount={2}>
                                <Button type="primary" >Select form Computer</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 24 }}>
                            <Button type="primary" htmlType="submit" onClick={onReset} >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
            </div>
        </div>
    )
}
