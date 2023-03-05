import {
  Avatar,
  Button,
  Card,
  Col,
  FloatButton,
  Grid,
  Image,
  Row,
  Space,
  Typography,
  Dropdown,
  Divider,
  List,
  Popover,
  Upload,
  Modal,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { profile } from "../../utils/data";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { BiLocationPlus } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import VirtualList from "rc-virtual-list";
import { useState, useEffect } from "react";
import avatar from "./Assets/avatar.jpg";
// import Banner from "./../../components/Banner/Banner";
import ProfileTabs from "./Components/ProfileTabs/ProfileTabs";
import "./Profile.scss";
import { MenuProps, message } from "antd";
import { Co } from "react-flags-select";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../redux/Slices/toastSlice";
import { toast } from "react-hot-toast";
import {
  getUser,
  getUserByUsername,
  uploadUserAvatar,
  followUser,
} from "../../Api/index";
import Moment from "react-moment";
import AvatarUpload from "../../components/UserAvatar/UserAvatar";
import defaultAvatar from "../../assets/Profile Images/deafult_avatar.png";
const { Meta } = Card;
const { Text, Title } = Typography;

const { useBreakpoint } = Grid;
const { Dragger } = Upload;

export default function Profile() {
  const { username } = useParams();
  const currentUser = useSelector((store) => store.user);
  useEffect(() => {}, []);

  const dispatch = useDispatch();
  const userProfile = profile();
  const screens = useBreakpoint();

  const ContainerHeight = 400;
  const [avatarModel, setAvatarModel] = useState(false);
  const [images, setImages] = useState([]);
  const userAvatarConfig = {
    name: "file",

    onChange(info) {
      console.log(info.fileList);
      setImages(info.fileList);
    },
    onDrop(e) {},
  };

  const [userData, setUserData] = useState([]);
  const appendData = async () => {
    const userRes = await getUserByUsername(username);

    setUserData(userRes.data);
  };
  useEffect(() => {
    appendData();
  }, [username]);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };

  const [userAvatar, setUserAvatar] = useState();

  // const value1 = useSelector((store) => store.toast);
  // console.log(value1);
  // if (value1.isOpen) {
  // 	console.log("Hasnat");
  // 	alert("my name is hasnat");
  // }
  const getImageHandler = (file) => {
    setUserAvatar(file);
  };

  const postUserAvatar = async () => {
    let formData = new FormData();

    formData.append("media", userAvatar);

    const res = await uploadUserAvatar(formData);

    setUserData((prev) => {
      return { ...prev, avatar: res.data.avatar };
    });

    setAvatarModel(false);
  };

  const followHandler = async () => {
    const res = await followUser(userData.id);
    console.log(res);
  };

  const content = (
    <List style={{ width: "500px" }}>
      {userData?.followers?.map((item) => {
        return (
          <List.Item key={item.username}>
            <List.Item.Meta
              avatar={<Avatar src={item?.avatar?.pathUrl} />}
              title={<Link to={`/profile/${item?.username}`}>{item.name}</Link>}
              description={item.email}
            />
            {/* <div>Content</div> */}
          </List.Item>
        );
      })}
    </List>
  );
  const content2 = (
    <List style={{ width: "500px" }}>
      {userData?.following?.map((item) => {
        return (
          <List.Item key={item.username}>
            <List.Item.Meta
              avatar={<Avatar src={item?.avatar?.pathUrl} />}
              title={<Link to={`/profile/${item?.username}`}>{item.name}</Link>}
              description={item.email}
            />
            {/* <div>Content</div> */}
          </List.Item>
        );
      })}
    </List>
  );

  return (
    <section span={24} className="Profile">
      <Row
        style={{
          width: "100%",
          overflow: "hidden",
        }}
        gutter={[0, 0]}
      >
        {/* <Col span={24} style={{ maxHeight: "480px" }} className="userImage"> */}
        <Col span={24} className="userImage">
          <Col span={24}>
            <Image
              src={userProfile?.coverPhoto}
              preview={false}
              className="cover-photo"
              width={"-webkit-fill-available"}
            />
            {/* <Banner Image={userProfile?.coverPhoto} /> */}
            <FloatButton
              style={{ position: "absolute", right: "60px" }}
              icon={<EditOutlined />}
              type="default"
            />
          </Col>
          <Col
            // xs={{ span: 16 }}
            // sm={{ span: 14 }}
            // md={{ span: 11 }}
            // lg={{ span: 9 }}
            // xl={{ span: 8 }}
            span={24}
            className="user-picture-container"
          >
            <Avatar
              className="user-picture"
              size="large"
              shape="square"
              icon={<UserOutlined />}
              src={userData.avatar ? userData.avatar.pathUrl : defaultAvatar}
              style={{ boxShadow: "10px 20px 20px black !important" }}
            />
            {userData.id === currentUser.id && (
              <FloatButton
                style={{
                  position: "initial",
                  top: "20px",
                  marginTop: "90px",
                  marginLeft: "-25px",
                }}
                icon={<EditOutlined />}
                type="default"
                onClick={() => setAvatarModel(true)}
              />
            )}

            <Modal
              title="Basic Modal"
              open={avatarModel}
              onOk={postUserAvatar}
              onCancel={() => setAvatarModel(false)}
            >
              <AvatarUpload getImage={getImageHandler} />
            </Modal>
          </Col>

          <Col span={24} className="editIcons">
            <Space
              direction="vertical"
              style={{
                alignItems: "end",
                height: "22rem",
                justifyContent: "space-between",
              }}
            >
              <Link to="/editprofile">
                <Button
                  icon={<FiEdit />}
                  style={{
                    borderRadius: "0px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  Edit Profile
                </Button>
              </Link>
            </Space>
          </Col>
        </Col>

        <div className="user-wrapper">
          <Row
            gutter={[0, 20]}
            style={{
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Space
                size="middle"
                direction="vertical"
                style={{ width: "100%" }}
              >
                <Text>
                  <span className="name" style={{ color: "white" }}>
                    {userData?.name}
                  </span>
                  {/* <span className="location">
                    &nbsp; <BiLocationPlus /> &nbsp;
                    {value?.location}
                  </span> */}
                </Text>

                <Text className="username">@{userData?.username}</Text>

                <Space
                  direction="horizontal"
                  style={{ textAlign: "center" }}
                  size="large"
                >
                  <Col
                    style={{
                      cursor: "pointer",
                      paddingRight: "10px",
                      borderRight: "2px solid #959595",
                    }}
                  >
                    <Title
                      level={4}
                      strong
                      style={{ margin: 0, color: "white" }}
                    >
                      {userData?.postsCount}
                    </Title>
                    <Text type="secondary" style={{ color: "#959595" }}>
                      Posts
                    </Text>
                  </Col>
                  <Popover
                    placement="bottomRight"
                    content={content}
                    title="Followers"
                  >
                    <Col
                      style={{
                        cursor: "pointer",
                        paddingRight: "10px",
                        borderRight: "2px solid #959595",
                      }}
                    >
                      <Title
                        level={4}
                        strong
                        style={{ margin: 0, color: "white" }}
                      >
                        {userData?.followerCount}
                      </Title>
                      <Text type="secondary" style={{ color: "#959595" }}>
                        Followers
                      </Text>
                    </Col>
                  </Popover>
                  <Popover
                    placement="bottomRight"
                    content={content2}
                    style={{ width: "1000px !important" }}
                    title="Following"
                  >
                    <Col
                      style={{
                        cursor: "pointer",
                        paddingRight: "10px",
                        borderRight: "2px solid #959595",
                      }}
                    >
                      <Title
                        level={4}
                        strong
                        style={{ margin: 0, color: "white" }}
                      >
                        {userData?.followingCount}
                      </Title>
                      <Text type="secondary" style={{ color: "#959595" }}>
                        Following
                      </Text>
                    </Col>
                  </Popover>
                </Space>
              </Space>
            </Col>

            <Col
              xl={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
              sm={{ span: 24 }}
              xs={{ span: 24 }}
              style={{
                textAlign: "right",
              }}
            >
              <Space
                // direction={screens.xs ? "vertical" : "horizontal"}
                // direction={screens.xs ? "vertical" : "horizontal"}
                size="large"
              >
                <button
                  className="follow-btn"
                  onClick={followHandler}
                  style={{ cursor: "pointer" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    <path
                      fill-rule="evenodd"
                      d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                  &nbsp; Follow
                </button>
                <button className="message-btn">
                  <BsChat /> &nbsp; Message
                </button>
              </Space>
            </Col>
          </Row>

          <Col
            xl={{ span: 20 }}
            lg={{ span: 20 }}
            md={{ span: 24 }}
            style={{ padding: "20px 0px" }}
          >
            {userProfile?.about && (
              <>
                {" "}
                <Title level={2} style={{ color: "white" }}>
                  about
                </Title>
                <Text style={{ color: "white" }}>{userProfile?.about}</Text>
              </>
            )}
          </Col>

          <Col span={24} style={{ padding: "0" }}>
            <Title
              level={2}
              style={{ padding: "10px 0px", margin: 0, color: "white" }}
            >
              joined
            </Title>
            <Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {" "}
              <Moment format="MMMM d, YYYY" style={{ color: "#5C5B5B" }}>
                {userData?.joinedAt}
              </Moment>
            </Text>
          </Col>

          {userData?.socialLinks && (
            <Col span={24} style={{ padding: "20px 0px" }}>
              <Title level={2} style={{ padding: "20px 0px", color: "white" }}>
                socials
              </Title>
              <Space direction="horizontal" size="large">
                {userData?.soialLinks?.map((social, index) => {
                  return (
                    <a href={social.link} target="_blank" key={index}>
                      <Image preview={false} src={social.logo} width="2.5rem" />
                    </a>
                  );
                })}
              </Space>
            </Col>
          )}

          <Col style={{ padding: "1.5rem 0" }}>
            {/* // PROFILE TABs  */}
            <ProfileTabs
              userId={userData.id}
              allLikedPosts={userData.likedPosts}
            />
          </Col>
        </div>
      </Row>
    </section>
  );
}
