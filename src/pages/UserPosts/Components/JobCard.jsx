import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Collapse,
  Row,
  Space,
  Typography,
  Card,
} from "antd";
import { HiPencil } from "react-icons/hi";
import { BiLocationPlus } from "react-icons/bi";
import { EditOutlined } from "@ant-design/icons";
import user from "./../../../assets/ProfileImages/profile_pic.png";
import css from "./JobCard.module.scss";
import { useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
const { Panel } = Collapse;
const { Text, Title, Paragraph } = Typography;

export default function JobCard({ data }) {
  const navigate = useNavigate();
  const [editableStr, setEditableStr] = useState(
    "Officia duis ad esse pariatur duis esse. Sit occaecat culpa sint eiusmod. Est magna eiusmod ullamco ut incididunt incididunt do amet labore. Irure nulla ea nulla aliqua commodo. Nisi consequat labore eu sint consequat enim pariatur dolore ea aliqua exercitation."
  );
  const [editableStrWithSuffix, setEditableStrWithSuffix] = useState(
    "Officia duis ad esse pariatur duis esse. Sit occaecat culpa sint eiusmod. Est magna eiusmod ullamco ut incididunt incididunt do amet labore. Irure nulla ea nulla aliqua commodo. Nisi consequat labore eu sint consequat enim pariatur dolore ea aliqua exercitation."
  );

  const jobData = {
    id: 1,
    name: data?.title,
    job_type: data?.workplaceType,
    designation: "wizards of the coast",
    location: "Tokyo, Japan",
    description: data?.description,
    // "Officia duis ad esse pariatur duis esse. Sit occaecat culpa sint eiusmod. Est magna eiusmod ullamco ut incididunt incididunt do amet labore. Irure nulla ea nulla aliqua commodo. Nisi consequat labore eu sint consequat enim pariatur dolore ea aliqua exercitation.",
  };

  return (
    // <Row
    //   className={css["job"]}
    //   style={{
    //     width: "100%",
    //     overflow: "hidden",
    //     justifyContent: "center",
    //     marginBottom: "0.5rem",
    //   }}
    // >
    //   <EditOutlined
    //     style={{
    //       position: "absolute",
    //       right: 20,
    //       top: 20,
    //       zIndex: "1000",
    //       color: "white",
    //     }}
    //     onMouseDown={(e) => {
    //       navigate("/jobpost");
    //       e.stopPropagation();
    //     }}
    //   />
    //   <Col span={5} md={{ span: 6 }} sm={{ span: 24 }} xs={{ span: 24 }}>
    //     <Space size="middle" direction="vertical">
    //       <Space size="middle">
    //         <Col>
    //           <Badge
    //             dot
    //             style={{
    //               position: "absolute",
    //               right: 3,
    //               top: "auto",
    //               bottom: 3,
    //             }}
    //             color="#52c41a"
    //           >
    //             <Avatar
    //               size={{
    //                 xs: 24,
    //                 sm: 28,
    //                 md: 32,
    //                 lg: 36,
    //                 xl: 42,
    //                 xxl: 42,
    //               }}
    //               className={css["circle"]}
    //               src={user}
    //               alt="user"
    //               preview={false}
    //               icon={<UserOutlined />}
    //             />
    //           </Badge>
    //         </Col>
    //         <Col>
    //           <Space direction="vertical">
    //             <Text className={css["job__name"]}>{jobData.name}</Text>
    //             <Text className={css["job__designation"]}>
    //               {jobData.designation}
    //             </Text>
    //           </Space>
    //         </Col>
    //       </Space>

    //       <Button className={css["job__type"]}>{jobData.job_type}</Button>

    //       <Col span={24}>
    //         <Text style={{ color: "white" }}>
    //           <BiLocationPlus /> {jobData.location}
    //         </Text>
    //       </Col>
    //     </Space>
    //   </Col>
    //   <Col span={18} md={{ span: 17 }} sm={{ span: 22 }} xs={{ span: 22 }}>
    //     <Title level={5} style={{ color: "white" }}>
    //       Description
    //     </Title>
    //     <Paragraph className={css["job__description"]}>
    //       {Parser(jobData.description)}
    //     </Paragraph>
    //   </Col>
    // </Row>
    <Col
    //   xl={{ span: 6 }}
    //   lg={{ span: 6 }}
    //   md={{ span: 12 }}
    //   sm={{ span: 12 }}
    //   xs={{ span: 24 }}
    >
      <Card
        style={{
          width: 350,
          background: "#222222",
          color: "white",
        }}
        // onClick={() => navigate(`/sellers/detail/${jobsData[key].id}`)}
      >
        <Text style={{ color: "white" }}>
          Posted by user @{data.author.name}{" "}
        </Text>
        <EditOutlined
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            zIndex: "1000",
            color: "white",
          }}
          onMouseDown={(e) => {
            navigate(`/jobpost/patch/${data.id}`);
            // e.stopPropagation();
          }}
        />
        <Title level={3} style={{ color: "white" }}>
          {data.title}
        </Title>
        <div dangerouslySetInnerHTML={{ __html: data?.description }}>{}</div>
      </Card>
    </Col>
  );
}
