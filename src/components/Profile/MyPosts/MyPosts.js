import React, { useContext, useState, useEffect } from 'react'
import CurrentUserContext from '../../../ContextAPI/CurrentUserContext';
import { Card, Avatar, Popconfirm, Alert } from "antd";
import { fireDB, storage } from '../../../firebaseConfig';
import { HeartOutlined, MessageOutlined, SendOutlined, EllipsisOutlined } from "@ant-design/icons";
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { deleteObject, ref } from 'firebase/storage';


export const MyPosts = () => {

    const { Meta } = Card;

    const currentUserInfo = useContext(CurrentUserContext);
    const [postsArr, setPostsArr] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(collection(fireDB, "posts"), where("postedBy", "==", `${currentUserInfo.uid}`), orderBy("time", "desc")),
            (doc) => {
                let arr = [];
                doc.forEach((elem) => {
                    arr.push(elem.data());
                });
                setPostsArr(arr);
            }
        );
    }, []);

    const confirm = (e) => {
        deleteDoc(doc(fireDB, 'posts', `${e}`));
        const desertRef = ref(storage, `posts/${e}`);

        console.log(desertRef);

        // Delete the file
        deleteObject(desertRef).then(() => {
            console.log('File deleted successfully');
            <Alert message="Post Deleted Successfully!" type="success" />
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
                            // <Card
                            //     key={index}
                            //     style={{
                            //         width: "50%",
                            //         margin: "auto",
                            //         marginBottom: 20,
                            //         borderRadius: "20px",
                            //     }}
                            //     cover={<img alt="example" src={elem.url} />}
                            //     actions={[
                            //         <SettingOutlined key="setting" />,
                            //         <EditOutlined key="edit" />,
                            //         // Deleting the Posts
                            //         <Popconfirm
                            //             title="Are you sure to delete this Post?"
                            //             onConfirm={() => { confirm(elem.postUid) }}
                            //             onVisibleChange={() => console.log('visible change')}
                            //         >
                            //             <DeleteOutlined key="delete" onConfirm={confirm} />
                            //         </Popconfirm>,
                            //     ]}
                            // >
                            //     <Meta
                            //         avatar={<Avatar src={elem.adminProfile} />}
                            //         title={elem.admin}
                            //         description={elem.description}
                            //     />
                            // </Card>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                <div className="site-card-border-less-wrapper">
                                    <Card className='post-card' style={{ width: "50%", border: "1px solid rgba(219,219,219)", padding: 0 }}>
                                        <div style={{ margin: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                {/* Admin Name and Profile */}
                                                <span><Avatar size={38} src={elem.adminProfile} /></span>
                                                <span style={{ margin: 15, marginTop: 10, fontSize: 15, fontWeight: 600 }}>
                                                {elem.admin}
                                                </span>
                                            </span>
                                            <span><EllipsisOutlined key="ellipsis" style={{ fontSize: 20, }} /></span>
                                        </div>
                                        {/* Post Url */}
                                        {<img className='post-img' alt="post" src={elem.url} />}
                                        <div style={{ margin: 15, marginTop: 15 }}>
                                            <span>
                                                <HeartOutlined key="setting" style={{ fontSize: 24, marginRight: 18 }} />
                                                <MessageOutlined key="edit" style={{ fontSize: 23, marginRight: 18 }} />
                                                <SendOutlined key="ellipsis" style={{ fontSize: 23, marginRight: 18 }} />
                                            </span>
                                            <EllipsisOutlined key="ellipsis" style={{ fontSize: 23, float: 'right' }} />
                                        </div>
                                        {/* description here */}
                                        <p id='description' style={{ paddingLeft: 15, paddingRight: 15 }}>{elem.description}</p>
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
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
