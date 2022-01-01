import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { PostForm } from "./PostForm";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";

function Posts() {
  const { Meta } = Card;
  const [postsArr, setPostsArr] = useState([]);
  
  useEffect(() => {
    let arr = [];
    onSnapshot(
      query(collection(fireDB, "posts"), orderBy("time", "desc")),
      (doc) => {
        doc.forEach((elem) => {
          //console.log(elem.data());
          arr.push(elem.data());
          setPostsArr(arr);
          
        })
      }
    );
  }, []);

  // console.log(postsArr);

  return (
    <>
      <div>
        <PostForm />
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
    </>
  );
}
export default Posts;
