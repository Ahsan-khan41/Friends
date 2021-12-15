import React from 'react';
import { Row, Col } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import './signup.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Signup() {

    // const putUserinfoFunc = async() => {

    //     const docRef = await addDoc(collection(db, "cities"), {
    //         name: "Tokyo",
    //         country: "Japan"
    //     });
    //     console.log("Document written with ID: ", docRef.id);

    // }

    let navigate = useNavigate();
    const createUserFunc = (values) => {
        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, values.email, values.password, values.username)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("success: " + user);
                navigate("/dashboard");
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                // ..
            })

    }

    const onFinish = (values) => {
        console.log('Success:', values);
        createUserFunc(values);
        // putUserinfoFunc(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
                        <h1 className="heading">Signup</h1>

                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
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
                                    message: 'Please input your email!',
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
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 9,
                                span: 18,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 9,
                                span: 18,
                            }}
                        >
                            <Button type="primary" htmlType="submit">

                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Signup;