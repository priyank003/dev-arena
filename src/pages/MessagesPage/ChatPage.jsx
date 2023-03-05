import {
  Avatar,
  Button,
  Col,
  Divider,
  Input,
  Layout,
  List,
  Space,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

import "./ChatPage.Module.scss";
import MsgIcon from "./img/msg.svg";
import MessagesItem from "./Components/MessageItem/MessagesItem";
import UserItem from "./Components/UserItem/UserItem";
import WriteMessage from "./Components/WriteMessage/WriteMessage";
import io from "socket.io-client";
import { users } from "./chatList";
import { messages } from "./messagesList";
import { BASE_URL_SOCKET, BASE_URL_SOCKET_LOCAL } from "../../Api/BASE_URL";
import {
  getMessagesInConversation,
  getUser,
  getConversations,
  newConversation,
  newMessage,
  getUsers,
  getConversation,
} from "../../Api";

const { Text, Title } = Typography;
const { Header, Sider, Content, Footer } = Layout;

const ChatPage = () => {
  const currentUser = useSelector((store) => store.user);
  const [collapsed, setCollapsed] = useState(false);
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [receiver, setReceiver] = useState();
  const [convMessages, setConvMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [currentConv, setCurrentConv] = useState();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const call = async () => {
      const convo = await getConversations();
      const users = await getUsers();

      console.log("all cobnvo", convo.data);

      setConversations(convo.data);

      setAllUsers(users.data);
    };

    call();
  }, []);
  useEffect(() => {
    // const call = async () => {
    //   const response5 = getMessagesInConversation("63b423638feed135b8deb998");
    //   console.log(response5.data);

    //   const data = await getUser("63b1b478a6b22623c8182018");
    //   console.log(data.data);
    //   // const response = await getUser("63b2c337420b780e487b49f1");
    //   // console.log(response.data);
    // };
    // call();
    const socket = io(BASE_URL_SOCKET, {
      query: { token: JSON.parse(localStorage.getItem("access_token")) },
    });
    console.log(socket.connected);
    // const call2 = async () => {
    //   console.log("connected");
    //   const response = await getUser("63b2c337420b780e487b49f1");
    //   console.log(response.data);

    //   // const response2 = await newConversation({ receiverId: "63b1b478a6b22623c8182018" });
    //   // console.log(response2.data);
    // };
    // call2();
    socket.emit("typing", () => {
      console.log("connected");
    });
    socket.on("newMessage", (data) => {
      setRefresh((prev) => !prev);
    });
  }, []);
  const handleChange = (e) => {
    setMessage(e);
  };

  const handleClick = async () => {
    await newMessage({
      conversationId: currentConv.id,
      receiver: receiver.id,
      messageType: "text",
      text: message,
    });

    setRefresh((prev) => !prev);
  };

  const [isTablet, setTsTablet] = useState(
    useMediaQuery({
      query: "(max-width: 768px)",
    })
  );

  const isDesktopOrLaptop = useMediaQuery({
    query: "(max-width: 1190px)",
  });

  useEffect(() => {}, [isTablet]);

  useEffect(() => {
    const call = async () => {
      const convo = await getConversation(receiver.id);
      if (convo.data === "") {
        const newConvo = await newConversation({ receiverId: receiver.id });

        setCurrentConv(newConvo.data);
      } else {
        const messages = await getMessagesInConversation(convo.data.id);
        setConvMessages(messages.data.results);
        setCurrentConv(convo.data);
      }
    };

    call();
  }, [receiver, refresh]);

  return (
    <section className="ChatPage">
      <Layout style={{ height: "calc(100vh - 48px)" }}>
        <Sider
          style={{ height: "calc(100vh - 48px)", overflow: "hidden" }}
          trigger={null}
          className={"chat__sidebar " + (collapsed ? "collapsedClass" : "")}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Space
            direction="vertical"
            size="middle"
            style={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Title
              className="sidebarTitle"
              level={3}
              style={{
                color: "white",
                textAlign: "center",
                lineHeight: "1",
                marginBottom: "2",
              }}
            >
              Messages
            </Title>

            <Input
              className="search-msg"
              prefix={<SearchOutlined />}
              placeholder=" Search..."
              size="large"
            />

            <List
              dataSource={allUsers}
              renderItem={(user) => (
                <UserItem
                  user={user}
                  onOpenConversation={(user) => setReceiver(user)}
                />
              )}
            />

            <Divider
              plain
              orientation="left"
              orientationMargin="0"
              style={{ color: "white", margin: "0px" }}
            >
              <img src={MsgIcon} alt="Message" />{" "}
              <span className="all-msgs" style={{ color: "#B4B5B7" }}>
                {" "}
                All Message{" "}
              </span>
            </Divider>

            <div
              id="scrollableDiv"
              style={{
                height: 380,
                overflow: "auto",
              }}
            >
              <List>
                {conversations?.map((convo) => {
                  // console.log(convo.messages.slice(-1));

                  return (
                    <>
                      {" "}
                      {convo.messages.length && (
                        <UserItem
                          user={
                            convo?.members?.filter(
                              (mem) => mem.id !== currentUser.id
                            )[0]
                          }
                          last_msg={convo?.messages?.slice(-1)[0]?.text}
                          onOpenConversation={(user) => setReceiver(user)}
                        />
                      )}{" "}
                    </>
                  );
                })}
              </List>
              {/* <List
                dataSource={users.slice(2)}
                renderItem={(user) => <UserItem user={user} />}
              /> */}
            </div>
          </Space>
        </Sider>

        <Layout
          className="chat-layout"
          style={{ height: "calc(100vh - 48px)", overflow: "hidden" }}
        >
          {receiver ? (
            <>
              {" "}
              <Header className="chat-content">
                <Space size="small">
                  <Avatar
                    size={{
                      xs: 22,
                      sm: 22,
                      md: 28,
                      lg: 34,
                      xl: 40,
                      xxl: 40,
                    }}
                    icon={<UserOutlined />}
                    src={receiver?.avatar?.pathUrl}
                  />

                  <Title
                    className="chat-title"
                    level={3}
                    style={{ margin: 0, color: "white" }}
                  >
                    {receiver?.name}
                  </Title>
                </Space>
              </Header>
              <Content
                className="chat-content"
                style={{
                  margin: "24px 16px",
                  padding: "24px",
                  background: "#1b2023",
                  minHeight: 280,
                  overflowY: "scroll",
                }}
              >
                {/* {(() => {})()} */}
                {convMessages?.length && (
                  <MessagesItem
                    MsgsArray={convMessages}
                    currentUser={currentUser}
                    receiver={receiver}

                    //   key={index}
                    //   date={message.date}
                    //   name={message.name}
                    //   avatar={message.avatar}
                    //   MsgsArray={message.msgslist}
                  />
                )}

                {/* {messages?.map((message, index) => {
                return (
                  <MessagesItem
                    key={index}
                    date={message.date}
                    name={message.name}
                    avatar={message.avatar}
                    MsgsArray={message.msgslist}
                  />
                );
              })} */}
              </Content>
              <Footer
                style={{
                  textAlign: "center",
                }}
              >
                <Col span={24} className="messageArea">
                  <Col
                    xs={{ span: 30 }}
                    sm={{ span: 24 }}
                    md={{ span: 22 }}
                    lg={{ span: 14 }}
                    xl={{ span: 14 }}
                    style={{ padding: "10px", width: "100%" }}
                  >
                    <WriteMessage onChange={handleChange} onSend={handleClick} />
                    {/* <Button onClick={handleClick}>Send</Button> */}
                  </Col>
                </Col>
              </Footer>
            </>
          ) : (
            <div style={{ height: "100%", background: "#1b2023" }}></div>
          )}
        </Layout>
      </Layout>
    </section>
  );
};
export default ChatPage;
