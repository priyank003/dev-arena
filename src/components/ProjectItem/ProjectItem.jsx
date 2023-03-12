import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";

import avatar from "./Avatar.png";
import css from "./ProjectItem.module.scss";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/ProfileImages/deafult_avatar.png";
import defaultPostCover from "../../assets/ProjectImages/project3.jpg";

const { Meta } = Card;
const { Text, Title } = Typography;

export default function ProjectItem({ project }) {
  const navigate = useNavigate();
  console.log(project);
  return (
    <Card
      onClick={() => {
        navigate({ pathname: "/skills", search: `?post=${project?.postId}` });
      }}
      className={css["card"]}
      cover={
        <img
          style={{ objectFit: "cover", height: "220px", borderRadius: "10px" }}
          alt="Project Cover"
          src={project?.cover ? project?.cover : defaultPostCover}
        />
      }
    >
      <Meta
        style={{ marginTop: "5px" }}
        avatar={
          <Avatar
            className={css["card__avatar"]}
            src={
              project?.author?.avatar
                ? project.author.avatar.pathUrl
                : defaultAvatar
            }
          />
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
                  {project?.projectName}
                </Text>
                <Text className={css["card__author"]} type="secondary">
                  By {project?.author.username}
                </Text>
              </Col>

              <Col span={10} style={{ textAlign: "end" }}>
                <Space
                  style={{
                    width: "100%",
                    textAlign: "end",
                    justifyContent: "end",
                  }}
                >
                  <Text className={css["card__likes"]}>
                    <HeartOutlined /> {project?.likes}
                  </Text>
                  <Text className={css["card__views"]}>
                    <EyeOutlined /> {project?.views}
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
