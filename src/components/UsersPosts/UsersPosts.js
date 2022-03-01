import React, { useState, useContext, useEffect } from 'react'
import CurrentUserContext from '../../ContextAPI/CurrentUserContext';
// import { Card, Avatar } from "antd";
import { fireDB } from '../../firebaseConfig';
// import { HeartOutlined, MessageOutlined, SendOutlined, EllipsisOutlined } from "@ant-design/icons";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import {UsersPostsCard} from './UsersPostsCard/UsersPostsCard';
import moment from 'moment';


export const UsersPosts = ({getPostsLength , uid}) => {

    const [postsArr, setPostsArr] = useState([]);

    useEffect(() => {
        onSnapshot(
            query(collection(fireDB, "posts"), where("postedBy", "==", `${uid}`), orderBy("time", "desc")),
            (doc) => {
                let arr = [];
                doc.forEach((elem) => {
                    arr.push(elem.data());
                });
                setPostsArr(arr);
                getPostsLength(arr); // providing length to parent component
            }
        );
    }, [uid]);
    return (
        <div>
            <div>
                <div id="myposts">
                    {postsArr.map((elem, index) => {
                        return (
                            <UsersPostsCard
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
