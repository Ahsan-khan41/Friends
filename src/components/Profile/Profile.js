import React, { useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from '../../firebaseConfig';
import CurrentUserContext from '../../ContextAPI/CurrentUserContext';
import { Divider, Tabs, Button, Popover } from 'antd'
import { CameraOutlined } from '@ant-design/icons';
import './Profile.css'
import { ProfilePicUpload } from './ProfilePicUpload/ProfilePicUpload';
import Avatar from 'antd/lib/avatar/avatar';
import Dashboard from '../../Pages/Dashboard/Dashboard';
// import { MyPosts2 } from './MyPosts/MyPosts'
import { MyPosts } from './MyPosts/MyPosts'
import { Setting } from '../Setting/Setting';


export default function Profile() {

    const content = (
        <div style={{ textAlign: 'center', maxWidth: '300px', padding: '20px' }}>
            <ProfilePicUpload pic={'profile'} />
        </div>
    );

    const { TabPane } = Tabs;

    function callback(key) {
        // console.log(key);
    }

    const [userName, setUserName] = useState();

    const currentUserInfo = useContext(CurrentUserContext);
    // console.log(currentUserInfo);

    useEffect(() => {

        onSnapshot(doc(fireDB, "users", `${currentUserInfo.uid}`), (doc) => {
            const data = doc.data();
            if (undefined ?? data) { // nullish operator ??
                // console.log("if");
                setUserName(data.name);
            } else {
                // console.log("else");
            }
        })

    }, [currentUserInfo])

    return (
        <>
            <Dashboard />
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', paddingTop: '10px', backgroundColor: '#fafafa' }}>
                {/* Profile Pic & Modal/Popover */}
                <div style={{ display: 'inline-block', marginTop: 15 }}>
                    <Avatar src={currentUserInfo.profileUrl} size={170} />
                    <Popover content={content} trigger="click">
                        <span style={{ position: "relative", left: -60, top: 70 }}>
                            <Button style={{ height: 48, width: 48, borderRadius: '50%' }}>
                                <CameraOutlined />
                            </Button>
                        </span>
                    </Popover>
                </div>

                <div style={{ display: 'inline-block', textAlign: 'left', marginLeft: 100, maxWidth: '350px' }}>
                    <p style={{ fontSize: '35px' }}>{userName}</p>
                    <span style={{ fontSize: '15px' }}>
                        <b>2  </b>Posts</span>
                    <span style={{ marginLeft: 10, fontSize: '15px' }}><b>10  </b>followers</span>
                    <Divider />
                    <p style={{ marginTop: 10, fontSize: '16px' }}>Bio Lorem Ipsum dolor sit amit Lorem Ipsum
                        dolor sit amit Lorem Ipsum dit amit Lorem Ipsum dolor sit amit</p>
                </div>

            </div>
            {/* <Divider style={{ margin: 5 }} /> */}
            <Tabs id='bottom-tabs' defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Posts" key="1">
                    <MyPosts />
                </TabPane>
                <TabPane tab="Setting" key="2">
                    <Setting />
                </TabPane>
            </Tabs>
        </>)
}