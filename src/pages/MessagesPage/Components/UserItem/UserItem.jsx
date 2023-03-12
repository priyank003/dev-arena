import { useState } from "react";
import { Col, Row, Space, Avatar, List, Badge, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import { ReactComponent as AudioIcon } from "./audio.svg";
import { ReactComponent as FileIcon } from "./file.svg";
import { ReactComponent as VideoIcon } from "./video.svg";
import usercss from "./UserItem.module.scss";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../../../assets/ProfileImages/deafult_avatar.png";

const { Title, Text } = Typography;
export default function UserItem({ user, onOpenConversation, last_msg }) {
  const navigate = useNavigate();
  const [isTablet, setTsTablet] = useState(
    useMediaQuery({
      query: "(max-width: 768px)",
    })
  );

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 1190px)",
  });

  //   const isTablet = useMediaQuery({
  //     query: "(max-width: 768px)",
  //   });
  // if (isTablet) {
  //   setCollapsed(true);
  // } else {
  //   setCollapsed(false);
  // }
  // { isTablet ? "horizontal" : "vertical" }

  return (
    <List.Item
      rowKey={user.id}
      className={usercss["cl"]}
      style={{ background: user.isActive ? "#18191f" : null }}
      key={user.id}
      onClick={() => {
        navigate(`/chat/${user.id}`);
        // onOpenConversation(user);
      }}
    >
      <List.Item.Meta
        className={usercss["cl__meta"]}
        title={
          <Title className={usercss["cl__name"]} level={5}>
            {user.name}{" "}
          </Title>
        }
        description={
          <Text
            className={usercss["cl__msg"]}
            style={user.typing ? { color: "#258C60" } : null}
          >
            {user.msg_type === "video" ? (
              <VideoIcon style={{ marginRight: "3px" }} />
            ) : null}
            {user.msg_type === "file" ? (
              <FileIcon style={{ marginRight: "3px" }} />
            ) : null}
            {user.msg_type === "audio" ? (
              <AudioIcon style={{ marginRight: "3px" }} />
            ) : null}

            {last_msg}
          </Text>
        }
        avatar={
          <div style={{ position: "relative" }}>
            <Badge
              size="default"
              className={usercss["cl__status"]}
              title={user.online_status ? "Online" : "Offline"}
              color="#41D37E"
              // overflowCount="2"
              style={{ position: "absolute", right: 3, top: "auto", bottom: 3 }}
              dot={user.online_status}
            >
              <Avatar
                icon={<UserOutlined />}
                className={usercss["cl__avatar"]}
                size={{
                  xs: 40,
                  sm: 32,
                  md: 40,
                  lg: 46,
                  xl: 46,
                  xxl: 46,
                }}
                src={
                  user.avatar?.pathUrl ? user.avatar?.pathUrl : defaultAvatar
                }
                alt={user.name}
              />
            </Badge>
          </div>
        }
      />
      <div className={usercss["cl__info"]}>
        <div>
          <Text className={usercss["cl__time"]}>{user.time} </Text>
        </div>
        {(() => {
          if (user.unreadCount !== 0) {
            return (
              <Badge
                className={usercss["cl__unreadCount"]}
                color="#D34141"
                // overflowCount="2"
                size="16"
                style={{ boxShadow: "none" }}
                count={user.unreadCount !== 0 ? user.unreadCount : null}
              />
            );
          } else {
            return <> </>;
          }
        })()}
      </div>
    </List.Item>
  );
}
