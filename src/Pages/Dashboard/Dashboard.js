import React from 'react';
import { Button, Layout, Menu } from 'antd';
import './Dashboard.css'
import Logo from '../../Icons/Logo.svg';
import Posts from '../../components/Posts/Posts';
import { Tabs } from '../../components/Tabs/Tabs';

export default function Dashboard() {

    const { Header, Content, Footer } = Layout;

    return (
        <>
            <Layout>
                <Header style={{ background: '#fff', zIndex: 1, width: '100%' }}>
                    <div className="logo">
                        <img src={Logo} alt='friends-logo' /> 
                        <span><Button style={{float: 'right', marginTop: 15}} >Log Out</Button></span>
                        </div>
                        
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 20 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        <Tabs/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Friends ©2022 Created by Mak Design</Footer>
            </Layout>
        </>
    )
}
