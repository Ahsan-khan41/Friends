import React, { useContext, useState, useEffect } from 'react';
import { Button, Layout } from 'antd';
import './Dashboard.css'
import Logo from '../../Icons/Logo.svg';
import { Tabs } from '../../components/Tabs/Tabs';
import CurrentUserContext from '../../ContextAPI/CurrentUserContext';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from '../../firebaseConfig';


export default function Dashboard() {

    const [userUid, setUserUid] = useState();
    const currentUserInfo = useContext(CurrentUserContext);
    console.log(currentUserInfo);

    useEffect(() => {

        onSnapshot(doc(fireDB, "users", `${currentUserInfo.uid}`), (doc) => {
            const data = doc.data();
            if (undefined ?? data) { // nullish operator ??
                console.log("if");
                setUserUid(data.name);
            } else {
                // console.log("else");
            }
        })

    }, [currentUserInfo])

    const { Header, Content, Footer } = Layout;

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

    return (
        <>
            <Layout>
                <Header style={{ background: '#fff', zIndex: 1, width: '100%' }}>
                    <div className="logo">
                        <img src={Logo} alt='friends-logo' />
                        <span style={{ float: 'right' }}> <p>Hello <span style={{ fontWeight: 'bold' }}>{userUid}</span> </p>
                            <input style={{height: '30px' }} placeholder='Search user here' />
                            <Button type='primary' style={{ marginRight: '20px', marginLeft: '20px' }}>Search</Button>
                            <Button onClick={signOutFunc} >Log Out</Button>
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
