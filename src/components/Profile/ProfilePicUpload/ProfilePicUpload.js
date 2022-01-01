import React, { useContext } from 'react'
import { Form, Button, Upload, Avatar, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireDB, storage } from '../../../firebaseConfig';
import CurrentUserContext from '../../../ContextAPI/CurrentUserContext';
import { doc, updateDoc } from "firebase/firestore";

export const ProfilePicUpload = ({pic}) => {

    const currentUserInfo = useContext(CurrentUserContext);
    // console.log(currentUserInfo);

    //const [profileCheck, setProfileCheck] = useState(false);

    // useEffect(() => {

    //     if ('profileUrl' in currentUserInfo ?? setProfileCheck(false)) {
    //         console.log('profile pic exists');
    //         setProfileCheck(true)
    //     }

    // }, [currentUserInfo])


    const onFinish = (values) => {

        const file = values.imageUrl[0].originFileObj;
        const storageRef1 = ref(storage, `users/${currentUserInfo.uid}/${pic}`);
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
                    updateDoc(userRef, {
                        profileUrl: downloadURL
                    });
                    message.success('success');
                    //console.log(values);
                });
            }
        );


    };

    const onFinishFailed = (errorInfo) => {
        message.error('Submit Failed!');
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
                <Avatar size={64} src={currentUserInfo.profileUrl} />
            </div>
            {/* Form */}
            <Form
                style={{ margin: 20, textAlign: 'center' }}
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
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="post" listType="picture" accept="image/*" multiple={false}
                        maxCount={2}>
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 160}} >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
