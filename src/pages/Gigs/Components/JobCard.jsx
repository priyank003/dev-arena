import { UserOutlined } from "@ant-design/icons";
import {
  Avatar, Badge, Button,
  Col,
  Collapse, Row,
  Space,
  Typography
} from "antd";
import { BiLocationPlus } from "react-icons/bi";

import user from "./../../../assets/Profile Images/profile_pic.png";
import css from "./JobCard.module.scss";

const { Panel } = Collapse;
const { Text, Title } = Typography;

export default function JobCard() {
  const jobData = {
    id: 1,
    name: "Art Director",
    job_type: "Permanent",
    designation: "wizards of the coast",
    location: "Tokyo, Japan",
    description:
      "Officia duis ad esse pariatur duis esse. Sit occaecat culpa sint eiusmod. Est magna eiusmod ullamco ut incididunt incididunt do amet labore. Irure nulla ea nulla aliqua commodo. Nisi consequat labore eu sint consequat enim pariatur dolore ea aliqua exercitation.",
  };

  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 24 }}
      lg={{ span: 24 }}
      xl={{ span: 24 }}
      className={css["job"]}
    >
      <Row
        style={{
          width: "100%",
          overflow: "hidden",
        }}
        gutter={[10, 0]}
      >
        <Row
          style={{
            width: "100%",
            overflow: "hidden",
          }}
          gutter={[0, 10]}
        >
          <Col span={5} md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
            <Space size="middle" direction="vertical">
              <Space size="middle">
                <Col>
                  <Badge
                    dot
                    style={{
                      position: "absolute",
                      right: 3,
                      top: "auto",
                      bottom: 3,
                    }}
                    color="#52c41a"
                  >
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 28,
                        md: 32,
                        lg: 36,
                        xl: 42,
                        xxl: 42,
                      }}
                      className={css["circle"]}
                      src={user}
                      alt="user"
                      preview={false}
                      icon={<UserOutlined />}
                    />
                  </Badge>
                </Col>
                <Col>
                  <Space direction="vertical">
                    <Text className={css["job__name"]}>{jobData.name}</Text>
                    <Text className={css["job__designation"]}>
                      {jobData.designation}
                    </Text>
                  </Space>
                </Col>
              </Space>

              <Button className={css["job__type"]}>{jobData.job_type}</Button>

              <Col span={24}>
                <Text style={{ color: "white" }}>
                  <BiLocationPlus /> {jobData.location}
                </Text>
              </Col>
            </Space>
          </Col>
          <Col span={18} md={{ span: 17 }} sm={{ span: 22 }} xs={{ span: 22 }}>
            <Title level={5} style={{ color: "white" }}>
              Description
            </Title>
            <Text className={css["job__description"]}>
              {jobData.description}
            </Text>
          </Col>
        </Row>
      </Row>
    </Col>
  );
}
