import React, { useContext, useState, useEffect } from 'react'
import CurrentUserContext from '../../../ContextAPI/CurrentUserContext';
import { Card, Avatar, Popconfirm } from "antd";
import { fireDB, storage } from '../../../firebaseConfig';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';


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

    const confirm = (e) => {
        deleteDoc(doc(fireDB, 'posts', `${e}`));
        const desertRef = ref(storage, `posts/${e}`);

        // Delete the file
        deleteObject(desertRef).then(() => {
            console.log('File deleted successfully')
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error)
        });
    }

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
                                    // Deleting the Posts
                                    <Popconfirm
                                        title="Are you sure to delete this Post?"
                                        onConfirm={() => { confirm(elem.postUid) }}
                                        onVisibleChange={() => console.log('visible change')}
                                    >
                                        <DeleteOutlined key="delete" onConfirm={confirm} />
                                    </Popconfirm>,
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
