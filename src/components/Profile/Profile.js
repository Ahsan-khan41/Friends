import React, { useContext, useState, useEffect } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from '../../firebaseConfig';
import CurrentUserContext from '../../ContextAPI/CurrentUserContext';
import { Divider, Tabs } from 'antd'
import './Profile.css'
import { Setting } from './Setting/Setting';



export default function Profile() {

    const { TabPane } = Tabs;
    function callback(key) {
        console.log(key);
    }

    const [userName, setUserName] = useState();

    const currentUserInfo = useContext(CurrentUserContext);
    console.log(currentUserInfo);

    useEffect(() => {

        onSnapshot(doc(fireDB, "users", `${currentUserInfo.uid}`), (doc) => {
            const data = doc.data();
            if (undefined ?? data) { // nullish operator ??
                console.log("if");
                setUserName(data.name);
            } else {
                // console.log("else");
            }
        })

    }, [currentUserInfo])

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center', marginTop: '40px' }}>
                {/* Profile Pic */}
                <div style={{ display: 'inline-block' }}>
                   <img src={currentUserInfo.profileUrl}
                        style={{ borderRadius: '100%', width: '170px' }} />
                </div>

                <div style={{ display: 'inline-block', textAlign: 'left', marginLeft: 100, maxWidth: '350px' }}>
                    <p style={{ fontSize: '35px' }}>{userName}</p>
                    <span style={{ fontSize: '15px' }}><b>2  </b>Posts</span><span style={{ marginLeft: 10, fontSize: '15px' }}><b>10  </b>followers</span>
                    <Divider />
                    <p style={{ marginTop: 10, fontSize: '16px' }}>Bio Lorem Ipsum dolor sit amit Lorem Ipsum
                        dolor sit amit Lorem Ipsum dit amit Lorem Ipsum dolor sit amit</p>
                </div>

            </div>
            <Divider style={{ margin: 5 }} />
            <Tabs id='bottom-tabs' defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Posts" key="1">
                    Posts
                </TabPane>

                <TabPane tab="Setting" key="2">
                    <Setting />
                </TabPane>
            </Tabs>
        </>
    )
}
