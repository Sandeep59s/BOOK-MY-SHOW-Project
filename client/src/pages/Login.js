import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../apiCalls/users";

function Login() {
  const navigate = useNavigate(); // as useNavigate returns a function
  const onSubmit = async (value) => {
    console.log(value);
    try {
      const response = await LoginUser(value);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token' , response.token)
        navigate("/"); // to navigate ot to home route as the user has logged in
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BookMyShow</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={onSubmit}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!!!" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your Email"
                ></Input>
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!!!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                ></Input>
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <h3>
                New User? <Link to="/register">Register Here</Link>
              </h3>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Login;
