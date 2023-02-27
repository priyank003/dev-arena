import "./FooterMain.scss";
import { Col, Row, Typography, Button, Input, Form, Space } from "antd";

// import { BiPhoneCall } from "react-icons/bi";
import { IoMailOutline, IoLogoDiscord } from "react-icons/io5";
import { TwitterOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

export default function Footer() {
  return (
    <section className="Footer">
      <Row
        justify="space-between"
        style={{ overflow: "hidden", width: "100%" }}
        gutter={[30, 40]}
      >
        <Col lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <Row
            align="middle"
            justify="space-between"
            gutter={[0, 40]}
            style={{ overflow: "hidden", width: "100%" }}
          >
            <Col span={24}>
              <Title level={4} style={{ color: "white" }}>
                Gitvisual
              </Title>
              <Text style={{ color: "#8C8C8C" }}>
                Explore the world’s best developers. Show off your skills, get
                inspiration, and find jobs that are right for you. A place to
                publicly build and show off your portfolio.
              </Text>
            </Col>

            <Col span={24}>
              <Row
                align="middle"
                // justify="space-between"
                gutter={[10, 10]}
                style={{ overflow: "hidden", width: "100%" }}
              >
                {/* <Col lg={{ span: 12 }} md={{ span: 12 }} xs={{ span: 24 }}>
                  <Row style={{ overflow: "hidden", width: "100%" }}>
                    <Col lg={{ span: 5 }} md={{ span: 5 }} xs={{ span: 8 }}>
                      <div className="circle">
                        <BiPhoneCall size="20px" color="white" />
                      </div>
                    </Col>

                    <Col lg={{ span: 19 }} md={{ span: 19 }} sm={{ span: 15 }}>
                      <Text style={{ color: "#8C8C8C" }}>Have a question?</Text>
                      <Title level={5} style={{ margin: 0, color: "white" }}>
                        310-437-2766
                      </Title>
                    </Col>
                  </Row>
                </Col> */}

                <Col lg={{ span: 12 }} md={{ span: 12 }} xs={{ span: 24 }}>
                  <Row style={{ overflow: "hidden", width: "100%" }}>
                    <Col lg={{ span: 6 }} md={{ span: 6 }} xs={{ span: 6 }}>
                      <div className="circle">
                        <IoMailOutline size="20px" color="white" />
                      </div>
                    </Col>
                    <Col lg={{ span: 18 }} md={{ span: 18 }} sm={{ span: 14 }}>
                      <Text style={{ color: "#8C8C8C" }}>Contact us at</Text>
                      <Title level={5} style={{ margin: 0, color: "white" }}>
                        hello@gitvisual.com
                      </Title>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col lg={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
          <Row
            align="middle"
            justify="space-between"
            gutter={[0, 20]}
            style={{ overflow: "hidden", width: "100%" }}
          >
            <Col span={24}>
              <Title level={4} style={{ color: "white" }}>
                Newsletter
              </Title>
              <Text style={{ color: "#8C8C8C" }}>
                Be the first one to know about discounts, offers and events.
                Unsubscribe whenever you like.
              </Text>
            </Col>

            <Col span={24}>
              <Form
                name="newsletter"
                size="large"
                // onFinish={subscribeNewsLetter}
              >
                <Col span={24}>
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
                    <Input
                      className="subscribe_input"
                      placeholder="Enter your Email"
                      prefix={
                        <Button
                          // htmlType="submit"
                          type="text"
                          icon={
                            <IoMailOutline
                              size="20px"
                              color="#8C8C8C"
                              style={{ padding: 0 }}
                            />
                          }
                        />
                      }
                      suffix={
                        <Button
                          // htmlType="submit"
                          type="text"
                          style={{
                            width: "100px",
                            height: "36px",
                            background: "#537CE6",
                            borderRadius: "30px",
                            color: "white",
                            fontSize: "10px",
                            fontWeight: 700,
                          }}
                        >
                          Submit
                        </Button>
                      }
                    />
                  </Form.Item>
                </Col>
              </Form>
            </Col>

            <Col lg={{ span: 24 }} md={{ span: 24 }} sm={{ span: 24 }}>
              <Row
                align="middle"
                // justify="space-between"
                style={{ overflow: "hidden", width: "100%" }}
                className="acaaa"
              >
                <Col lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
                  <Row
                    className="text"
                    style={{
                      overflow: "hidden",
                      width: "100%",
                    }}
                    // gutter={[10, 30]}
                  >
                    <Space size="large">
                      <Col lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <div className="circle">
                          <IoLogoDiscord size="20px" color="white" />
                        </div>
                      </Col>
                      <Col lg={{ span: 6 }} sm={{ span: 12 }} xs={{ span: 12 }}>
                        <div className="circle">
                          <TwitterOutlined
                            style={{ color: "white", fontSize: "20px" }}
                          />
                        </div>
                      </Col>
                    </Space>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
}
