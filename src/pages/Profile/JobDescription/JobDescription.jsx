import { useEffect, useState, Fragment } from "react";
// Library Imports

import { Row, Col, Typography, Button, Space, Tag, Avatar } from "antd";
import { Link, useParams } from "react-router-dom";
import { BiLocationPlus } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { GrShare } from "react-icons/gr";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { LeftOutlined } from "@ant-design/icons";
import { tags } from "../../../utils/data";
import { getJobById } from "../../../Api/index";

// Pages, Components, Media & StyleSheets
import "./JobDescription.scss";

const { Title, Text } = Typography;

export default function JobDescription() {
  const { id } = useParams();
  const [jobData, setJobData] = useState();
  useEffect(() => {
    const call = async () => {
      const jobRes = await getJobById(id);

      setJobData(jobRes.data);
    };

    call();
  }, [id]);
  const tag = tags();

  return (
    <Fragment>
      {jobData ? (
        <Col className="JobDescription">
          {/* <Row
      gutter={[10, 10]}
      style={{ overflow: "hidden", width: "100%", alignItems: "flex-start" }}
    >
      <Col span={1}>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
      </Col>

      <Col span={23}>
        <Title level={4}>Outsourcing Management Manager</Title>
        <Text type="secondary">John Tester</Text>
      </Col>

      <Col span={24}>
        <Text strong>
          <BiLocationPlus /> &nbsp; Remote USA
        </Text>
      </Col>

      <Col span={24}>
        <Text strong>
          <GrShare /> &nbsp; www.testingforweb.com
        </Text>
      </Col>
    </Row>

    <Row
      justify="start"
      gutter={[10, 10]}
      style={{ overflow: "hidden", width: "100%" }}
    >
      <Col span={4}>
        <Button block>Like Job</Button>
      </Col>
      <Col span={4}>
        <Button block>Contact</Button>
      </Col>
    </Row> */}

          <Link to="/sellers">
            <Button style={{ border: "none" }} icon={<LeftOutlined />}>
              Job Listing
            </Button>
          </Link>

          <Row
            className="card"
            // gutter={[16, { xs: 8]}
            justify="space-between"
            style={{
              overflow: "hidden",
              width: "100%",
              alignItems: "flex-start",
            }}
          >
            <Row
              // gutter={[10, 10]}
              justify="center"
              align="top"
              style={{
                overflow: "hidden",
                width: "100%",
                alignItems: "flex-start",
              }}
            >
              <Col lg={{ span: 1 }}>
                <Avatar src="https://joeschmoe.io/api/v1/random" />
              </Col>

              <Col lg={{ span: 23 }}>
                <Title level={4}>{jobData?.title}</Title>
                <Text type="secondary">{jobData?.author.name}</Text>
              </Col>

              {/* <Col lg={{ span: 24 }}>
                <Text strong>
                  <BiLocationPlus /> &nbsp; Remote USA
                </Text>
              </Col>

              <Col lg={{ span: 24 }}>
                <Text strong>
                  <GrShare /> &nbsp; www.testingforweb.com
                </Text>
              </Col> */}
            </Row>

            <Row
              justify="start"
              gutter={[10, 10]}
              style={{
                overflow: "hidden",
                width: "100%",
              }}
            >
              <Col lg={{ span: 4 }} md={{ span: 8 }} sm={{ span: 10 }}>
                <Button
                  block
                  icon={<MdOutlineBookmarkAdd />}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    background: "#0CC6EA",
                    border: "none",
                    borderRadius: "0px",
                    color: "black",
                  }}
                >
                  &nbsp; Like Job
                </Button>
              </Col>
              <Col lg={{ span: 4 }} md={{ span: 8 }} sm={{ span: 10 }}>
                <Button
                  block
                  icon={<BsChat />}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    background: "#0CC6EA",
                    border: "none",
                    borderRadius: "0px",
                    color: "black",
                  }}
                >
                  &nbsp; Contact
                </Button>
              </Col>
            </Row>

            <Row
              justify="space-between"
              style={{
                overflow: "hidden",
                width: "100%",
                alignItems: "flex-start",
                padding: "10px",
              }}
              gutter={[0, 20]}
            >
              <Col lg={{ span: 17 }}>
                <Space size="middle" direction="vertical">
                  <Title level={3}>Job Description</Title>
                  <Text>
                    <div
                      dangerouslySetInnerHTML={{ __html: jobData?.description }}
                    >
                      {}
                    </div>
                  </Text>
                </Space>
              </Col>

              {/* <Col lg={{ span: 6 }} md={{ span: 24 }} className="info_tags">
                <Space
                  size="large"
                  direction="vertical"
                  style={{ width: "100%" }}
                >
                  <Col lg={{ span: 22 }} md={{ span: 11 }} className="card_sm">
                    <Title level={3}>tags</Title>
                    <Row
                      gutter={[20, 20]}
                      style={{ overflow: "hidden", width: "100%" }}
                    >
                      {tag.map((tag, index) => {
                        return <Tag key={index}>{tag}</Tag>;
                      })}
                    </Row>
                  </Col>

                  <Col lg={{ span: 22 }} md={{ span: 11 }} className="card_sm">
                    <Title level={3}>info</Title>
                    <Row
                      gutter={[20, 20]}
                      style={{ overflow: "hidden", width: "100%" }}
                    >
                      {tag.map((tag, index) => {
                        return <Tag key={index}>{tag}</Tag>;
                      })}
                    </Row>
                  </Col>
                </Space>
              </Col> */}
            </Row>
          </Row>
        </Col>
      ) : (
        ""
      )}
    </Fragment>
  );
}
