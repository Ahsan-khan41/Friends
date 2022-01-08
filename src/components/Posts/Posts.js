import React, { useEffect, useState } from "react";
import { PostForm } from "./PostForm";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import { PostCard } from "../PostCard/PostCard";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import moment from "moment";
import "./Posts.css"



function Posts() {

  const [postsArr, setPostsArr] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(fireDB, "posts"), orderBy("time", "desc")),
      (doc) => {
        let arr = [];
        doc.forEach((elem) => {
          //console.log(elem.data());
          arr.push(elem.data());
        })
        setPostsArr(arr);
      }
    );
  }, []);
  // console.log(postsArr);

  return (
    <>
      <Dashboard />
      <div style={{ backgroundColor: '#fafafa' }}>
        <div id="posts">
          {postsArr.map((elem, index) => {
            return (
              <PostCard
                key={ index }
                adminProfile={elem.adminProfile}
                adminName={elem.admin}
                postUrl={elem.url}
                description={elem.description}
                timestamp={moment(elem.time.toDate()).fromNow()} />
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Posts;
