import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
const UserItem = ({ user }) => (
  <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }

  >
    <Meta
      avatar={
        <Avatar
          style={{
            background: "linear-gradient(45deg,#9D387E, #E85D5C)",
          }}
        >
          {user.name[0]}
        </Avatar>
      }
      title={user.name}
      description="This is the description"
    />
  </Card>
);
export default UserItem;
