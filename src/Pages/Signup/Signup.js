import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Space,
  notification,
  Alert,
} from "antd";
import "./signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";

function Signup() {


  const auth = getAuth();
  let navigate = useNavigate();

  const onFinish = async(values) => {
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        user.displayName = values.username;
        setDoc(doc(fireDB, "users", user.uid), {
          name: values.username,
          email: values.email,
          uid: user.uid,
        }).then(() => {
          message.success("Account created!");
          navigate("/");
          window.location.reload(false);
        });
        localStorage.setItem("email", values.email);
      })
      .catch((error) => {
        console.log("error: ", error.message);
        alert(error.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    alert(errorInfo.message);
  };

  return (
    <div className="center">
      <Row>
        <Col span={24}>
          <Form
            name="basic"
            labelCol={{
              span: 9,
            }}
            wrapperCol={{
              span: 6,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 className="heading">Create New Account</h1>

            <Form.Item
              label="Username"
              name="username"
              htmlType="name"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 9,
                span: 18,
              }}
            >
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
              <Button style={{ marginLeft: 30 }}>
                <Link to="login">SignIn</Link>
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Signup;
