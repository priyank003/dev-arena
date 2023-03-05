import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Col,
  Row,
  Space,
  Typography,
  Divider,
  Image,
  Dropdown,
} from "antd";
import { useEffect } from "react";

import css from "./MessagesItem.module.scss";
import chatImage from "./msgImg.png";
import { ReactComponent as MenuIcon } from "./menuicon.svg";
const { Title, Text } = Typography;

export default function MessagesItem({ MsgsArray, currentUser, receiver }) {
  return (
    <>
      {/* <Divider
        plain
        style={{
          fontWeight: "500",
          fontSize: "13px",
          lineHeight: "17px",
          borderColor: "#212229",
          color: "#6B7C93",
        }}
      >
        {date}
      </Divider> */}
      {MsgsArray?.map((msg, index) => {
        return (
          <>
            {msg.sender.id === currentUser.id ? (
              <SentMessage
                key={index}
                date={msg.postedAt}
                name={msg.sender.name}
                avatar={msg.sender.avatar.pathUrl}
                msg={msg}
              />
            ) : (
              <ReplyMessage
                key={index}
                date={msg.postedAt}
                name={msg.receiver.name}
                avatar={msg.receiver.avatar.pathUrl}
                msg={msg}
              />
            )}
          </>
        );
      })}
    </>
  );
}

function SentMessage({ date, name, avatar, msg }) {
  const items = [
    {
      label: "Delete",
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: "Edit",
      key: "2",
    },
  ];

  return (
    <Space
      className={css["chat"]}
      style={{
        alignItems: "start",
        justifyContent: "end",
        textAlign: "right",
        width: "100%",
      }}
    >
      <Space
        style={{
          alignItems: "end",
        }}
        direction="vertical"
      >
        <Row className={css["chat__meta"]}>
          <Col span={11} order={2}>
            <Text className={css["chat__name"]}>
              {name.split(" ").map(function (char, index) {
                return (
                  <>
                    {index === 0 ? (
                      <> {char} </>
                    ) : (
                      <span className={css["chat__lname"]} key={index}>
                        {" "}
                        {char}
                      </span>
                    )}
                  </>
                );
              })}
            </Text>
          </Col>
          <Col span={13} order={1}>
            <Text className={css["chat__time"]}>{msg.time}</Text>
          </Col>
        </Row>

        <Space>
          <Col>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a
                onClick={(e) => e.preventDefault()}
                style={{ padding: "2px 8px" }}
              >
                <MenuIcon />
              </a>
            </Dropdown>
          </Col>
          {msg.imageincluded ? (
            <Col>
              <Image
                src={chatImage}
                alt="SentImage"
                width={150}
                height={210}
                style={{ borderRadius: "8px" }}
              />
            </Col>
          ) : (
            <Col className={css["chat__message"]} style={{}}>
              <Text>{msg.text}</Text>
            </Col>
          )}
        </Space>
      </Space>
      <Avatar
        icon={<UserOutlined />}
        size={{
          xs: 18,
          sm: 20,
          md: 28,
          lg: 34,
          xl: 36,
          xxl: 36,
        }}
        src={avatar}
      />
    </Space>
  );
}

function ReplyMessage({ date, name, avatar, msg }) {
  const items = [
    {
      label: "Delete",
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: "Edit",
      key: "2",
    },
  ];

  return (
    <Space
      className={css["chat"]}
      style={{
        alignItems: "start",
        width: "100%",
      }}
    >
      <Avatar
        icon={<UserOutlined />}
        size={{
          xs: 24,
          sm: 26,
          md: 30,
          lg: 34,
          xl: 36,
          xxl: 36,
        }}
        src={avatar}
      />

      <Space
        style={{
          alignItems: "start",
        }}
        direction="vertical"
      >
        <Row className={css["chat__meta"]}>
          <Col span={11} order={1}>
            <Text className={css["chat__name"]}>
              {/* {name} */}
              {name.split(" ").map(function (char, index) {
                return (
                  <>
                    {index === 0 ? (
                      <> {char} </>
                    ) : (
                      <span className={css["chat__lname"]} key={index}>
                        {" "}
                        {char}{" "}
                      </span>
                    )}
                  </>
                );
              })}
            </Text>
          </Col>
          <Col span={13} order={2}>
            <Text className={css["chat__time"]}>{msg.time}</Text>
          </Col>
        </Row>

        <Space>
          {msg.imageincluded ? (
            <Col>
              <Image
                src={chatImage}
                alt="SentImage"
                width={150}
                height={210}
                style={{ borderRadius: "8px" }}
              />
            </Col>
          ) : (
            <Col className={css["chat__message"]} style={{}}>
              <Text>{msg.text}</Text>
            </Col>
          )}
          <Col>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a
                onClick={(e) => e.preventDefault()}
                style={{ padding: "2px 8px" }}
              >
                <MenuIcon />
              </a>
            </Dropdown>
          </Col>
        </Space>
      </Space>
    </Space>
  );
}
