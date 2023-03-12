import React, { useEffect, useState } from "react";
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
  Skeleton,
} from "antd";
import { Comment } from "@ant-design/compatible";
import defaultAvatar from "../../assets/ProfileImages/deafult_avatar.png";
import Moment from "react-moment";
import replyArrow from "../../assets/svg/replyArrow.svg";
import { createReply, getCommentById } from "../../Api";
const { Text, Title } = Typography;
const { TextArea } = Input;

const ExampleComment = ({ children, comment }) => (
  <Comment
    actions={[<span key="comment-nested-reply-to">Reply to</span>]}
    author={<a>{`${comment.author?.username}`}</a>}
    avatar={<Avatar src={comment?.author?.avatar?.pathUrl} alt="Han Solo" />}
    content={<p>{comment.description}</p>}
  >
    {console.log("comment", children)}
    {children}
  </Comment>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add reply
      </Button>
    </Form.Item>
  </div>
);

export default function Comments({ comment, re, onRefresh }) {
  if (re === true) {
    console.log("replies", comment);
  }
  const [replies, setReplies] = useState([]);
  const [reply, setReply] = useState();
  const [openCommentInput, setOpenCommentInput] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const submitReply = async (e) => {
    console.log("submit", reply);
    console.log(comment);
    const res = await createReply(comment.id, {
      description: reply,
    });
    console.log(res);
    if (res.status === 201) {
      setRefresh((prev) => !prev);
      setOpenCommentInput((prev) => !prev);
    }

    console.log(res);
  };
  useEffect(() => {
    const call = async () => {
      if (comment.replyCount) {
        const res = await getCommentById(comment.id);

        setReplies(res.data.replies);
      }
    };

    call();
  }, [comment, refresh]);

  console.log("reply", replies);
  return (
    // <Row
    //   style={{
    //     overflow: "hidden",
    //     // width: `${re ? "80%" : "100%"} `,
    //     border: `${re ? "1px solid red" : ""}`,
    //     // marginLeft: `${re ? "10px" : "0"}`,
    //     left: `${re ? "10px" : ""}`,
    //   }}
    // >
    //   <Col xs={{ span: 3 }} lg={{ span: 1 }}>
    //     <Avatar
    //       src={
    //         <Image
    //           src={
    //             comment?.author?.avatar?.pathUrl
    //               ? comment?.author?.avatar?.pathUrl
    //               : defaultAvatar
    //           }
    //           style={{
    //             width: 32,
    //           }}
    //         />
    //       }
    //     />
    //   </Col>

    //   <Col lg={{ span: 20 }} xs={{ span: 21 }}>
    //     <Col span={24}>
    //       <Text strong>{comment.author?.name}</Text> &nbsp;
    //       <Text type="secondary">
    //         {comment.author?.userName} &nbsp;{" "}
    //         <Moment format="DD/MM//YYYY">{comment.postedAt}</Moment>
    //       </Text>
    //     </Col>

    //     <Col span={24}>
    //       <Text>{comment?.description}</Text>
    //     </Col>

    //     <Col span={23} style={{ textAlign: "end" }}>
    //       <Space
    //         onClick={() => setOpenCommentInput((prev) => !prev)}
    //         style={{ cursor: "pointer" }}
    //       >
    //         <Image src={replyArrow} alt="Reply" />
    //         <Text className="reply" style={{ color: "#09A7D9" }}>
    //           Reply
    //         </Text>
    //       </Space>
    //       {openCommentInput && (
    //         <Editor
    //           onSubmit={submitReply}
    //           onChange={(e) => {
    //             return setReply(e.target.value);
    //           }}
    //         />
    //       )}
    //     </Col>
    //     <Col span={24}>
    //       <div style={{ width: "80%", marginLeft: "10px" }}>
    //         {/* {replies?.map((cmnt) => {
    //               return <Comment comment={cmnt} re={true} />;
    //             })
    //           : ""} */}
    //         {/* {console.log("replies", replies)} */}
    //         {replies?.map((cmnt) => {
    //           return <Comments comment={cmnt} re={true} />;
    //         })}
    //       </div>
    //     </Col>

    //     <Col span={22}>
    //       <Divider />
    //     </Col>
    //   </Col>
    // </Row>
    <Comment
      actions={[
        <span
          key="comment-nested-reply-to"
          onClick={() => setOpenCommentInput((prev) => !prev)}
        >
          Reply to
        </span>,
      ]}
      author={<a>{`${comment.author?.username}`}</a>}
      avatar={
        <Avatar
          src={
            comment?.author?.avatar?.pathUrl
              ? comment?.author?.avatar?.pathUrl
              : defaultAvatar
          }
          alt="Han Solo"
        />
      }
      content={<p>{comment.description}</p>}
    >
      {openCommentInput && (
        <Editor
          onSubmit={submitReply}
          onChange={(e) => {
            return setReply(e.target.value);
          }}
        />
      )}

      {replies?.map((cmnt) => {
        return (
          <Comments comment={cmnt} />
          // <Comment
          //   actions={[
          //     <span
          //       key="comment-nested-reply-to"
          //       onClick={() => setOpenCommentInput((prev) => !prev)}
          //     >
          //       Reply to
          //     </span>,
          //   ]}
          //   author={<a>{`${cmnt.author?.username}`}</a>}
          //   avatar={
          //     <Avatar
          //       src={
          //         cmnt?.author?.avatar?.pathUrl
          //           ? cmnt?.author?.avatar?.pathUrl
          //           : defaultAvatar
          //       }
          //       alt="Han Solo"
          //     />
          //   }
          //   content={<p>{cmnt.description}</p>}
          // >
          //   {openCommentInput && cmnt.isReply && cmnt.isReply && (
          //     <Editor
          //       onSubmit={submitReply}
          //       onChange={(e) => {
          //         return setReply(e.target.value);
          //       }}
          //     />
          //   )}
          //   {/* {console.log("comment", children)}
          //   {children} */}
          // </Comment>
        );
      })}
    </Comment>
  );
}
