import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Typography,
  Space,
  Button,
  message,
  InputNumber,
} from "antd";
import "./PricingPage.scss";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Api/BASE_URL";
import { purchase } from "../../Api";
import { useState } from "react";
// const stripePromise = loadStripe("pk_test_51LBHVOK1yTIV9UeQ6GNVOAIy1BQLMrvVI1S7rnUQxQ6iowEpX1cleEDje3xbQ8py0zqhn9sTCHYofAbIQQyGmVtB00SiLbUEmy");
const { Text, Title } = Typography;
export default function PricingPage() {
  const navigate = useNavigate();

  const [credits, setCredits] = useState(0);

  const handleClick = async (type) => {
    try {
      const response = await purchase({
        packageType: type,
        successUrl: `http://localhost:3000/success/${credits}`,
        cancelUrl: "http://localhost:3000/pricing",
      });

      if (response?.status === 200) {
        window.open(response?.data?.url, "_self");
      }
      console.log(response);
    } catch (e) {
      console.log(e);
      message.error(e?.response?.data?.message);
    }
  };

  return (
    <Col
      span={24}
      className="PricingPage"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        paddingRight: "80px",
        paddingLeft: "80px",
        border: "1px solid red",
      }}
    >
      {/* <Elements stripe={stripePromise}></Elements> */}
      <Space direction="vertical" style={{ width: "100%" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Space direction="vertical" size="middle">
            <Title>Post a Job and Find Talent</Title>
            <Text strong>Prospects sent right to your inbox</Text>

            {/* <Button
              style={{
                width: "231px",
                height: "33px",
                marginTop: "15px",
                background: "#59F83F",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "5px",
              }}
            >
              Simple Pricing
            </Button> */}
          </Space>
        </Col>

        <Col span={24}>
          <Row
            align="middle"
            justify="space-around"
            gutter={[0, 20]}
            style={{ width: "100%", overflow: "hidden", padding: "80px 20px" }}
          >
            <Col
              lg={{ span: 7 }}
              md={{ span: 11 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
              className="pricing_card"
            >
              <Row
                gutter={[0, 20]}
                align="middle"
                justify="space-around"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <Col span={24}>
                  <Title>$9.99 per post</Title>
                </Col>

                <Col span={24}>
                  <Text>Posts are live for 30 days</Text>
                </Col>

                <Row
                  align="middle"
                  justify="center"
                  style={{
                    width: "100%",
                  }}
                >
                  <Text>Quantity</Text>

                  <InputNumber
                    defaultValue={0}
                    onChange={(e) => setCredits(e)}

                    // bordered={false}
                  />
                </Row>

                <Col span={24}>
                  {/* <CardElement /> */}
                  <Button
                    block
                    onClick={() => {
                      handleClick("premium");
                    }}
                  >
                    Get Started
                  </Button>
                </Col>
              </Row>
            </Col>

            {/* <Col
              lg={{ span: 7 }}
              md={{ span: 11 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
              className="pricing_card premium_card"
            >
              <Row
                gutter={[0, 20]}
                align="middle"
                justify="space-around"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  textAlign: "center",
                  color: "white",
                }}
              >
                <Col span={24}>
                  <Text style={{ color: "white" }}>Premium</Text>
                </Col>
                <Col span={24}>
                  <Title style={{ color: "white" }}>$19.99</Title>
                </Col>
                <Col span={24}>
                  <Text style={{ color: "white" }}>5 post Credits</Text>
                </Col>
                <Col span={24}>
                  <Text style={{ color: "white" }}>
                    Posts are Live for 30 days
                  </Text>
                </Col>
                <Col span={24}>
                  <Text style={{ color: "white" }}>
                    Credits expire within 60 days
                  </Text>
                </Col>
                <Col span={24}>
                  <Button
                    block
                    style={{ color: "white" }}
                    onClick={() => {
                      handleClick("premium");
                    }}
                  >
                    Get Started
                  </Button>
                </Col>
              </Row>
            </Col> */}

            {/* <Col
              lg={{ span: 7 }}
              md={{ span: 11 }}
              sm={{ span: 12 }}
              xs={{ span: 24 }}
              className="pricing_card"
            >
              <Row
                gutter={[0, 20]}
                align="middle"
                justify="space-around"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                <Col span={24}>
                  <Text>Enterprise</Text>
                </Col>
                <Col span={24}>
                  <Title>$39.99</Title>
                </Col>
                <Col span={24}>
                  <Text>10 post credits</Text>
                </Col>
                <Col span={24}>
                  <Text>Posts are live for 30 days</Text>
                </Col>
                <Col span={24}>
                  <Text>Credits expire within 60 days</Text>
                </Col>
                <Col span={24}>
                  <Button
                    block
                    onClick={() => {
                      handleClick("enterprise");
                    }}
                  >
                    Get Started
                  </Button>
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Col>

        <Col span={24} style={{ textAlign: "center" }}>
          <Text>
            Need More? For custom solutions feel free to contact us at
            hello@gitvisual.com
          </Text>
        </Col>
      </Space>
    </Col>
  );
}
