import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, Tabs, Typography, Card } from "antd";
import { useEffect, useState } from "react";

// Pages, Components, Media & StyleSheets
import ProjectItem from "./../../../../components/ProjectItem/ProjectItem";
import ProjectItemAlt from "./../../../../components/ProjectItemAlt/ProjectItemAlt";
import { profile } from "./../../../../utils/data";
import filter from "./filte.svg";
import css from "./ProfileTabs.module.scss";
import "./Tabs.scss";
import { getAllposts, getJobs, searchPosts } from "../../../../Api/index";
import { useNavigate } from "react-router-dom";
// Library Constants
const { Text, Title } = Typography;

export default function JobPost({ userId, allLikedPosts }) {
  const navigate = useNavigate();
  const userProfile = profile();
  const [jobs, setJobs] = useState([]);
  const [projects, setProjects] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [projectsLoaded, setProjectLoaded] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const call = async () => {
      // console.log("userId", userId);
      const postsRes = await getAllposts(`author:${userId}`);
      console.log("posts by author ", postsRes);
      setProjects(postsRes.data.results);

      const jobsRes = await getJobs(`filterBy=author:${userId}`);
      setJobs(jobsRes.data.results);

      const likedPostsRes = await getAllposts(
        `posterId:${allLikedPosts.join("||")}`
      );
      console.log("fetched liked posts", likedPostsRes);
      setLikedPosts(likedPostsRes.data.results);
    };

    call();
  }, [userId]);

  const enterLoading = () => {
    setProjectLoaded(true);
    setTimeout(() => {
      setProjectLoaded(false);
      setProjects(userProfile?.projects);
    }, 3000);
  };
  const searchHandler = async (value) => {
    const data = await searchPosts(query, "");

    setProjects(data.data.results);
  };

  const items = [
    {
      label: "posts",
      key: "item-1",
      children: (
        <>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 22 }}
            md={{ span: 12 }}
            lg={{ span: 9 }}
            xl={{ span: 8 }}
            style={{ borderRadius: "50px" }}
          >
            <Space size="middle" style={{ borderRadius: "100px" }}>
              <Input
                maxLength="100"
                allowClear
                className={css["search-btn"]}
                placeholder=" Search "
                suffix={
                  <SearchOutlined
                    onClick={searchHandler}
                    style={{ color: "#5c5b5b" }}
                  />
                }
                onPressEnter={searchHandler}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Space>
          </Col>
          <Space direction="vertical" size="middle">
            <br />
          </Space>
          <Space direction="vertical" size="middle">
            <br />
          </Space>
          <Col span={24}>
            <Row
              style={{ overflow: "hidden", width: "100%" }}
              gutter={[10, 20]}
            >
              {projects?.map((project, key) => {
                return (
                  <Col
                    key={key}
                    xl={{ span: 6 }}
                    lg={{ span: 8 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 24 }}
                  >
                    <ProjectItemAlt project={project} />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Space direction="vertical" size="middle">
            <br />
            <br />
          </Space>
          {/* <Col span={24}>
            <div className="load-posts-wrapper">
              <Button
                className="load-posts"
                type="primary"
                loading={projectsLoaded}
                onClick={() => enterLoading()}
              >
                Load More Posts...
              </Button>
            </div>
          </Col> */}
        </>
      ),
    },

    {
      label: "jobs",
      key: "item-2",
      children: (
        <>
          <Col span={24}>
            <Row
              style={{ overflow: "hidden", width: "100%" }}
              gutter={[10, 20]}
            >
              {jobs?.map((job, key) => {
                return (
                  <Col
                    key={key}
                    xl={{ span: 6 }}
                    lg={{ span: 6 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 24 }}
                  >
                    <Card
                      style={{
                        width: 300,
                      }}
                      //   onClick={() =>
                      //     navigate(`/sellers/detail/${jobs[key].id}`)
                      //   }
                    >
                      <Text>Posted by user @{job.author.username} </Text>
                      <Title level={3}>{job.title}</Title>
                      <div
                        dangerouslySetInnerHTML={{ __html: job?.description }}
                      >
                        {}
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Space direction="vertical" size="middle">
            <br />
            <br />
          </Space>
          {/* <Col span={24}>
            <div className="load-posts-wrapper">
              <Button
                className="load-posts"
                type="primary"
                loading={projectsLoaded}
                onClick={() => enterLoading()}
              >
                Load More Posts...
              </Button>
            </div>
          </Col> */}
        </>
      ),
    },
    {
      label: "likes",
      key: "item-3",
      children: (
        <>
          <Col span={24}>
            <Row
              style={{ overflow: "hidden", width: "100%" }}
              gutter={[10, 20]}
            >
              {likedPosts?.map((project, key) => {
                return (
                  <Col
                    key={key}
                    xl={{ span: 6 }}
                    lg={{ span: 8 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 24 }}
                  >
                    <ProjectItemAlt project={project} />
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Space direction="vertical" size="middle">
            <br />
            <br />
          </Space>
          {/* <Col span={24}>
			<div className="load-posts-wrapper">
			  <Button
				className="load-posts"
				type="primary"
				loading={projectsLoaded}
				onClick={() => enterLoading()}
			  >
				Load More Posts...
			  </Button>
			</div>
		  </Col> */}
        </>
      ),
    },
  ];

  return (
    <>
      <Tabs
        //  className={css["profile-tabs"]}
        className="profile-tabs"
        items={items}
      />
    </>
  );
}
