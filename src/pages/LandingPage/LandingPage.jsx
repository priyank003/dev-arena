import { Col, Row, Typography } from "antd";

const { Text, Title } = Typography;

export default function LandingPage() {
  return (
    <Col span={24}>
      <Row
        style={{
          width: "100%",
          overflow: "hidden",
          paddingTop: "120px",
          paddingBottom: "120px",
          paddingRight: "80px",
          paddingLeft: "80px",
        }}
      >
        <Col span={24}>
          <Title level={4}>landingPage</Title>
        </Col>
      </Row>
    </Col>
  );
}
