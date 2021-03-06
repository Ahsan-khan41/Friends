import React, { useContext, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import CurrentUserContext from "../../ContextAPI/CurrentUserContext";
import { Divider, Tabs, Button, Popover } from "antd";
import { CameraOutlined, UserOutlined } from "@ant-design/icons";
import "./Profile.css";
import { ProfilePicUpload } from "./ProfilePicUpload/ProfilePicUpload";
import Avatar from "antd/lib/avatar/avatar";
import Dashboard from "../../Pages/Dashboard/Dashboard";
// import { MyPosts2 } from './MyPosts/MyPosts'
import { MyPosts } from "./MyPosts/MyPosts";
import { Setting } from "../Setting/Setting";

export default function Profile() {
  const [userName, setUserName] = useState();
  const [postsLength, setPostsLength] = useState();
  const currentUserInfo = useContext(CurrentUserContext);
  useEffect(() => {
    onSnapshot(doc(fireDB, "users", `${currentUserInfo.uid}`), (doc) => {
      const data = doc.data();
      if (undefined ?? data) {
        // nullish operator ??
        // console.log("if");
        setUserName(data.name);
      } else {
        // console.log("else");
      }
    });
  }, [currentUserInfo]);

  const content = (
    <div style={{ textAlign: "center", maxWidth: "300px", padding: "20px" }}>
      <ProfilePicUpload pic={"profile"} />
    </div>
  );

  const { TabPane } = Tabs;

  function callback(key) {
    // console.log(key);
  }

  const usermail = localStorage.getItem("email");

  const getPostsLength = (postsArr) => {
    setPostsLength(postsArr.length);
  };
  // console.log(postsLength);

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
          {currentUserInfo.profileUrl ? (
            <Avatar src={currentUserInfo.profileUrl} size={170} />
          ) : (
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={170} />
          )}
          <Popover content={content} trigger="click">
            <span style={{ position: "relative", left: -60, top: 70 }}>
              <Button style={{ height: 48, width: 48, borderRadius: "50%" }}>
                <CameraOutlined />
              </Button>
            </span>
          </Popover>
        </div>

        <div
          style={{
            display: "inline-block",
            textAlign: "left",
            marginLeft: 100,
            maxWidth: "350px",
          }}
        >
          <p style={{ fontSize: "35px" }}>{userName}</p>
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
          <MyPosts getPostsLength={getPostsLength} uid={currentUserInfo.uid} />
        </TabPane>
        <TabPane tab="Setting" key="2">
          <Setting />
        </TabPane>
      </Tabs>
    </>
  );
}
