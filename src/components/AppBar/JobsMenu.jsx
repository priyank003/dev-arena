import { Dropdown, Space, Typography, Image } from "antd";
import { Link } from "react-router-dom";

import breifcase from "../../assets/svg/breifcase.svg";
import { DownOutlined } from "@ant-design/icons";

const { Text } = Typography;

const items = [
  {
    key: "job_1",
    label: <Link to="/sellers">Find Jobs</Link>,
  },
  {
    key: "job_2",
    label: <Link to="/jobpost">Post Jobs</Link>,
  },
  {
    key: "job_3",
    label: <Link to="/posts">Your Postings</Link>,
  },
];

export default function JobsMenu() {
  return (
    <>
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ["job_2"],
        }}
      >
        <Typography.Link>
          <Space>
            Jobs
            <Image src={breifcase} preview={false} />
            <DownOutlined />
          </Space>
        </Typography.Link>
      </Dropdown>
    </>
  );
}
