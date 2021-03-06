import React from 'react';
import { Row, Col } from 'antd';
import { Form, Input, Button, message } from 'antd';
import './login.css'
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    let navigate = useNavigate();
    let errorMessage;

    const loginUserFunc = (values) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                localStorage.setItem('email', values.email);
                navigate("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                message.error(errorMessage);
            });
    }

    const onFinish = (values) => {
        loginUserFunc(values);
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
                        <h1 className="heading">Login to Friends App</h1>
                        <p>{errorMessage}</p>

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
                            wrapperCol={{
                                offset: 9,
                                span: 18,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            <Button style={{marginLeft: 30}}>
                            <Link to="/">SignUp</Link>
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default Login;
