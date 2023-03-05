import {
  Button,
  Card,
  Col,
  Radio,
  Row,
  Select,
  Space,
  Typography,
  Input,
  Tooltip,
  message,
} from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { profile } from "../../utils/data";

import ProjectItem from "./../../components/ProjectItem/ProjectItem";
import "./DevelopersPage.scss";
import { getAllposts } from "../../Api";
import { BASE_URL, BASE_URL_IMG, BASE_URL_IMG_Local } from "../../Api/BASE_URL";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
const { Text, Title } = Typography;

export default function DevelopersPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const call = async () => {
      try {
        let data;
        query.length > 0
          ? (data = await getAllposts(`filterBy=${query}`))
          : (data = await getAllposts(""));

        console.log("post", data.data.results);
        let projects = [];
        data?.data?.results.map((ele, index) => {
          projects.push({
            projectName: ele.title,
            author: ele.author,
            cover: `${ele.media[0]?.pathUrl}`,
            logo: "",
            likes: ele.likesCount,
            views: ele.viewsCount,
            postId: ele.posterId,
            totalComments: ele.totalComments,
            comments: ele.comments,
          });
          console.log(projects[index].cover);
        });
        setProjects(projects);
      } catch (e) {
        console.log(e);
        message.error(e?.response?.data?.message);
      }
    };
    call();
  }, [query]);

  const userProfile = profile();

  const [projectsLoaded, setProjectLoaded] = useState(false);
  const [filtersShown, setFiltersShown] = useState(false);

  const enterLoading = () => {
    setProjectLoaded(true);
    // setTimeout(() => {
    // 	setProjectLoaded(false);
    // 	setProjects(userProfile?.projects);
    // }, 3000);
  };
  const mediaMatch = window.matchMedia("(max-width: 400px)");
  console.log(mediaMatch);
  const codingLanguages = [
    { value: "Web", label: "Web" },
    { value: "Mobile", label: "Mobile" },
    { value: "Python", label: "Python" },
    { value: "Node", label: "Node" },
    { value: "React", label: "React" },
  ];
  const tagLibrary = [];
  for (let i = 10; i < 36; i++) {
    tagLibrary.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const toggleFilters = () => {
    setFiltersShown((current) => !current);
  };

  const [tagsFilter, setTagsFilter] = useState([]);
  const [toolsFilter, setToolsFilter] = useState([]);

  useEffect(() => {
    let filter_url = "";
    if (tagsFilter.length > 0) {
      filter_url.length === 0
        ? (filter_url += "tags:")
        : (filter_url += ",tags:");
      tagsFilter.map((tag) => (filter_url = filter_url + tag + "%26%26"));
      filter_url = filter_url.slice(0, -6);
    }

    if (toolsFilter.length > 0) {
      filter_url.length === 0
        ? (filter_url += "tools:")
        : (filter_url += ",tools:");

      toolsFilter.map((tool) => (filter_url = filter_url + tool + "%26%26"));
      filter_url = filter_url.slice(0, -6);
    }

    setQuery(filter_url);
  }, [tagsFilter, toolsFilter]);

  return (
    <section
      className="DevelopersPage"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        paddingRight: "0rem",
        paddingLeft: "2rem",
        width: "100% !important",
      }}
    >
      <Row gutter={[0, 70]} style={{ overflow: "hidden", width: "100%" }}>
        <Col
          span={24}
          style={{
            textAlign: "center",
          }}
        >
          <Col span={24}>
            <Title>
              Explore the world’s best <span className="title">Developers</span>
            </Title>
          </Col>

          <Col span={24}>
            <Title strong level={5}>
              Show off your Coding skills, get inspiration, and get hired
            </Title>
          </Col>
        </Col>

        {/* <Col span={24}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            style={{ padding: "0rem 5rem" }}
          >
            <Radio.Group
              defaultValue="a"
              className="radio"
              style={{
                gap: "20px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-evenly",
              }}
            >
              <Radio.Button className="radio__item" value="a">
                Web Apps
              </Radio.Button>
              <Radio.Button className="radio__item" value="b">
                Static
              </Radio.Button>
              <Radio.Button className="radio__item" value="c">
                Dapps
              </Radio.Button>
              <Radio.Button className="radio__item" value="d">
                Mobile
              </Radio.Button>
              <Radio.Button className="radio__item" value="e">
                Desktop
              </Radio.Button>
            </Radio.Group>
          </Col>
        </Col> */}

        <Col span={24} xs={24}>
          <Space
            direction="vertical"
            size="middle"
            xs={24}
            style={{ width: "100%" }}
          >
            <Col span={24} xs={24}>
              <Title level={4} xs={24}>
                Explore projects made by community members!
              </Title>
              <Row
                align="middle"
                style={{ width: "95%", justifyContent: "space-between" }}
              >
                <Select
                  defaultValue="Trending"
                  style={{
                    width: 120,
                  }}
                  // onChange={handleChange}
                  options={[
                    {
                      value: "New",
                      label: "New",
                    },
                    {
                      value: "Trending",
                      label: "Trending",
                    },
                    {
                      value: "Followings",
                      label: "Followings",
                    },
                  ]}
                />

                <Button onClick={toggleFilters}>Filters</Button>
              </Row>
              <br />
              <Row
                justify="end"
                align="middle"
                style={{
                  justifyContent: "end",
                  overflow: "hidden",
                  minWidth: 350,
                  maxWidth: "95%",
                }}
              >
                <Space
                  className=""
                  direction="horizontal"
                  size="middle"
                  style={{
                    display: filtersShown ? "flex" : "none",
                    // width: 250,
                    minWidth: 350,
                    maxWidth: "100%",
                  }}
                >
                  <Col>
                    <Typography.Title level={5}>Tag</Typography.Title>
                    <Select
                      mode="tags"
                      size="large"
                      onChange={(e) => setTagsFilter(e)}
                      style={{
                        minWidth: 220,
                      }}
                      options={tagLibrary}
                    />
                  </Col>
                  <Col>
                    <Typography.Title level={5}>Coded with</Typography.Title>
                    <Select
                      size="large"
                      mode="tags"
                      onChange={(e) => setToolsFilter(e)}
                      style={{
                        minWidth: 220,
                      }}
                      options={codingLanguages}
                    />
                  </Col>
                </Space>
              </Row>
            </Col>

            <Row
              style={{
                width: "100%",
                margin: "auto",
                ...(mediaMatch.matches && { width: "85%" }),
              }}
              gutter={[30, 40]}
            >
              {projects.map((project, key) => {
                return (
                  <Col
                    key={key}
                    xl={{ span: 6 }}
                    lg={{ span: 6 }}
                    md={{ span: 12 }}
                    sm={{ span: 12 }}
                    xs={{ span: 24 }}
                  >
                    <ProjectItem project={project} />
                  </Col>
                );
              })}
            </Row>
          </Space>
        </Col>
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
      </Row>
    </section>
  );
}
