import React from 'react'
import { Avatar, Card } from 'antd'
import { SendOutlined, EllipsisOutlined, MessageOutlined, HeartOutlined } from "@ant-design/icons";
import "./PostCard.css";

export const PostCard = (props) => {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                <div className="site-card-border-less-wrapper">
                    <Card className='post-card' style={{ width: "50%", border: "1px solid rgba(219,219,219)", padding: 0 }}>
                        <div style={{ margin: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>
                                {/* Admin Name and Profile */}
                                <span><Avatar size={38} src={props.adminProfile} /></span>
                                <span style={{ margin: 15, marginTop: 10, fontSize: 15, fontWeight: 600 }}>
                                    {props.adminName}
                                </span>
                            </span>
                            <span><EllipsisOutlined key="ellipsis" style={{ fontSize: 20, }} /></span>
                        </div>
                        {/* Post Url */}
                        {<img className='post-img' alt="post" src={props.postUrl} />}
                        <div style={{ margin: 15, marginTop: 15 }}>
                            <span>
                                <HeartOutlined key="setting" style={{ fontSize: 24, marginRight: 18 }} />
                                <MessageOutlined key="edit" style={{ fontSize: 23, marginRight: 18 }} />
                                <SendOutlined key="ellipsis" rotate={-35} style={{ fontSize: 23, marginRight: 18, marginTop: "-10px" }} />
                            </span>
                            <EllipsisOutlined key="ellipsis" style={{ fontSize: 23, float: 'right' }} />
                        </div>
                        {/* description here */}
                        <p id='description' style={{ paddingLeft: 15, paddingRight: 15 }}>{props.description}</p>
                        <p style={{ fontWeight: '600', paddingLeft: 15, margin: 0, color: '#2a2a2a' }}>
                            2,014 likes
                        </p>
                        <p style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15, fontWeight: 350, color: '#a3a3a3' }}>
                            View all comments
                        </p>
                        <p style={{ paddingLeft: 15, fontSize: 11, fontWeight: 400, color: '#a3a3a3' }}>
                            FEW HOURS AGO
                        </p>

                    </Card>
                </div>
            </div>
        </>
    )
}
