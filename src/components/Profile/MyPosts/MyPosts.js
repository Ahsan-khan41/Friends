import React, { useState, useContext, useEffect } from 'react'
import { Modal, Divider, Space } from 'antd';
import './MyPosts.css'
import CurrentUserContext from '../../../ContextAPI/CurrentUserContext';
// import { Card, Avatar } from "antd";
import { fireDB } from '../../../firebaseConfig';
// import { HeartOutlined, MessageOutlined, SendOutlined, EllipsisOutlined } from "@ant-design/icons";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { MyPostsCard } from './MyPostsCard';
import moment from 'moment';


export const MyPosts = () => {

    const currentUserInfo = useContext(CurrentUserContext);
    // console.log(currentUserInfo);
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

    // const confirm = (e) => {
    //     deleteDoc(doc(fireDB, 'posts', `${e}`));
    //     const desertRef = ref(storage, `posts/${e}`);

    //     console.log(desertRef);

    //     // Delete the file
    //     deleteObject(desertRef).then(() => {
    //         console.log('File deleted successfully');
    //         <Alert message="Post Deleted Successfully!" type="success" />
    //     }).catch((error) => {
    //         // Uh-oh, an error occurred!
    //         console.log(error)
    //     });
    // }

    console.log(postsArr);

    return (
        <div>
            <div>
                <div id="myposts">
                    {postsArr.map((elem, index) => {
                        return (
                            <MyPostsCard
                                key={index}
                                adminProfile={elem.adminProfile}
                                admin={elem.admin}
                                url={elem.url}
                                description={elem.description}
                                time={moment(elem.time.toDate()).fromNow()}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
