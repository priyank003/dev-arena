import { Avatar, Col, Divider, Image, Input, List, Row, Space, Typography } from "antd";

import { PlusCircleOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { TbMessage } from "react-icons/tb";
import chatImage from "../../assets/Banners/banner2.png";
import "./MessagesPage.Module.scss";
import { users } from "./chatList";
import MsgIcon from "./img/msg.svg";
import UserItem from "./Components/UserItem/UserItem";
const { Title, Text } = Typography;
export default function MessagesPage() {
	return (
		<Col className="MessagesPage">
			<Row style={{ width: "100%", overflow: "hidden" }} className="mainRow">
				<Col lg={{ span: 7 }} md={{ span: 8 }} xs={{ span: 24 }} className="list">
					<Space direction="vertical" size="large" style={{ width: "80%" }}>
						<Title style={{ color: "white" }}>Messages</Title>

						<Col span={24}>
							<Space
								direction="vertical"
								size="middle"
								style={{
									width: "100%",
									justifyContent: "center",
								}}
							>
								<Input prefix={<SearchOutlined style={{ color: "gray" }} />} className="search-msg" placeholder=" Search..." size="large" />

								<div
									id="scrollableDiv"
									style={{
										height: 550,
										overflow: "auto",
									}}
								>
									<List dataSource={users.slice(2)} renderItem={(user) => <UserItem user={user} />} />
								</div>
							</Space>
						</Col>
					</Space>
				</Col>
			</Row>
		</Col>
	);
}
