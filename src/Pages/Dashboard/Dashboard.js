import React from 'react';
import { Layout, Menu } from 'antd';
import './Dashboard.css'
import Logo from '../../Icons/Logo.svg';
import Profile from '../../components/Profile/Profile';

export default function Dashboard() {

    const { Header, Content, Footer } = Layout;

    return (
        <>
            <Layout>
                <Header style={{ background: '#fff', zIndex: 1, width: '100%' }}>
                    <div className="logo">
                        <img src={Logo} alt='friends-logo' /> 
                        </div>
                    <Menu className="menu" theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="1">Posts</Menu.Item>
                        <Menu.Item key="2">Friends</Menu.Item>
                        <Menu.Item key="3">Profile</Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
                        {Profile} cccc
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Friends ©2018 Created by Mak Design</Footer>
            </Layout>
        </>
    )
}
