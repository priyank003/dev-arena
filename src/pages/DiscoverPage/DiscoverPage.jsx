import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Col,
  Collapse,
  Radio,
  Row,
  Select,
  Typography,
  Button,
  Space,
  Tooltip,
  Input,
  message,
} from "antd";
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getAllposts,
  getAllUsers,
  getPostsByquery,
  searchPosts,
  searchUsers,
} from "../../Api";
import { BASE_URL_IMG } from "../../Api/BASE_URL";
import { profile } from "../../utils/data";

import ProjectItem from "./../../components/ProjectItem/ProjectItem";
import ProjectItemAlt from "./../../components/ProjectItemAlt/ProjectItemAlt";
import "./DiscoverPage.scss";
import UserItem from "../../components/UserItem/UserItem";

const { Panel } = Collapse;
const { Text, Title } = Typography;

export default function DiscoverPage() {
  const userProfile = profile();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [postsCount, setPostsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [showData, setShowData] = useState("posts");
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const call = async () => {
      try {
        let postData;
        let usersData;
        // console.log(searchParams.get("q"));
        if (searchParams.get("q") === "" || searchParams.get("q") === null) {
          postData = await getAllposts(query);
          usersData = await getAllUsers();
        } else {
          query.length > 0
            ? (postData = await searchPosts(
                searchParams.get("q"),
                `filterBy=${query}`
              ))
            : (postData = await searchPosts(searchParams.get("q"), ""));
          usersData = await searchUsers(searchParams.get("q"));
        }

        setUsersCount(usersData.data.results.length);

        setPostsCount(postData.data.results.length);

        let projects = [];
        postData?.data?.results.map((ele, index) => {
          projects.push({
            projectName: ele.title,
            author: `By ${ele.author.username}`,
            cover: `${ele.media[0]?.pathUrl}`,
            logo: "",
            likes: ele.likesCount,
            views: ele.viewsCount,
            postId: ele.posterId,
            totalComments: ele.totalComments,
            comments: ele.comments,
          });
        });
        setProjects(projects);
        let usersArr = [];
        usersData?.data?.results.map((ele, index) => {
          usersArr.push(ele);
        });
        setUsers(usersArr);
      } catch (e) {
        console.log(e);
        message.error(e?.response?.data?.message);
      }
    };
    call();
  }, [searchParams.get("q"), query]);

  console.log("projects", projects);

  const codingLanguages = [
    { value: "Javascript", label: "Javascript" },
    { value: "GO", label: "GO" },
    { value: "Java", label: "Java" },
    { value: "Kotlin", label: "Kotlin" },
    { value: "PHP", label: "PHP" },
    { value: "C#", label: "C#" },
    { value: "Swift", label: "Swift" },
    { value: "R", label: "R" },
    { value: "Ruby", label: "Ruby" },
    { value: "Typescript", label: "Typescript" },
    { value: "Html", label: "Html" },
    { value: "CSS", label: "CSS" },
    { value: "Rust", label: "Rust" },
    { value: "React", label: "React" },
    { value: "Node js", label: "Node js" },
  ];
  // const tagLibrary = [];
  // for (let i = 10; i < 36; i++) {
  //   tagLibrary.push({
  //     value: i.toString(36) + i,
  //     label: i.toString(36) + i,
  //   });
  // }

  const [projectsLoaded, setProjectLoaded] = useState(false);
  const toggleFilters = () => {
    setFiltersShown((current) => !current);
  };
  const [filtersShown, setFiltersShown] = useState(false);
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

  const mediaMatch = window.matchMedia("(max-width: 400px)");
  const enterLoading = () => {
    // setProjectLoaded(true);
    // setTimeout(() => {
    // 	setProjectLoaded(false);
    // 	setProjects(userProfile?.projects);
    // }, 3000);
  };

  return (
    <section
      className="DiscoverPage"
      style={{
        paddingTop: "5rem",
        paddingBottom: "5rem",
        paddingLeft: "1rem",
        paddingRight: "0rem",
      }}
    >
      <Row gutter={[0, 70]} style={{ overflow: "hidden", width: "100%" }}>
        {/* <Col
          style={{ padding: "0rem 5rem" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 24 }}
          lg={{ span: 24 }}
          xl={{ span: 24 }}
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
        </Col> */}

        <Col span={24}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Col span={24} xs={24}>
              <Title level={4} xs={24}>
                {/* {searchParams.get("q")!==null &&  } */}
                {searchParams.get("q") !== null && searchParams.get("q") !== ""
                  ? showData === "posts"
                    ? `found ${postsCount} posts for "${searchParams.get("q")}`
                    : `found ${usersCount} users for "${searchParams.get("q")}`
                  : ""}
              </Title>

              <Row
                align="middle"
                justify="center"
                style={{ width: "100%", justifyContent: "space-between" }}
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
                <Radio.Group
                  value={showData}
                  onChange={(e) => setShowData(e.target.value)}
                >
                  <Radio.Button value="users">Users</Radio.Button>
                  <Radio.Button value="posts">Posts</Radio.Button>
                </Radio.Group>

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
                  maxWidth: "100%",
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

            {showData === "posts" ? (
              <Row
                style={{
                  width: "100%",
                  margin: "auto",
                  ...(mediaMatch.matches && { width: "85%" }),
                }}
                gutter={[30, 30]}
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
            ) : (
              <Row
                style={{
                  width: "100%",
                  margin: "auto",
                  ...(mediaMatch.matches && { width: "85%" }),
                }}
                gutter={[30, 30]}
              >
                {users.map((user, key) => {
                  return (
                    <Col
                      key={key}
                      xl={{ span: 6 }}
                      lg={{ span: 6 }}
                      md={{ span: 12 }}
                      sm={{ span: 12 }}
                      xs={{ span: 24 }}
                    >
                      <Link to={`/profile/${user.username}`}>
                        <UserItem user={user} />
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            )}
          </Space>
        </Col>
        <Col span={24}>
          <div className="load-posts-wrapper">
            {/* <Button
              className="load-posts"
              type="primary"
              loading={projectsLoaded}
              onClick={() => enterLoading()}
            >
              Load More Posts...
            </Button> */}
          </div>
        </Col>
      </Row>
    </section>
  );
}
