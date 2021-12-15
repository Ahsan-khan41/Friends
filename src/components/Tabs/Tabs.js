import React from 'react';
import { Badge, Tabs as AntTabs } from 'antd';
import { TeamOutlined, BlockOutlined, UserOutlined } from '@ant-design/icons';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import { Friends } from '../Friends/Friends';
import './Tabs.css';


export const Tabs = () => {
    const { TabPane } = AntTabs;
    return (
        <div >
            <AntTabs defaultActiveKey="1" style={{ justifyContent: 'center' }} >
                <TabPane
                    tab={
                        <span>
                            <Badge count={0}>
                                Posts <BlockOutlined />
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
                              Friends  <TeamOutlined />
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
                               Profile <UserOutlined />
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
