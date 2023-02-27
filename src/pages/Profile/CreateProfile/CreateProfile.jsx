// Library Imports

import { Row, Col, Typography, Form, Input, Button, Space } from "antd";

// Pages, Components, Media & StyleSheets
import "../Profile.scss";
import Banner from "../../../components/Banner/Banner";
import BannerImage from "../../../assets/Banners/banner3.png";

// Library Constants
const { Text, Title } = Typography;

export default function CreateProfile() {
  return (
    <Col className="CreateProfile" span={24}>
      <Row justify="center" style={{ overflow: "hidden", width: "100%" }}>
        <Col span={24} className="banner">
          <Banner Image={BannerImage} />
        </Col>

        <Col
          xs={{ span: 20 }}
          sm={{ span: 18 }}
          md={{ span: 16 }}
          lg={{ span: 14 }}
          xl={{ span: 12 }}
          className="profileForm"
        >
          <Title level={4}>Create Profile</Title>
          <Form
            size="large"
            name="signup_form"
            autoComplete="on"
            layout="vertical"
            scrollToFirstError
            requiredMark="optional"
            // onFinish={}
            initialValues={{
              remember: true,
            }}
          >
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid name!",
                  },
                  { min: 3, message: "Too Short!" },
                  { max: 15, message: "Too Long!" },
                  {
                    pattern: /^[aA-zZ\s]+$/,
                    message: "Only alphabets are allowed for this field ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Username"
                name="userName"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid name!",
                  },
                  { min: 3, message: "Too Short!" },
                  { max: 15, message: "Too Long!" },
                  {
                    pattern: /^[aA-zZ\s]+$/,
                    message: "Only alphabets are allowed for this field ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="About Section"
                name="about"
                rules={[
                  {
                    required: true,
                    message: "Enter something about yourself!",
                  },
                  { min: 2, message: "Too Short!" },
                  { max: 100, message: "Too Long!" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Title level={5}>Social Profile</Title>

            <Col span={24}>
              <Form.Item
                label="Twitter"
                name="twitter"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="GitLab"
                name="gitLab"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="GitHub"
                name="gitHib"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="LinkedIn"
                name="LinkedIn"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Behance"
                name="behance"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="CodePen"
                name="codePen"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24} style={{ textAlign: "center" }}>
              <Space direction="horizontal">
                <Form.Item>
                  <Button type="ghost" className="cancel">
                    Cancel
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    className="save"
                    htmlType="submit"
                    // block
                  >
                    Save
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Form>
        </Col>
      </Row>
    </Col>
  );
}
