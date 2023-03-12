// Library Imports

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Space,
  message,
} from "antd";

// Pages, Components, Media & StyleSheets

import "../Profile.scss";
import Banner from "../../../components/Banner/Banner";
import BannerImage from "../../../assets/Banners/banner3.png";
import { useFormik } from "formik";
import { getUser, updateUser, userSignup } from "../../../Api";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../redux/Slices/userSlice";

// Library Constants
const { Title } = Typography;

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log(user);

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,
      about: ` ${user.about ? user.about : ""}`,
      location: user?.location,
      socials: {
        twitter: user?.socials?.twitter,
        gitlab: "",
        github: "",
        linkedin: "",
        behance: "",
        codepen: "",
      },
    },

    onSubmit: async (values) => {
      try {
        console.log("values", values);
        const data = await updateUser(user.id, values);
        console.log(data);
        if (data.status === 200) {
          console.log("clicked");
          message.success("Profile Updated Succfully");
          dispatch(getUserData(data.data));
          navigate(`/profile/${data.data.username}`);
        }
      } catch (e) {
        console.log(e);
        message.error(e?.response?.data?.message);
      }
    },
  });

  const saveProfile = () => {
    navigate("/profile");
  };

  return (
    <Col className="CreateProfile" span={24}>
      <Row justify="center" style={{ overflow: "hidden", width: "100%" }}>
        <Col span={24} className="banner">
          <Banner Image={BannerImage} />
        </Col>

        <Col
          xs={{ span: 20 }}
          sm={{ span: 18 }}
          md={{ span: 16 }}
          lg={{ span: 14 }}
          xl={{ span: 12 }}
          className="profileForm"
        >
          <Title level={4}>Edit Profile </Title>
          <Form
            size="large"
            name="signup_form"
            autoComplete="on"
            layout="vertical"
            scrollToFirstError
            requiredMark="optional"
            onFinish={saveProfile}
            initialValues={values}
          >
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid name!",
                  },
                  { min: 3, message: "Too Short!" },
                  { max: 15, message: "Too Long!" },
                  {
                    pattern: /^[aA-zZ\s]+$/,
                    message: "Only alphabets are allowed for this field ",
                  },
                ]}
              >
                <Input
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid name!",
                  },
                  { min: 3, message: "Too Short!" },
                  { max: 15, message: "Too Long!" },
                  {
                    pattern: /^[aA-zZ\s]+$/,
                    message: "Only alphabets are allowed for this field ",
                  },
                ]}
              >
                <Input
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="About Section"
                name="about"
                rules={[
                  {
                    required: true,
                    message: "Enter something about yourself!",
                  },
                  { min: 2, message: "Too Short!" },
                  { max: 100, message: "Too Long!" },
                ]}
              >
                <Input.TextArea
                  name="about"
                  onChange={handleChange}
                  value={values.about}
                />
              </Form.Item>
            </Col>

            <Title level={5}>Social Profile</Title>

            <Col span={24}>
              <Form.Item
                label="Twitter"
                name="twitter"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input
                  name="socials.twitter"
                  onChange={handleChange}
                  value={values.socials.twitter}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="GitLab"
                name="gitLab"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input
                  name="socials.gitlab"
                  onChange={handleChange}
                  value={values.socials.gitlab}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="GitHub"
                name="gitHib"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input
                  name="socials.github"
                  onChange={handleChange}
                  value={values.socials.github}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="LinkedIn"
                name="LinkedIn"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input
                  name="socials.linkedin"
                  onChange={handleChange}
                  value={values.socials.linkedin}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Behance"
                name="behance"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input
                  name="socials.behance"
                  onChange={handleChange}
                  value={values.socials.behance}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="CodePen"
                name="codePen"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input
                  name="socials.codepen"
                  onChange={handleChange}
                  value={values.socials.codepen}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Discord"
                name="discord"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Custom"
                name="custom"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                className="custom-location"
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Please enter a valid link!",
                  },
                ]}
              >
                <Input
                  name="location"
                  onChange={handleChange}
                  value={values.location}
                />
              </Form.Item>
            </Col>

            <Col span={24} style={{ textAlign: "center" }}>
              <Space direction="horizontal">
                <Form.Item>
                  <Link to="/profile">
                    <Button type="ghost" className="cancel">
                      Cancel
                    </Button>
                  </Link>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    className="save"
                    htmlType="submit"
                    onClick={handleSubmit}
                    // block
                  >
                    Save
                  </Button>
                </Form.Item>
              </Space>
            </Col>
          </Form>
        </Col>
      </Row>
    </Col>
  );
}
