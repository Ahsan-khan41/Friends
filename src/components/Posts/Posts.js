import React, { useState } from "react";
import { Card, Avatar, Collapse, Form, Input, Button } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


function Posts() {

    const { Meta } = Card;


        postsData.push({
            postsTitle,
            postsDesc,
            postsImg
        })
        return console.log(postsData);
    }

  const titleHandler = (e) => {
      setpostsTitle((prev) => e.target.value)
      
    }
    
    const postHandler = (event) => {
        return (
            `<Card
                    style={{ width: 300, margin: 'auto' }}
                    cover={
                        <img
                            alt="example"
                            src=${postsImg}
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
                        title=${postsTitle}
                        description=${postsDesc}
                    />
                </Card>`);
    }

    return (
        <div>
            <div style={{ marginBottom: 30 }}>
                <Collapse defaultActiveKey={['1']} >
                    <Panel header="Create Post" key="1">
                        <Form
                            name="posts-form"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 8 }}
                            initialValues={{ remember: true }}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Post Title"
                                name="post title"
                                rules={[{ required: true, message: 'Please input post title!' }]}
                            >
                                <Input onChange={titleHandler} />
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[{ required: true, message: 'Please input post description!' }]}
                            >
                                <Input onChange={(e) => { setpostsDesc(e.target.value) }} />
                            </Form.Item>

                            <Form.Item
                                label="Image URL"
                                name="image url"
                                rules={[{ required: false }]}
                            >
                                <Input onChange={(e) => { setpostsImg(e.target.value) }} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit" onClick={() => funcPostsData(postsTitle, postsDesc, postsImg)}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Panel>
                </Collapse>
            </div>
            <div id='posts'>
                <Card
                    style={{ width: 300, margin: 'auto' }}
                    cover={
                        <img
                            alt="example"
                            src={postsImg}
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
                        title={postsTitle}
                        description={postsDesc}
                    />
                </Card>
            </div>

        </div>
    );
}

export default Posts;
