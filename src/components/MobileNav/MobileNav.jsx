import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  Space,
  Row,
  Col,
  Typography,
  Input,
  Collapse,
  Divider,
  Image,
} from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { SearchOutlined } from "@ant-design/icons";

import css from "./MobileNav.module.scss";
import logo from "../../assets/svg/logo_black.svg";

const { Panel } = Collapse;
const { Text } = Typography;

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Row
        align="middle"
        justify="space-between"
        className={css["mobileNav"]}
        style={{ overflow: "hidden", width: "100" }}
      >
        <Col
          xs={{ span: 4 }}
          sm={{ span: 3 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <GiHamburgerMenu
            onClick={showDrawer}
            style={{ fontSize: "1.1rem" }}
          />
        </Col>

        <Col xs={{ span: 12 }} sm={{ span: 8 }} style={{ textAlign: "center" }}>
          {/* <Link to="/" style={{ color: "black" }}>
            <Title
              level={3}
              style={{ margin: 0, textAlign: "center", color: "black" }}
            >
              GitVisual
            </Title>
          </Link> */}

          <Link to="/">
            <Image src={logo} preview={false} style={{ maxWidth: 120 }} />
          </Link>
        </Col>

        <Col xs={{ span: 4 }} sm={{ span: 3 }} style={{ textAlign: "end" }}>
          <Link to="/auth/login">
            <Text
              strong
              style={{ fontSize: "14px", color: "black", textAlign: "right" }}
            >
              Sign In
            </Text>
          </Link>
        </Col>
      </Row>

      <Drawer
        title={
          <Link to="/">
            <Image src={logo} preview={false} style={{ maxWidth: 120 }} />
          </Link>
        }
        placement="left"
        closable={true}
        onClose={onClose}
        open={open}
        key="left"
        style={{ maxWidth: 250 }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Col span={24}>
            <Input
              className={css["search"]}
              placeholder="Search Community"
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col span={24}>
            <Link to="/discover">Discover</Link>
          </Col>
          <Col>
            <Collapse accordion expandIconPosition="end">
              <Panel header="Jobs" key="1">
                <Link to="/sellers">Find Jobs</Link>
                <Divider />
                <Link to="/jobpost">Post Jobs</Link>
                <Divider />
                <Link to="/posts">Your Postings</Link>
                <Divider />
              </Panel>

              <Panel header="Profile" key="2">
                <Link to="/profile">View Profile</Link>
                <Divider />
                <Link to="/editskills">Upload</Link>
                <Divider />
                <Link to="/editprofile">Edit Profile</Link>
                <Divider />
                <Link to="/chat">Messages</Link>
                <Divider />
                <Link to="/deleteaccount">Delete Account</Link>
                <Divider />
                <Link to="/auth/login">Sign Out</Link>
                <Divider />
              </Panel>
            </Collapse>
          </Col>
        </Space>
      </Drawer>
    </>
  );
}
