// import { ArrowRightOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Popover,
  FloatButton,
} from "antd";

import { Link } from "react-router-dom";
import "./UserPosts.scss";
import { BiLocationPlus } from "react-icons/bi";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import JobCard from "./Components/JobCard";
import user from "../../assets/Profile Images/profile_pic.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobs } from "../../Api";

const { Text, Title } = Typography;

export default function UserPosts() {
  const user = useSelector((store) => store.user);

  const data = useSelector((store) => store.subscription);
  const [results, setResults] = useState([]);
  useEffect(() => {
    const call = async () => {
      try {
        const response = await getJobs(`filterBy=author:${user.id}`);
        setResults(response.data.results);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    call();
  }, []);
  console.log(results);
  const isMobile = useMediaQuery({
    query: "(max-width: 450px)",
  });
  return (
    <section className="UserPosts">
      <Row
        style={{
          width: "100%",
          overflow: "hidden",
          justifyContent: "center",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
        gutter={[0, 0]}
      >
        <Col span={24}>
          <Row
            style={{
              width: "100%",

              textAlign: "center",
              justifyContent: "center",
              marginBottom: 10,
              marginLeft: 30,
            }}
          >
            <Col span={12} style={{ textAlign: "center" }}>
              <Title level={1} style={{ fontWeight: "700", margin: 1 }}>
                Your Postings
              </Title>
              <Title level={4} style={{ margin: 0 }} strong>
                View and edit your job postings{" "}
              </Title>
              <br />
              <br />
            </Col>

            <Col
              span={1}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="questionColumn"
            >
              <Popover
                placement="bottom"
                title={
                  <Title level={5} style={{ textAlign: "center" }}>
                    Post Credits: {data?.credits}
                  </Title>
                }
                content={
                  <div style={{ textAlign: "center" }}>
                    <Divider style={{ margin: "5px 0" }} />
                    <Text>Start Date: 01/01/22</Text>
                  </div>
                }
                trigger="click"
              >
                <FloatButton
                  icon={<QuestionCircleOutlined />}
                  style={{
                    width: "100px !important",
                    right: 24,

                    position: "initial",
                  }}
                />
              </Popover>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row
        style={{
          width: "100%",
          overflow: "hidden",
          justifyContent: "center",
          marginTop: "1.5rem",
          marginBottom: "1.5rem",
        }}
        gutter={[5, 0]}
      >
        <Row gutter={[16, 24]}>
          {results.map((ele) => (
            <>
              {/* <Link to="/posts/detail/1"> */}
                <JobCard data={ele} />
              {/* </Link> */}
              <br />
            </>
          ))}

          {/* <Link to="/posts/detail/1">
						<JobCard />
					</Link>
					<br />
					<Link to="/posts/detail/1">
						<JobCard />
					</Link>
					<br />
					<Link to="/posts/detail/1">
						<JobCard />
					</Link> */}
        </Row>
      </Row>
    </section>
  );
}
