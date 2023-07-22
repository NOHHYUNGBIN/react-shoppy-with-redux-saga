import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";

const Signup = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Form
        name="signupForm"
        className="w-96 bg-white p-8 rounded shadow"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className="text-2xl font-bold mb-6">회원가입</h1>
        <Form.Item
          label="이메일"
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해주세요." },
            { type: "email", message: "올바른 이메일 형식이 아닙니다." },
          ]}
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
        <Form.Item
          label="비밀번호 확인"
          name="confirmPassword"
          rules={[
            { required: true, message: "비밀번호를 다시 입력해주세요." },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("비밀번호가 일치하지 않습니다.");
              },
            }),
          ]}
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
            가입하기
          </Button>
          이미 회원이신가요? <Link to="/login">로그인</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
