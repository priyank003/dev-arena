// Library Imports
import { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Space,
  Select,
  Upload,
  message,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";

// Pages, Components, Media & StyleSheets

import "./JobPost.scss";
import Banner from "../../../components/Banner/Banner";
import BannerImage from "../../../assets/Banners/banner3.png";
import { useFormik } from "formik";
import { addJob, updateJob } from "../../../Api";

// Library Constants
const { Text, Title } = Typography;

export default function JobPost() {
  const { id } = useParams();

  const [value, setValue] = useState(" ");
  const navigate = useNavigate();
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"]],
  };
  const [tags, setTags] = useState([]);
  const [logo, setLogo] = useState();
  const [workplaceType, setWorkPlaceType] = useState("");
  const formats = ["header", "bold", "italic", "underline"];

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const uploadLogo = (data) => {
    console.log(data.file);
    setLogo(data.file);
    // setTradeLicense(data?.fileList);
    // console.log("tradeLicense State", tradeLicense);
  };
  const handleChangeTags = (value) => {
    setTags(value);
  };
  const handleSelectChange = (value) => {
    // console.log(value);
    setWorkPlaceType(value);
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: "",
      // experience: "",
      // employmentType: "",
      // link: "",
      // companyName: "",
      // companyLogo: "",
      // companyWebsite: "",
      // workplaceType: "",
      description: "",
      // tags: [],
    },
    onSubmit: async (values) => {
      try {
        // console.log(toolValues);
        values.description = value;
        // values.tags = tags;
        // values.companyLogo = logo;
        // values.workplaceType = workplaceType;
        console.log(values);
        let formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        // formData.append("companyLogo", logo);
        // formData.append("experience", values.experience);
        // formData.append("employmentType", values.employmentType);
        // formData.append("link", values.link);
        // formData.append("companyName", values.companyName);
        // formData.append("companyWebsite", values.companyWebsite);
        // formData.append("workplaceType", workplaceType);
        // formData.append("tags", values.tags);

        // console.log(formData);
        let data;

        id
          ? (data = await updateJob(id, formData))
          : (data = await addJob(formData));

        console.log(data);
        if (data.status === 201) {
          console.log("clicked");
          navigate("/posts");
        }
      } catch (e) {
        console.log(e);
        message.error(e?.response?.data?.message);
      }
    },
  });
  console.log(values);
  return (
    <Col className="JobPost" span={24}>
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
          style={{ marginTop: "3rem" }}
        >
          <Col span={24} style={{ marginTop: "1.5rem" }}>
            <Col>
              <Title style={{ color: "white" }} level={3}>
                Post a Job with Gitvisual
              </Title>
              <Text style={{ color: "white" }}>
                Prospects sent right to your inbox
              </Text>
            </Col>
          </Col>

          <Col span={24} className="JobPostForm">
            <Title level={4}>Tell us about your role</Title>
            <br />
            <Form
              size="large"
              name="jobpost_form"
              autoComplete="on"
              layout="vertical"
              scrollToFirstError
              requiredMark="optional"
              // onFinish={}
              initialValues={{
                remember: true,
              }}
            >
              <Col span={24}>
                <Form.Item
                  label="Job Title"
                  name="job"
                  rules={[
                    {
                      required: true,
                      // message: "Please enter a valid name!",
                    },
                    { min: 2, message: "Too Short!" },
                    { max: 50, message: "Too Long!" },
                  ]}
                >
                  <Input
                    name="title"
                    values={values.title}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Job Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Describe yourself!",
                    },
                    { min: 2, message: "Too Short!" },
                    { max: 200, message: "Too Long!" },
                  ]}
                >
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={value}
                    onChange={setValue}
                  />
                  {/* <Input.TextArea /> */}
                </Form.Item>
              </Col>

              {/* <Title level={5}>Social Profile</Title> */}

              {/* <Col
                span={24}
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Form.Item
                  style={{ flex: 1 }}
                  label="Job Location City"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a valid Location!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ flex: 1 }}
                  label="Job Location Country"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a valid Location!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col> */}

              {/* <Col span={24}>
                <Form.Item
                  label="Workplace Type"
                  name="workplaceType"
                  value={values.workplaceType}
                  onChange={handleChange}
                  rules={[
                    {
                      required: true,
                      message: "Please enter a valid Type!",
                    },
                  ]}
                >
                  <Select name="workplaceType" onChange={handleSelectChange}>
                    <Select.Option value="permanent">Permanent</Select.Option>
                    <Select.Option value="contract">Contract</Select.Option>
                    <Select.Option value="freelance">Freelance</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                  </Select>
                </Form.Item>
              </Col> */}

              {/* <Col span={24}>
                <Form.Item
                  label="Experience"
                  name="expereince"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Expereince!",
                    },
                  ]}
                >
                  <Input
                    name="experience"
                    values={values.experience}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col> */}

              {/* <Col span={24}>
                <Form.Item
                  label="Employment Type"
                  name="employmentType"
                  rules={[
                    {
                      required: true,
                      message: "Enter Employment Type!",
                    },
                  ]}
                >
                  <Input
                    name="employmentType"
                    values={values.employmentType}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col> */}
              {/* 
              <Col span={24}>
                <Form.Item
                  label="Link to application"
                  name="linkApplication"
                  rules={[
                    {
                      required: true,
                      message: "Please enter application link!",
                    },
                  ]}
                >
                  <Input
                    name="link"
                    values={values.link}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col> */}

              {/* <Col span={24} className="companyInfo">
                <Text type="secondary">Company Location</Text>
                <Col span={24}>
                  <Form.Item
                    label="What is your companies name"
                    name="companyName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Comapany Name!",
                      },
                    ]}
                  >
                    <Input
                      name="companyName"
                      values={values.companyName}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Company Logo "
                    name="companyLogo"
                    rules={[
                      {
                        required: true,
                        message: "Please select Comapany Logo!",
                      },
                    ]}
                  >
                    <Upload
                      maxCount={1}
                      listType="picture"
                      onChange={uploadLogo}
                      beforeUpload={(file) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {};

                        return false;
                      }}
                    >
                      <Button>Choose Image</Button>
                    </Upload>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Company website "
                    name="companyWebsite"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Comapany Website!",
                      },
                    ]}
                  >
                    <Input
                      name="companyWebsite"
                      values={values.companyWebsite}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </Col>
              </Col> */}

              {/* <Col span={24}>
                <Form.Item
                  label="Tags"
                  name="tags"
                  rules={[
                    {
                      required: true,
                      message: "Please enter tags!",
                    },
                  ]}
                >
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Please select"
                    onChange={handleChangeTags}
                    style={{
                      width: "100%",
                    }}
                    options={options}
                  />
                </Form.Item>
              </Col> */}

              <Col span={24} style={{ textAlign: "end" }}>
                <Space direction="horizontal">
                  <Form.Item>
                    <Link to="/">
                      <Button type="ghost" className="cancel">
                        Cancel
                      </Button>
                    </Link>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      onClick={handleSubmit}
                      type="primary"
                      className="save"
                      htmlType="submit"
                      // block
                    >
                      Continue
                    </Button>
                  </Form.Item>
                </Space>
              </Col>
            </Form>
          </Col>
        </Col>
      </Row>
    </Col>
  );
}
