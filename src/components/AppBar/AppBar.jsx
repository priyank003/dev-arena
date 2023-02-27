import {
  Row,
  Col,
  Avatar,
  Dropdown,
  Space,
  Input,
  Select,
  Image,
  Typography,
  Button,
  Divider,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import { DownOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";

import { ReactComponent as CogIcon } from "./Assets/cog.svg";
import { ReactComponent as BellIcon } from "./Assets/bell.svg";
import JobsMenu from "./JobsMenu";
import logo from "../../assets/svg/logo.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/Slices/userSlice";

const { Text } = Typography;

const items = [
  {
    key: "1",
    label: <Link to="/profile">Profile</Link>,
  },
  {
    key: "2",
    label: <Link to="/editskills">Upload</Link>,
  },
  {
    key: "3",
    label: <Link to="/editprofile">Edit Profile</Link>,
  },
  {
    key: "4",
    danger: true,
    label: <Link to="/deleteaccount">Delete Account</Link>,
  },
  {
    key: "5",
    danger: true,
    label: (
      <Link
        // to="/auth/login"
        onClick={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("persist:root");
          const dispatch = useDispatch();
          dispatch(getUserData(""));
        }}
      >
        Sign Out
      </Link>
    ),
  },
];
const items2 = [
  {
    key: "job_1",
    label: <Link to="/profile">Profile</Link>,
  },
  {
    key: "job_2",
    label: <Link to="/editskills">Upload</Link>,
  },
  {
    key: "job_3",
    label: <Link to="/editprofile">Edit Profile</Link>,
  },
  {
    key: "job_4",
    danger: true,
    label: <Link to="/deleteaccount">Delete Account</Link>,
  },
  {
    key: "job_5",
    danger: true,
    label: <Link to="/auth/login">Sign Out</Link>,
  },
];
const jobMenuItems = [
  {
    label: <Link to="/sellers">Find Jobs</Link>,
    key: "111",
  },
  {
    label: <Link to="/jobpost">Post Jobs</Link>,
    key: "112",
  },
  {
    key: "114",
    type: "divider",
  },
  {
    label: <Link to="/posts">Your Postings</Link>,
    key: "113",
  },
];

const searchItems = [
  {
    key: "1",
    label: <p>User</p>,
  },
  {
    key: "2",
    label: <p>Posts</p>,
  },
];

export default function AppBar() {
  const { Search } = Input;
  useEffect(() => {}, []);
  const navigate = useNavigate();
  const data = useSelector((state) => state.user);

  const [searchQuery, setSearchQuery] = useState("");

  const searchHandler = (e) => {
    navigate({ pathname: "/discover", search: `q=${searchQuery}` });
    setSearchQuery("");
  };
  const onSearch = (value) => console.log(value);
  return (
    <Row
      className="AppBar"
      // align="middle"
      style={{
        overflow: "hidden",
        width: "100%",
        padding: "0.5rem",
      }}
      // gutter={[10, 10]}
    >
      <Col
        md={{ span: 2 }}
        lg={{ span: 2 }}
        xl={{ span: 2 }}
        // xl={{ span: 4 }}
      >
        <JobsMenu />
      </Col>

      <Col md={{ span: 2 }} lg={{ span: 2 }} xl={{ span: 2 }}>
        <Link to="/discover">Discover</Link>
      </Col>

      <Col md={{ span: 4 }} lg={{ span: 4 }} xl={{ span: 4 }}>
        <Col>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="search"
            placeholder="Search Community"
            suffix={<SearchOutlined onClick={searchHandler} />}
          />
        </Col>
      </Col>

      <Col
        md={{ span: 8 }}
        lg={{ span: 8 }}
        xl={{ span: 8 }}
        style={{ textAlign: "center" }}
      >
        <Link to="/">
          <Image src={logo} height="auto" preview={false} />
        </Link>
      </Col>

      <Col md={{ span: 8 }} lg={{ span: 8 }} xl={{ span: 8 }}>
        <Row
          align="middle"
          justify="end"
          style={{ overflow: "hidden", width: "100%" }}
        >
          <Space direction="horizontal" size="middle">
            {/* <Col lg={{ span: 2 }}>
              <CogIcon />
            </Col> */}

            <Col lg={{ span: 2 }}>
              <Link to="/chat">
                <BsChat />
              </Link>
            </Col>

            {/* <Col lg={{ span: 2 }}>
              <BellIcon />
            </Col> */}

            <Col>
              <Link to="/profile">
                <Avatar
                  icon={<UserOutlined />}
                  src="https://joeschmoe.io/api/v1/random"
                />
              </Link>
            </Col>

            <Col lg={{ span: 24 }} className="user_menu">
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomRight"
                className="user_menu"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {data?.name}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
              <Divider type="vertical" />

              {JSON.parse(localStorage.getItem("access_token")) !== null ? (
                <Link to="/editskills">
                  <Button className="upload-btn">Upload</Button>
                </Link>
              ) : (
                <Link to="/auth/login">
                  <Button className="upload-btn">Login</Button>
                </Link>
              )}
            </Col>
          </Space>
        </Row>
      </Col>
    </Row>
  );
}
