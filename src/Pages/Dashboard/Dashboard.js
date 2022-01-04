import React, { useState, useContext, useEffect } from 'react';
import { Button, Divider, Layout, Popover, Input, Avatar, Modal } from 'antd';
import Logo from '../../Icons/Logo.svg';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import CurrentUserContext from './../../ContextAPI/CurrentUserContext';
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from '../../firebaseConfig';
import './Dashboard.css'
import { HomeOutlined, AppstoreAddOutlined, MessageOutlined, HeartOutlined, CompassOutlined, SearchOutlined, UserOutlined, SyncOutlined, BookOutlined, SettingOutlined } from "@ant-design/icons";
import { PostForm } from '../../components/Posts/PostForm';


export default function Dashboard() {


    let navigate = useNavigate();
    const signOutFunc = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("User Logged Out!");
            navigate("/login");
        }).catch((error) => {
            // An error happened.
            console.log("error Loggeing Out: ", error);
        });

    }

    const [postModalVisible, setPostModalVisible] = useState(false)

    const [data, setData] = useState(' ');

    const currentUserInfo = useContext(CurrentUserContext);
    // console.log(currentUserInfo);
    console.log("dashboard");

    useEffect(() => {

        onSnapshot(doc(fireDB, "users", `${currentUserInfo.uid}`), (doc) => {
            //console.log("Current data: ", doc.data());
            const userInfo = doc.data();
            if (undefined ?? userInfo) { // nullish operator ??
                // console.log("if");
                setData(userInfo);
            } else {
                // loader...
            }

        });

    }, [currentUserInfo])


    const content = (
        <div style={{ width: '200px' }}>
            {/* <Avatar size={80} style={{ marginBottom: '10px' }}
                src={currentUserInfo.profileUrl} /><br />
            <span style={{ size: 25, fontWeight: '500' }}>{data.name}</span><br />
            <span style={{ size: 20, margin: '20px' }}>{data.email}</span><br />
            <Button style={{ borderRadius: 25, marginTop: '10px' }}>
                <p style={{ size: 15 }}><Link to="/profile">Manage your Account</Link></p>
            </Button>
            <Divider />
            <Button style={{ borderRadius: 5 }} onClick={signOutFunc}>Sign out</Button> */}

            <div style={{padding: "8px 16px"}}><UserOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }} /> Profile</div>
            <div style={{padding: "8px 16px"}}><BookOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }} /> Saved</div>
            <div style={{padding: "8px 16px"}}><SettingOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }} />Setting</div>
            <div style={{padding: "8px 16px"}}><SyncOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }} /> Accounts</div>
            <Divider style={{backgroundColor: '#dbdbdb', margin: 0}}/>
            <div style={{padding: "8px 16px"}} onClick={signOutFunc}>Log out</div>
        </div>
    );


    const { Header, Content, Footer } = Layout;

    return (
        <>
            <Layout>
                <Header style={{ background: '#fff', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="logo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 975, height: 60, padding: "0px 20px" }} >
                        <span><img src={Logo} alt='friends-logo' style={{ width: 130 }} /></span>
                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Input size="large" placeholder="Search" prefix={<SearchOutlined style={{ color: '#8e8e8e', fontSize: 13, marginRight: 5 }} />} />
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/">
                                <HomeOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 25 }} />
                            </Link>
                            <MessageOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 25, paddingLeft: 24 }} />
                            <AppstoreAddOutlined onClick={() => setPostModalVisible(true)} style={{ color: "rgb(38, 38, 38)", fontSize: 25, paddingLeft: 24 }} />
                            <CompassOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 25, paddingLeft: 24 }} />
                            <HeartOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 25, paddingLeft: 24 }} />
                            <Popover content={content} trigger="click">
                                <Avatar size={30} style={{ marginLeft: 24 }} src={currentUserInfo.profileUrl} />
                            </Popover>
                        </span>
                    </div>

                    <Modal
                        title="Create new post"
                        centered
                        visible={postModalVisible}
                        onOk={() => setPostModalVisible(false)}
                        onCancel={() => setPostModalVisible(false)}
                    >
                        <PostForm />
                    </Modal>

                </Header>
                {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 20 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <Tabs />
                    </div>
                </Content> */}
                {/* <Footer style={{ textAlign: 'center' }}>Friends ©2022 Created by Mak Design</Footer> */}
            </Layout>
        </>
    )
}
