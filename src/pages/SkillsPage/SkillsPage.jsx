import { Link, useSearchParams } from "react-router-dom";
import arrowRight from "../../assets/svg/arrowRight.svg";
import {
  Row,
  Col,
  Typography,
  Carousel,
  Image,
  Tag,
  Space,
  Form,
  Input,
  Avatar,
  Divider,
  Button,
} from "antd";
import { BsChat } from "react-icons/bs";
import { FiUserPlus } from "react-icons/fi";
import { LeftOutlined } from "@ant-design/icons";
import { SlCalender } from "react-icons/sl";
import { EllipsisOutlined } from "@ant-design/icons";
import { articles, tags, comments } from "../../utils/data";
// import arrowLeft from "../../assets/svg/arrowLeft.svg";
import css from "./SkillsPage.module.scss";
import replyArrow from "../../assets/svg/replyArrow.svg";
import twitter from "../../assets/social_icons/twitter.svg";
import { HeartOutlined, EyeOutlined, SendOutlined } from "@ant-design/icons";
import { Co } from "react-flags-select";
import { ArrowRightOutlined } from "@ant-design/icons";
import { addPost } from "../../Api";
import { useEffect, useState, useMemo, Fragment } from "react";
import { getPostById, likePost, viewPost, commentPost } from "../../Api/index";
import "react-quill/dist/quill.snow.css";

import Moment from "react-moment";
const { Text, Title } = Typography;

function SkillsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [postData, setPostData] = useState(false);
  const [comment, setComment] = useState("");
  useMemo(() => {
    const call = async () => {
      try {
        const res = await getPostById(searchParams.get("post"));

        setPostData(res.data);
        if (res.statusText === "OK") {
          await viewPost(searchParams.get("post"));
        }
      } catch (e) {
        console.log(e);
      }
    };
    call();
  }, []);

  const blogs = articles();
  const tag = tags();
  const userComments = comments();

  // console.log(tag);
  // console.log(userComments);
  //   debugger;

  // const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
  //   <button
  //     {...props}
  //     className={
  //       "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
  //     }
  //     aria-hidden="true"
  //     aria-disabled={currentSlide === 0 ? true : false}
  //     type="button"
  //   >
  //     <img src={arrowLeft} alt="arrowLeft" />
  //   </button>
  // );
  const likeHandler = async () => {
    await likePost(postData.posterId);
  };

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <img src={arrowRight} alt="arrowRight" />
    </button>
  );

  //   let noOfSlides = products?.products?.length > 5 ? true : false;

  const settings = {
    speed: 500,
    swipe: true,
    dots: false,
    arrows: true,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplayspeed: 1500,
    // prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          // arrows: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          // arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          // arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          // arrows: false,
        },
      },
    ],
  };

  const commentSubmitHandler = () => {
    const commentRes = commentPost(postData.posterId, { description: comment });

    console.log(commentRes);
  };

  return (
    <Fragment>
      {postData ? (
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
              <Link to="/">
                <Button
                  style={{ border: "none", padding: 0 }}
                  icon={<LeftOutlined />}
                >
                  Back
                </Button>
              </Link>
              <Row style={{ textAlign: "center", alignItems: "center" }}>
                <Typography
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                >
                  X
                </Typography>
                <EllipsisOutlined
                  rotate={90}
                  style={{ cursor: "pointer", fontSize: "20px" }}
                ></EllipsisOutlined>
              </Row>
            </Row>

            <Col span={24}>
              <Title strong level={3} style={{ marginBottom: 0 }}>
                {postData?.title}
              </Title>
            </Col>

            <Col span={24}>
              <Row align="middle" style={{ overflow: "hidden", width: "100%" }}>
                <Col
                  xl={{ span: 21 }}
                  lg={{ span: 21 }}
                  md={{ span: 21 }}
                  sm={{ span: 20 }}
                  xs={{ span: 18 }}
                >
                  <Avatar
                    src={
                      <Image
                        src={userComments?.profile_pic}
                        style={{
                          width: 32,
                        }}
                      />
                    }
                  />
                  <Divider type="vertical"></Divider>
                  <Space direction="horizontal" size="middle">
                    <Text type="secondary">{postData?.author?.name}</Text>
                    <BsChat size="18px" />
                    <FiUserPlus size="18px" />
                  </Space>
                </Col>

                <Col
                  xl={{ span: 3 }}
                  lg={{ span: 3 }}
                  md={{ span: 3 }}
                  sm={{ span: 4 }}
                  xs={{ span: 6 }}
                  style={{ textAlign: "end" }}
                >
                  <Button
                    className={css["like_btn"]}
                    icon={<HeartOutlined />}
                    onClick={likeHandler}
                  >
                    {postData?.likesCount}
                  </Button>
                </Col>
              </Row>
            </Col>

            <Col span={24} style={{ position: "relative" }}>
              <Carousel {...settings} autoplay effect="fade">
                {postData?.media?.map((slide, index) => {
                  return (
                    <Image
                      key={index}
                      src={slide?.pathUrl}
                      preview={false}
                      width={"100%"}
                      height={"80vh"}
                      alt="Blog Cover"
                      style={{ border: "1px solid red" }}
                    />
                  );
                })}
              </Carousel>
            </Col>

            <Col span={24}>
              <Row
                align="middle"
                justify="center"
                style={{
                  width: "100%",
                  overflow: "hidden",
                  textAlign: "center",
                }}
                gutter={[0, 10]}
              >
                <Col span={2} md={{ span: 4 }} xs={{ span: 8 }}>
                  <Text>
                    <HeartOutlined /> &nbsp; Likes {postData?.likesCount}
                  </Text>
                </Col>
                <Col span={2} md={{ span: 4 }} xs={{ span: 8 }}>
                  <Text>
                    <EyeOutlined /> &nbsp; Views {postData?.viewsCount}
                  </Text>
                </Col>
                <Col span={3} md={{ span: 5 }} xs={{ span: 24 }}>
                  <Text>
                    <SlCalender /> &nbsp; Posted{" "}
                    <Moment format="DD/MM//YYYY">{postData?.postedAt}</Moment>
                  </Text>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Row
                justify="space-between"
                style={{ overflow: "hidden", width: "100%" }}
              >
                <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                  <Title level={3}>about</Title>
                  <div
                    dangerouslySetInnerHTML={{ __html: postData?.description }}
                  >
                    {/* {postData?.description} */}
                  </div>
                </Col>

                <Col xs={{ span: 24 }} lg={{ span: 6 }}>
                  <Title level={3}>tags</Title>
                  <Row
                    gutter={[20, 20]}
                    style={{ overflow: "hidden", width: "100%" }}
                  >
                    {postData?.tags.map((tag, index) => {
                      return (
                        <Tag
                          key={index}
                          // color="blue"
                          // closable
                          // onClose={(e) => {
                          //   e.preventDefault();
                          //   removeDiscountCode(tag);
                          // }}
                        >
                          {tag}
                        </Tag>
                      );
                    })}
                  </Row>
                  <Title level={3} style={{ marginTop: "15px" }}>
                    Coding Language
                  </Title>
                  <Row
                    gutter={[20, 20]}
                    style={{ overflow: "hidden", width: "100%" }}
                  >
                    {postData?.tools.map((tag, index) => {
                      return (
                        <Tag
                          key={index}
                          // color="blue"
                          // closable
                          // onClose={(e) => {
                          //   e.preventDefault();
                          //   removeDiscountCode(tag);
                          // }}
                        >
                          {tag}
                        </Tag>
                      );
                    })}
                  </Row>

                  <br />
                  <br />

                  <Col span={24} xs={{ span: 24 }}>
                    <Title level={3}>share</Title>

                    <Space size="middle">
                      <Col className="icon_box">
                        <Image
                          width="18px"
                          src={twitter}
                          alt="Social Icon"
                          preview={false}
                        />
                      </Col>
                      <Col className="icon_box">
                        <Image
                          width="18px"
                          src={twitter}
                          alt="Social Icon"
                          preview={false}
                        />
                      </Col>
                      <Col className="icon_box">
                        <Image
                          width="18px"
                          src={twitter}
                          alt="Social Icon"
                          preview={false}
                        />
                      </Col>
                    </Space>
                  </Col>
                </Col>
              </Row>
            </Col>

            <Col span={24}>
              <Col lg={{ span: 16 }} xs={{ span: 24 }}>
                <Form
                  size="large"
                  name="comment_form"
                  autoComplete="on"
                  layout="vertical"
                  scrollToFirstError
                  requiredMark="optional"
                  // onFinish={}
                  initialValues={{
                    remember: true,
                  }}
                >
                  <Col span={22}>
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Share your views",
                        },
                        { min: 1, message: "Too Short!" },
                        { max: 70, message: "Too Long!" },
                      ]}
                    >
                      <Input
                        placeholder="comment..."
                        onChange={(e) => setComment(e.target.value)}
                        onPressEnter={commentSubmitHandler}
                        suffix={<SendOutlined onClick={commentSubmitHandler} />}
                      />
                    </Form.Item>
                  </Col>
                </Form>
              </Col>

              <Col span={20}>
                <Col span={24}>
                  <Text type="secondary">
                    {postData?.totalComments} Comments.
                  </Text>
                </Col>
                <br />
                <br />
                <div>
                  {postData.comments.map((comment) => {
                    return (
                      <Row style={{ overflow: "hidden", width: "100%" }}>
                        <Col xs={{ span: 3 }} lg={{ span: 1 }}>
                          <Avatar
                            src={
                              <Image
                                src={userComments?.profile_pic}
                                style={{
                                  width: 32,
                                }}
                              />
                            }
                          />
                        </Col>

                        <Col lg={{ span: 20 }} xs={{ span: 21 }}>
                          <Col span={24}>
                            <Text strong>{comment.author?.name}</Text> &nbsp;
                            <Text type="secondary">
                              {comment.author?.userName} &nbsp;{" "}
                              <Moment format="DD/MM//YYYY">
                                {comment.postedAt}
                              </Moment>
                            </Text>
                          </Col>

                          <Col span={24}>
                            <Text>{comment?.description}</Text>
                          </Col>

                          <Col span={23} style={{ textAlign: "end" }}>
                            <Space>
                              <Image src={replyArrow} alt="Reply" />
                              <Text
                                className="reply"
                                style={{ color: "#09A7D9" }}
                              >
                                Reply
                              </Text>
                            </Space>
                          </Col>

                          <Col span={22}>
                            <Divider />
                          </Col>
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              </Col>
            </Col>
          </Row>
        </Col>
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default SkillsPage;
