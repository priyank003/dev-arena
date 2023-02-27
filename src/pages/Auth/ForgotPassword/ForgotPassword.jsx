import { Button, Col, Form, Input, Row, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export default function ForgotPassword() {
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
            <Title level={2}>Forgot Password</Title>
            <Text>
              Enter the email you used to create your account so we can send you
              instructions on how to reset your password.
            </Text>
          </Col>

          <Col span={24}>
            <Form
              className="form"
              size="large"
              name="forgotPassword_form"
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
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid email!",
                  },
                  {
                    pattern:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Please enter a valid email!",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="primary_btn"
                  htmlType="submit"
                  block
                >
                  Send
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
