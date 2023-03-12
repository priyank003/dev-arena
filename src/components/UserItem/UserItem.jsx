import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import defaultAvatar from "../../assets/ProfileImages/pic.jpg";
const { Meta } = Card;
const UserItem = ({ user }) => (
  <Card
    hoverable
    style={{
      width: 250,
      height: 250,
      marginTop: "20px",
    }}
    cover={
      <img
        alt="example"
        src={user?.avatar?.pathUrl ? user.avatar.pathUrl : defaultAvatar}
        style={{
          height: 250,
          width: 250,
          objectFit: "cover",
        }}
      />
    }
  >
    <Meta
      avatar={
        <Avatar
          // style={{
          //   background: "linear-gradient(45deg,#9D387E, #E85D5C)",
          // }}
          src={user?.avatar?.pathUrl ? user.avatar.pathUrl : defaultAvatar}
        ></Avatar>
      }
      title={user?.name}
      description={user?.about}
    />
  </Card>
);
export default UserItem;
