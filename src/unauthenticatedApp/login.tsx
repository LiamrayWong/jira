import React from "react";
import { useAuth } from "../context/authContext";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/useAsync";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwError: true });

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      //login是异步的，直接运行catch，所以获取不到error
      await run(login(values));
    } catch (error) {
      onError(error);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
