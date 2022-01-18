import React, { useState, useContext } from 'react';
import { Divider, Layout, Popover, Input, Avatar, Modal } from 'antd';
import Logo from '../../Icons/Logo.svg';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import CurrentUserContext from './../../ContextAPI/CurrentUserContext';
import './Dashboard.css'
import { HomeOutlined, AppstoreAddOutlined, MessageOutlined, HeartOutlined, CompassOutlined, SearchOutlined, UserOutlined, SyncOutlined, BookOutlined, SettingOutlined } from "@ant-design/icons";
import { PostForm } from '../../components/Posts/PostForm';


export default function Dashboard() {


    let navigate = useNavigate();
    const signOutFunc = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            localStorage.removeItem('email');
            navigate("/login");
        }).catch((error) => {
            // An error happened.
            console.log("error Loggeing Out: ", error);
        });

    }

    const usermail = localStorage.getItem('email');

    const [postModalVisible, setPostModalVisible] = useState(false)

    const currentUserInfo = useContext(CurrentUserContext);

    const content = (
        <div style={{ width: '200px' }}>
            <div style={{ padding: "8px 16px" }}><Link to={"/profile"}><UserOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }} /> Profile</Link></div>
            <div style={{ padding: "8px 16px" }}><BookOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }} /> Saved</div>
            <div style={{ padding: "8px 16px" }}><SettingOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }} />Setting</div>
            <div style={{ padding: "8px 16px" }}><SyncOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }} /> Accounts</div>
            <Divider style={{ backgroundColor: '#dbdbdb', margin: 0 }} />
            <div style={{ padding: "8px 16px" }} onClick={signOutFunc}>Log out</div>
        </div>
    );

    const closeModal = () => {
        setPostModalVisible(false)
    }

    const { Header } = Layout;

    return (
        <>
            <Layout>
                <Header style={{ background: '#fff', zIndex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="logo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 975, height: 60, padding: "0px 20px" }} >
                        <span><img src={Logo} alt='friends-logo' style={{ width: 130 }} /></span>
                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Input size="large" placeholder="Search" style={{ color: '#efefef' }} prefix={<SearchOutlined style={{ color: '#8e8e8e', fontSize: 13, marginRight: 5 }} />} />
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            <Link to="/" style={{ paddingTop: 7 }}><HomeOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 25 }} /></Link>
                            <MessageOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 25, paddingLeft: 24 }} />
                            <AppstoreAddOutlined onClick={() => setPostModalVisible(true)} style={{ color: "rgb(38, 38, 38)", fontSize: 25, paddingLeft: 24 }} />
                            <CompassOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 25, paddingLeft: 24 }} />
                            <HeartOutlined style={{ color: "rgb(38, 38, 38)", fontSize: 25, paddingLeft: 24 }} />
                            <Popover content={content} trigger="click">
                                {currentUserInfo.profileUrl ? <Avatar size={30} style={{ marginLeft: 24 }} src={currentUserInfo.profileUrl} /> : <Avatar size={30}
                                    style={{ marginLeft: 24, color: '#f56a00', backgroundColor: '#fde3cf', fontSize: 30, userSelect: 'none' }}>
                                    {usermail[0]}</Avatar>}
                            </Popover>
                        </span>
                    </div>

                    <Modal
                        title="Create new post"
                        centered
                        visible={postModalVisible}
                        onOk={() => setPostModalVisible(true)}
                        onCancel={() => setPostModalVisible(false)}
                    >
                        <PostForm closeModal={closeModal}/>
                    </Modal>

                </Header>
            </Layout>
        </>
    )
}
