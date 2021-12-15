import React, { useContext } from 'react';
import { Button, Layout } from 'antd';
import './Dashboard.css'
import Logo from '../../Icons/Logo.svg';
import { Tabs } from '../../components/Tabs/Tabs';
import CurrentUserContext from '../../ContextAPI/CurrentUserContext';

export default function Dashboard() {

    const { Header, Content, Footer } = Layout;
    const currentUserInfo = useContext(CurrentUserContext);
    console.log(currentUserInfo);
    return (
        <>
            <Layout>
                <Header style={{ background: '#fff', zIndex: 1, width: '100%' }}>
                    <div className="logo">
                        <img src={Logo} alt='friends-logo' />
                        <span><Button style={{ float: 'right', marginTop: 15 }} >Log Out</Button></span>
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
