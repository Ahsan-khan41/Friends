import React from 'react';
import { Badge, Tabs as AntTabs } from 'antd';
import { TeamOutlined, BlockOutlined, UserOutlined } from '@ant-design/icons';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import { Friends } from '../Friends/Friends';
import './Tabs.css';
import { Link } from 'react-router-dom';


export const Tabs = () => {
    const { TabPane } = AntTabs;
    return (
        <div >
            <AntTabs defaultActiveKey="1" style={{ justifyContent: 'center' }} >
                <TabPane
                    tab={
                        <span>
                            <Badge count={0}>
                               <Link style={{color: "black"}} to="posts"> Posts</Link> <BlockOutlined />
                            </Badge>
                        </span>
                    }
                    key="1"
                >
                    <Posts />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <Badge count={2}>
                            <Link style={{color: "black"}} to="friends"> Friends</Link>  <TeamOutlined />
                            </Badge>
                        </span>
                    }
                    key="2"
                >
                    <Friends />
                </TabPane>
                <TabPane
                    tab={
                        <span>
                            <Badge count={0}>
                            <Link style={{color: "black"}} to="profile">Profile</Link> <UserOutlined />
                            </Badge>
                        </span>
                    }
                    key="3"
                >
                    <Profile />
                </TabPane>
                

            </AntTabs>
        </div>
    )
}
