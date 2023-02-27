import { Input, InputNumber, Space, Typography, Divider, Image } from "antd";
import { useEffect } from "react";
import { PlusCircleOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";

import css from "./WriteMessage.module.scss";
import { ReactComponent as ImageIcon } from "./imgicon.svg";
import { ReactComponent as EmojiIcon } from "./emojiicon.svg";
import { ReactComponent as PlusIcon } from "./plus.svg";

const { Title, Text } = Typography;

export default function WriteMessage({ onChange }) {
	useEffect(() => {}, []);
	const handleChange = () => {
		console.log("Dad");
	};
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			<input type="file" id="msg_file" style={{ display: "none" }} />
			<input type="file" id="msg_image" style={{ display: "none" }} />
			<Input
				onChange={(e) => {
					onChange(e.target.value);
				}}
				maxLength="150"
				allowClear={true}
				placeholder="Add a Message..."
				style={{ color: "white" }}
				// suffix={}
			/>
			<>
				{/* <label htmlFor="msg_image" style={{ margin: "0" }}>
          <ImageIcon />
        </label>
        &nbsp; &nbsp;
        <label htmlFor="" style={{ margin: "0" }}>
          <EmojiIcon />
        </label>
        &nbsp; &nbsp; */}
				<label htmlFor="msg_file" style={{ margin: "0" }}>
					<PlusIcon />
				</label>
				&nbsp;
			</>
		</div>
	);
}
