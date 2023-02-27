import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";

import avatar from "./Avatar.png";
import css from "./ProjectItemAlt.module.scss";

const { Meta } = Card;
const { Text, Title } = Typography;

export default function ProjectItem({ project }) {
  return (
    <Card
      className={css["card"]}
      cover={
        <img
          style={{ objectFit: "cover", height: "220px", borderRadius: "10px" }}
          alt="Project Cover"
          src={project?.media[0].pathUrl}
        />
      }
    >
      <Meta
        avatar={
          <Avatar className={css["card__avatar"]}>
            {project?.author.username[0]}
          </Avatar>
        }
        title={
          <Col span={24}>
            <Row
              // gutter={[20, 10]}
              style={{
                overflow: "hidden",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Col
                span={12}
                style={{ overflow: "hidden", alignItems: "center" }}
              >
                <Text className={css["card__name"]} strong>
                  {project?.title}

                  <Text className={css["card__badge"]} type="secondary">
                    {project?.author.name}
                  </Text>
                </Text>
              </Col>

              <Col span={10} style={{ textAlign: "end" }}>
                <Space
                  style={{
                    width: "100%",
                    textAlign: "end",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text className={css["card__likes"]}>
                    <HeartOutlined /> {project?.likesCount}
                  </Text>
                  <Text className={css["card__views"]}>
                    <EyeOutlined /> {project?.viewsCount / 100 + "K"}
                  </Text>
                </Space>
              </Col>
            </Row>
          </Col>
        }
      />
    </Card>
  );
}
