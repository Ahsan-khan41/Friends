import React, { useContext, useState, useEffect } from 'react'
import CurrentUserContext from '../../../ContextAPI/CurrentUserContext';
import { Card, Avatar } from "antd";
import { fireDB } from '../../../firebaseConfig';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import {collection, onSnapshot, orderBy, query, where } from "firebase/firestore";


export const MyPosts = () => {

    const { Meta } = Card;

    const currentUserInfo = useContext(CurrentUserContext);
    const [postsArr, setPostsArr] = useState([]);

    useEffect(() => {
        let arr = [];
        onSnapshot(
            query(collection(fireDB, "posts"), where("postedBy", "==", `${currentUserInfo.uid}`), orderBy("time", "desc")),
            (doc) => {
                doc.forEach((elem) => {
                    // console.log(elem.data().postedBy);
                    arr.push(elem.data());
                    setPostsArr(arr);
                    //console.log(arr.length);
                });
            }
        );
    }, []);

    console.log(postsArr);

    return (
        <div>
            <div>
                <div id="posts">
                    {postsArr.map((elem, index) => {
                        return (
                            <Card
                                key={index}
                                style={{
                                    width: "50%",
                                    margin: "auto",
                                    marginBottom: 20,
                                    borderRadius: "20px",
                                }}
                                cover={<img alt="example" src={elem.url} />}
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />,
                                ]}
                            >
                                <Meta
                                    avatar={<Avatar src={elem.adminProfile} />}
                                    title={elem.admin}
                                    description={elem.description}
                                />
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
