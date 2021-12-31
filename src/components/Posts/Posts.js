import React, { useEffect, useState } from "react";
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { PostForm } from "./PostForm";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { fireDB } from '../../firebaseConfig'

function Posts() {

    const { Meta } = Card;
    const [postsArr, setPostsArr] = useState([]);

    const dataHandler = (document, arr) => {
        onSnapshot(doc(fireDB, "users", `${document}`), (doc) => {
            //console.log("Current data: " , doc.data());
            arr.push(doc.data());
            //console.log(arr);
            setPostsArr(arr);
        });
    }

    useEffect(() => {

        onSnapshot(collection(fireDB, "posts"), (doc) => {
            let arr = [];
            doc.forEach((elem) => {
                // console.log(elem.data().postedBy);
                dataHandler(elem.data().postedBy, arr);
                arr.push(elem.data());
            });
        });

    }, [])

    console.log(postsArr);


    return (
        <>
            <div>
                <PostForm />
                <div id='posts' >
                    {postsArr.map((elem, index) => {
                        return (
                            <Card key={index}
                                style={{ width: "50%", margin: 'auto', marginBottom: 20, borderRadius: '20px' }}
                                cover={
                                    <img
                                        alt="example"
                                        src={elem.url}
                                    />
                                }
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src={elem.profileUrl} />}
                                    title={elem.postedBy}
                                    description={elem.description}
                                />
                            </Card>
                        )
                    })}

                </div>

            </div>
        </>
    )
}
export default Posts;
