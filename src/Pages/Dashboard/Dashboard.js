import React, { useState, useContext, useEffect } from 'react';
import { Button, Divider, Layout, Popover, Input, Avatar } from 'antd';
import Logo from '../../Icons/Logo.svg';
import { Tabs } from '../../components/Tabs/Tabs';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import CurrentUserContext from './../../ContextAPI/CurrentUserContext';
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from '../../firebaseConfig';
import './Dashboard.css'

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

    const { Search } = Input;
    const onSearch = value => console.log(value);

    const [data, setData] = useState(' ');

    const currentUserInfo = useContext(CurrentUserContext);
    console.log(currentUserInfo);
    console.log("dashboard");

    useEffect(() => {

        onSnapshot(doc(fireDB, "users", `${currentUserInfo.uid}`), (doc) => {
            //console.log("Current data: ", doc.data());
            const userInfo = doc.data();
            if (undefined ?? userInfo) { // nullish operator ??
                console.log("if");
                setData(userInfo);
            } else {
                // loader...
            }

        });

    }, [currentUserInfo])


    const content = (
        <div style={{ textAlign: 'center', width: '300px', margin: '10px' }}>
            <Avatar size={80} style={{ marginBottom: '10px' }}
                src={currentUserInfo.profileUrl} /><br />
            <span style={{ size: 25, fontWeight: '500' }}>{data.name}</span><br />
            <span style={{ size: 20, margin: '20px' }}>{data.email}</span><br />
            <Button style={{ borderRadius: 25, marginTop: '10px' }}>
                <p style={{ size: 15 }}><Link to="profile">Manage your Account</Link></p>
            </Button>
            <Divider />
            <Button style={{ borderRadius: 5 }} onClick={signOutFunc}>Sign out</Button>
        </div>
    );


    const { Header, Content, Footer } = Layout;

    return (
        <>
            <Layout>
                <Header style={{ background: '#fff', zIndex: 1, width: '100%' }}>
                    <div className="logo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                        <span><img src={Logo} alt='friends-logo' /></span>
                        <span style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Search placeholder="search accounts here" allowClear onSearch={onSearch} enterButton />
                        </span>
                        <span>
                            <Popover content={content} trigger="click">
                                <span style={{ borderRadius: '100%' }}><Avatar size={40} style={{ marginLeft: 20 }}
                                    src={currentUserInfo.profileUrl} /></span>
                            </Popover>
                        </span>
                    </div>

                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 20 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <Tabs />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Friends ©2022 Created by Mak Design</Footer>
            </Layout>
        </>
    )
}
