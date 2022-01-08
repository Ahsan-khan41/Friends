import React, { useState } from 'react'
import { Modal, Divider } from 'antd';
import { Avatar, Card } from 'antd'
import { SendOutlined, EllipsisOutlined, MessageOutlined, HeartOutlined } from "@ant-design/icons";
import './Friends.css'

export const Friends = () => {

    const [modalVisible, setModalVisible] = useState(true);


    return (
        <>
            <span>
                <img
                    onClick={() => setModalVisible(true)}
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            </span>
            <br />
            <Modal
                centered
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                footer={[]}
            >
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        {/* Post Url */}
                        {<img
                            className='myPost-img'
                            style={{ width: 400 }}
                            alt="post"
                            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' />}
                    </div>
                    <div >
                        <Card className='mypost-card' style={{ width: "50%", padding: 0 }}>
                            <div className='main-post-div' >
                                <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                                    <span style={{ padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>
                                            {/* Admin Name and Profile */}
                                            <span><Avatar size={38} src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' /></span>
                                            <span style={{ margin: 15, marginTop: 10, fontSize: 15, fontWeight: 600 }}>
                                                props.adminName
                                            </span>
                                        </span>
                                        <span><EllipsisOutlined key="ellipsis" style={{ fontSize: 20, float: 'right' }} /></span>
                                    </span>
                                    <Divider style={{ margin: 0 }} />
                                </div>
                                <div>
                                <Divider  style={{margin: 0}}/>
                                    <span>
                                        <div style={{ margin: 15, marginTop: 15 }}>
                                            <span>
                                                <HeartOutlined key="setting" style={{ fontSize: 24, marginRight: 18 }} />
                                                <MessageOutlined key="edit" style={{ fontSize: 23, marginRight: 18 }} />
                                                <SendOutlined key="ellipsis" rotate={-35} style={{ fontSize: 23, marginRight: 18, marginTop: "-10px" }} />
                                            </span>
                                            <EllipsisOutlined key="ellipsis" style={{ fontSize: 23, float: 'right' }} />
                                        </div>
                                        {/* description here */}
                                        <p id='description' style={{ paddingLeft: 15, paddingRight: 15 }}>
                                            <span style={{ marginRight: 10, fontSize: 15, fontWeight: 600 }}>props.adminName</span>props.description</p>
                                        <p style={{ fontWeight: '600', paddingLeft: 15, margin: 0, color: '#2a2a2a' }}>
                                            2,014 likes
                                        </p>
                                        <p style={{ paddingLeft: 15, marginBottom: 0, fontSize: 15, fontWeight: 350, color: '#a3a3a3' }}>
                                            View all comments
                                        </p>
                                        <p style={{ paddingLeft: 15, fontSize: 13, fontWeight: 400, color: '#a3a3a3' }}>
                                            props.timestamp
                                        </p>
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Modal>
        </>
    )
}
