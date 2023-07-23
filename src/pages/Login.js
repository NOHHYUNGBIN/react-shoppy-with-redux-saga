import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Alert, Spin, message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useAuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { signInReq } from "../store/user/action";

const Login = () => {
  const { logIn } = useAuthContext();
  const { error, loading, signInSuccess, signUpSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.debug("signInSuccess", signInSuccess);
  console.debug("signUpSuccess", signUpSuccess);
  const onFinish = (values) => {
    const { email, password } = values;
    dispatch(signInReq(email, password));
  };

  useEffect(() => {
    if (signInSuccess) {
      message.success("즐거운 쇼핑 되세요!");
      navigate("/");
    }
  }, [signInSuccess]);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        name="loginForm"
        className="w-96 bg-white p-8 rounded shadow"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className="text-2xl font-bold mb-6">로그인</h1>
        <Form.Item
          label="이메일"
          name="email"
          rules={[{ required: true, message: "이메일을 입력해주세요." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="비밀번호"
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ backgroundColor: "#FFD700", borderColor: "#FFD700" }}
          >
            로그인
          </Button>
          <div className="flex items-center justify-between mt-4">
            <Link to="/forgot-password">비밀번호 찾기</Link>
            <Button
              className="flex items-center"
              icon={<GoogleOutlined />}
              style={{
                backgroundColor: "#FFD700",
                borderColor: "#FFD700",
                color: "white",
              }}
              onClick={logIn}
            >
              구글 로그인
            </Button>
          </div>
        </Form.Item>
        {loading && <Spin />}
        {error && <Alert message={error} type="error" />}
        <Form.Item>
          아직 회원이 아니신가요? <Link to="/signup">회원가입</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
