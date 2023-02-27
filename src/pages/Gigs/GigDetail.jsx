// import { profile } from "../../utils/data";
import { ArrowRightOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Checkbox,
  Col,
  Collapse,
  Input,
  Radio,
  Row,
  Space,
  Typography,
  Button,
  Avatar,
  Image,
  Divider,
  Card,
} from "antd";
import { useEffect, useState, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { getJobById } from "../../Api/index";
import JobCard from "./Components/JobCard";
import css from "./DiscoverGigs.module.scss";
import { LeftOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";

import { BsChat } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";

const { Search } = Input;
const { Panel } = Collapse;
const { Text, Title } = Typography;

const locationOptions = ["Work Remotely", "Relocation"];
const jobOptions = ["Permanent", "Contract", "Freelance", "Other"];

export default function GigDetail() {
  const { id } = useParams();

  const [jobData, setJobData] = useState();

  useEffect(() => {
    const call = async () => {
      const jobRes = await getJobById(id);

      setJobData(jobRes.data);
    };

    call();
  }, [id]);

  return (
    <Fragment>
      {jobData ? (
        <Col
          span={24}
          className="blogsPage"
          style={{
            paddingTop: "80px",
            paddingBottom: "120px",
            paddingRight: "80px",
            paddingLeft: "80px",
          }}
        >
          <Row
            gutter={[0, 30]}
            style={{
              width: "100%",
            }}
          >
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Link to="/sellers">
                <Button
                  style={{ border: "none", padding: 0 }}
                  icon={<LeftOutlined />}
                >
                  Job Listings
                </Button>
              </Link>
            </Row>
            <Card style={{ width: "100%", height: "100vh" }}>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Space wrap size={35}>
                  <Avatar size={64} icon={<UserOutlined />} />
                  <Col span={24}>
                    <Title level={3}>{jobData?.author.name}</Title>
                    <Title level={5}>{jobData?.author.username}</Title>
                  </Col>
                </Space>
              </Row>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Title level={3}>Job Description</Title>
                <Col span={24}>
                  <div
                    dangerouslySetInnerHTML={{ __html: jobData?.description }}
                  >
                    {}
                  </div>
                </Col>
              </Row>
            </Card>
          </Row>
        </Col>
      ) : (
        <h1>hi</h1>
      )}
    </Fragment>
  );
}
