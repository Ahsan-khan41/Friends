import React, { useState, useContext, useEffect } from "react";
import { Divider, Layout, Popover, Input, Avatar, Modal, Select } from "antd";
import Logo from "../../Icons/Logo.svg";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import CurrentUserContext from "./../../ContextAPI/CurrentUserContext";
import "./Dashboard.css";
import {
  HomeOutlined,
  AppstoreAddOutlined,
  MessageOutlined,
  HeartOutlined,
  CompassOutlined,
  SearchOutlined,
  UserOutlined,
  SyncOutlined,
  BookOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { PostForm } from "../../components/Posts/PostForm";
import { collection, query, where, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";

export default function Dashboard() {

  var navigate = useNavigate();

  const signOutFunc = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        localStorage.removeItem("email");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log("error Loggeing Out: ", error);
      });
  };

  const usermail = localStorage.getItem("email");

  const [postModalVisible, setPostModalVisible] = useState(false);
  const [searchKeys, setSearchKeys] = useState("zzz");
  const [usersData, setUsersData] = useState([]);
  const currentUserInfo = useContext(CurrentUserContext);

  const content = (
    <div style={{ width: "200px" }}>
      <div style={{ padding: "8px 16px" }}>
        <Link to={"/profile"}>
          <UserOutlined
            style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }}
          />{" "}
          Profile
        </Link>
      </div>
      <div style={{ padding: "8px 16px" }}>
        <BookOutlined
          style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }}
        />{" "}
        Saved
      </div>
      <div style={{ padding: "8px 16px" }}>
        <SettingOutlined
          style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }}
        />
        Setting
      </div>
      <div style={{ padding: "8px 16px" }}>
        <SyncOutlined
          style={{ color: "rgb(38, 38, 38)", fontSize: 18, marginRight: 10 }}
        />{" "}
        Accounts
      </div>
      <Divider style={{ backgroundColor: "#dbdbdb", margin: 0 }} />
      <div style={{ padding: "8px 16px" }} onClick={signOutFunc}>
        Log out
      </div>
    </div>
  );

  const closeModal = () => {
    setPostModalVisible(false);
  };

  const { Header } = Layout;

  const { Option, OptGroup } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
    navigate(`/user/${usersData[value].uid}`);
  }

  function onSearch(val) {
    // console.log("search:", val);
    setSearchKeys(val);
  }

  const SearchFunc = (val) => {
    if (val === "") {
      setSearchKeys("");
    } else {
      setSearchKeys(val);
    }
  };
  // console.log(searchKeys);
  let userArr = [];

  useEffect(async () => {
    const usersRef = collection(fireDB, "users");

    const q = query(
      usersRef,
      where("name", ">=", searchKeys),
      where("name", "<=", searchKeys + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      userArr.push(doc.data());
      // console.log(userArr);
      setUsersData(userArr);
    });
  }, [searchKeys]);

  const children = usersData.map((elem, i) => {
    return <Option key={i}>{elem.name}</Option>;
  });

  return (
    <>
      <Layout>
        <Header
          style={{
            background: "#fff",
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: 975,
              height: 60,
              padding: "0px 20px",
            }}
          >
            <span>
              <img src={Logo} alt="friends-logo" style={{ width: 40 }} />
              <span style={{ fontSize: 20, fontWeight: 700, marginLeft: 10 }}>
                Friends App
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Select
                showSearch
                style={{ width: "250px" }}
                placeholder="Search Users..."
                showArrow={false}
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=0}
              >
                {children}
              </Select>
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <Link to="/" style={{ paddingTop: 7 }}>
                <HomeOutlined
                  style={{ color: "rgb(38, 38, 38)", fontSize: 25 }}
                />
              </Link>
              <MessageOutlined
                style={{
                  color: "rgb(38, 38, 38)",
                  fontSize: 25,
                  paddingLeft: 24,
                }}
              />
              <AppstoreAddOutlined
                onClick={() => setPostModalVisible(true)}
                style={{
                  color: "rgb(38, 38, 38)",
                  fontSize: 25,
                  paddingLeft: 24,
                }}
              />
              <CompassOutlined
                style={{
                  color: "rgb(38, 38, 38)",
                  fontSize: 25,
                  paddingLeft: 24,
                }}
              />
              <HeartOutlined
                style={{
                  color: "rgb(38, 38, 38)",
                  fontSize: 25,
                  paddingLeft: 24,
                }}
              />
              <Popover content={content} trigger="click">
                {currentUserInfo.profileUrl ? (
                  <Avatar
                    size={30}
                    style={{ marginLeft: 24 }}
                    src={currentUserInfo.profileUrl}
                  />
                ) : (
                  <Avatar
                    size={30}
                    style={{
                      marginLeft: 24,
                      color: "#f56a00",
                      backgroundColor: "#fde3cf",
                      fontSize: 30,
                      userSelect: "none",
                    }}
                  >
                    {usermail[0]}
                  </Avatar>
                )}
              </Popover>
            </span>
          </div>

          <Modal
            title="Create new post"
            centered
            visible={postModalVisible}
            onOk={() => setPostModalVisible(true)}
            onCancel={() => setPostModalVisible(false)}
          >
            <PostForm closeModal={closeModal} />
          </Modal>
        </Header>
      </Layout>
    </>
  );
}
