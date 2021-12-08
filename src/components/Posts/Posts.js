import React from "react";
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { PostForm } from "./PostForm";


function Posts() {

    const { Meta } = Card;
    

    return (
        <>
            <div>
               <PostForm />
                <div id='posts'>
                    <Card
                        style={{ width: 300, margin: 'auto' }}
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                            title="Card Title"
                            description="Card Description"
                        />
                    </Card>
                </div>

            </div>
        </>
    )
}
export default Posts;
