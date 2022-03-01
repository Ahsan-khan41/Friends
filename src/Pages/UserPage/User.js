import React, { useContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import CurrentUserContext from "../../ContextAPI/CurrentUserContext";
import { Divider, Tabs, Button, Popover } from "antd";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import "./User.css";
import { ProfilePicUpload } from "../../components/Profile/ProfilePicUpload/ProfilePicUpload";
import Avatar from "antd/lib/avatar/avatar";
import Dashboard from "../Dashboard/Dashboard";
import { useParams } from "react-router-dom";
import { UsersPosts } from "../../components/UsersPosts/UsersPosts";

export default function Profile() {
  let { uid } = useParams();

  console.log(uid);

  const [userData, setUserData] = useState({});
  const [postsLength, setPostsLength] = useState();

  useEffect(async () => {
    await onSnapshot(doc(fireDB, "users", `${uid}`), (doc) => {
      const data = doc.data();
      if (undefined ?? data) {
        // nullish operator ??
        setUserData(data);
      } else {
        // console.log("else");
      }
    });
  }, [uid]);

  const { TabPane } = Tabs;

  function callback(key) {
    // console.log(key);
  }

  const usermail = localStorage.getItem("email");

  const getPostsLength = (postsArr) => {
    setPostsLength(postsArr.length);
  };

  console.log(userData);

  return (
    <>
      <Dashboard />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          paddingTop: "10px",
          backgroundColor: "#fafafa",
        }}
      >
        {/* Profile Pic & Modal/Popover */}
        <div style={{ display: "inline-block", marginTop: 15 }}>
          {userData.profileUrl ? (
            <Avatar src={userData.profileUrl} size={170} />
          ) : (
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={170} />
          )}
        </div>

        <div
          style={{
            display: "inline-block",
            textAlign: "left",
            marginLeft: 100,
            maxWidth: "350px",
          }}
        >
          <p style={{ fontSize: "35px" }}>{userData.name}</p>
          <span style={{ fontSize: "15px" }}>
            <b>{postsLength} </b>Posts
          </span>
          <span style={{ marginLeft: 10, fontSize: "15px" }}>
            <b>0 </b>followers
          </span>
          <Divider />
          <p style={{ marginTop: 10, fontSize: "16px" }}>
            <em style={{ color: "#808080" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit{" "}
            </em>
          </p>
        </div>
      </div>
      {/* <Divider style={{ margin: 5 }} /> */}
      <Tabs id="bottom-tabs" defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Posts" key="1">
          <UsersPosts getPostsLength={getPostsLength} uid={uid} />
        </TabPane>
      </Tabs>
    </>
  );
}
