import React, { useContext, useState, useEffect } from 'react'
import { Form, Button, Upload, Avatar } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireDB, storage } from '../../../firebaseConfig';
import CurrentUserContext from './../../../ContextAPI/CurrentUserContext';
import { doc, updateDoc } from "firebase/firestore";

export const Setting = () => {

    const currentUserInfo = useContext(CurrentUserContext);
    console.log(currentUserInfo);

    const [profileCheck, setProfileCheck] = useState(false);

    useEffect(() => {

        if ('profileUrl' in currentUserInfo ?? setProfileCheck(false)) {
            console.log('profile pic exists');
            setProfileCheck(true)
        }

    }, [currentUserInfo])



    const FormData = async (values, downloadURL) => {
        // const docRef = await addDoc(collection(fireDB, "posts"), {
        //     postTitle: values.postTitle,
        //     description: values.description,
        //     url: downloadURL
        // });
        // await setDoc(doc(fireDB, "users", `${currentUserInfo.uid}`), {
        //     name: "Los Angeles",
        //     state: "CA",
        //     country: "USA"
        //   });
        // console.log("Document written with ID: ", docRef.id);
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

                    //Adding Profile pic to DataBase

                    const userRef = doc(fireDB, "users", `${currentUserInfo.uid}`);
                    // Set the "capital" field of the city 'DC'
                    updateDoc(userRef, {
                        profileUrl: downloadURL
                    });

                    //console.log(values);
                    FormData(values, downloadURL); //  put data to firebase

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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'inline-block', textAlign: 'center' }}>
                {profileCheck ? <img src={currentUserInfo.profileUrl}
                    style={{ borderRadius: '100%', width: '70px' }} /> : <Avatar icon={<UserOutlined />} />}
            </div>
            {/* Form */}
            <Form
                style={{ margin: 20 }}
                name="posts-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    wrapperCol={{ offset: 0, span: 24 }}
                    name="imageUrl"
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
        </div>
    )
}
