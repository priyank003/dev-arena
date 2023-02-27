import { ArrowRightOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Space, Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { subscribe } from "../../Api";
import { setCredits } from "../../redux/Slices/subscriptionSlice";

const { Text, Title } = Typography;

export default function SuccessPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session_id = searchParams.get("session_id");
  const { credits } = useParams();

  useEffect(() => {
    const call = async () => {
      try {
        const response = await subscribe(session_id, credits);
        if (response.status === 200) {
          dispatch(
            setCredits({
              subscription: response?.data?.subscription,
              credits: response?.data?.credits,
            })
          );
        }
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    call();
  }, []);

  return (
    <Col
      span={24}
      className="SuccessPage"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        paddingRight: "80px",
        paddingLeft: "80px",
      }}
    >
      <Col span={24} style={{ textAlign: "center" }}>
        <Space direction="vertical" size="middle">
          <Title>Upgrade Successful !</Title>
          <Text strong>
            You can now make Job postings, by viewing options in top left !
          </Text>

          <Button
            onClick={() => {
              navigate("/jobPost");
            }}
            style={{
              width: "231px",
              height: "33px",
              marginTop: "15px",
              background: "#59F83F",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "5px",
            }}
          >
            Make a Post <ArrowRightOutlined />
          </Button>
        </Space>
      </Col>
    </Col>
  );
}
