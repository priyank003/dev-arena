import { Link } from "react-router-dom";
import { Row, Col, Typography, Form, Input, Button } from "antd";

import "./../Auth.scss";
const { Title, Text } = Typography;

export default function ResetPassword() {
  return (
    <Col
      span={24}
      className="background_cover"
      style={{ padding: "60px 90px", overflow: "hidden" }}
    >
      <Col
        className="card"
        lg={{ span: 10 }}
        md={{ span: 16 }}
        sm={{ span: 20 }}
      >
        <Row
          style={{
            overflow: "hidden",
            padding: "70px",
            width: "100%",
          }}
          gutter={[0, 70]}
          className="card_inner"
        >
          <Col span={24}>
            <Title level={2}>Reset Password</Title>
            <Text>Choose a new password for your account</Text>
          </Col>

          <Col span={24}>
            <Form
              className="form"
              size="large"
              name="resetPassword_form"
              autoComplete="on"
              layout="vertical"
              scrollToFirstError
              requiredMark="optional"
              // onFinish={}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Your new password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password placeholder="Confirm your new password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="primary_btn"
                  htmlType="submit"
                  block
                >
                  Reset Password
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/auth/login">
                  <Button
                    //   type="primary"
                    block
                    style={{ border: "1px solid #000000", background: "none" }}
                  >
                    Back to Login
                  </Button>
                </Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Col>
  );
}
