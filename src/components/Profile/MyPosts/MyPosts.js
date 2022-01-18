import React, { useState, useContext, useEffect } from 'react'
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
