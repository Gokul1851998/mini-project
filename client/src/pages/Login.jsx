import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertReducer";

function Login() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading)
     const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading)
        if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("token",response.data.token)
          toast("redirecting to Home page");
          Navigate("/"); 
        } else {
          toast.error(response.data.message);
        }
      
    } catch (error) {
      dispatch(hideLoading)
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Welcome Back</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="password" type="password" />
          </Form.Item>
          <Button className="primary-button my-2" htmlType="submit">
            LOGIN
          </Button>
          don't have an account?{" "}
          <Link to="/register" className="anchor">
            {" "}
            Register
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;
