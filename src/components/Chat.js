import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { Container, Col, Row, Button } from "react-bootstrap";
import io from "socket.io-client";

const socket = io.connect();
const Chat = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [chatMessage, setChatMessage] = useState({
    name: "",
    msg: "",
    room: "",
    isPrivate: false,
  });
  const [msgList, setMsgList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState("General Chat");

  useEffect(() => {
    socket.emit("userJoin", userData.user.name);
  }, []);

  const { userData, setUserData } = useContext(UserContext);

  socket.on("newMessage", (newMessage) => {
    setMsgList([
      ...msgList,
      {
        name: newMessage.name,
        msg: newMessage.msg,
        isPrivate: newMessage.isPrivate,
      },
    ]);
  });

  socket.on("userList", (userList) => {
    setChatUsers(userList);
    setChatMessage({ name: userData.user.name, msg: chatMessage.msg });
  });

  const handleChange = (e) => {
    setChatMessage({ ...chatMessage, [e.target.name]: e.target.value });
  };

  const newMessageSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      name: chatMessage.name,
      msg: chatMessage.msg,
      room: currentRoom,
      isPrivate: isChatPrivate(currentRoom, chatUsers),
    };

    socket.emit("newMessage", newMessage);

    setChatMessage({
      name: userData.user.name,
      msg: "",
    });
  };

  const enteringRoom = (e) => {
    let oldRoom = currentRoom;
    let newRoom = e.target.textContent;
    setCurrentRoom(newRoom);
    socket.emit("roomEntered", { oldRoom, newRoom });
    setMsgList([]);
  };

  const isChatPrivate = (roomName, userList) => {
    let isPrivate = false;
    userList.forEach((userName) => {
      if (userName === roomName) {
        isPrivate = true;
      }
    });
    return isPrivate;
  };

  return (
    <div className="chat-ui">
      <div>
        <Container>
          <Row>
            <Col xs={5} style={{ border: "1px solid black" }}>
              <br />

              <br />

              <p>
                <b>Currently Connected Users:</b>
                <br />
                <br />
                <b>Click on user to chat</b>
              </p>
              <ul style={{ listStyleType: "none" }}>
                {chatUsers.map((user) => {
                  return (
                    <li
                      onClick={enteringRoom}
                      style={
                        ({ cursor: "pointer" },
                        { color: "Green" },
                        { fontSize: "35px" })
                      }
                      key={user}
                    >
                      {user}
                    </li>
                  );
                })}
              </ul>
            </Col>
            <Col style={{ border: "1px solid black" }}>
              <div
                className="input"
                id="chatMessages"
                style={{ border: "1px solid black" }}
              >
                Messages
                <ul style={{ listStyle: "none" }}>
                  {msgList.map((msgList, index) => {
                    return (
                      <li className="color" key={index}>
                        <b>{msgList.name}: </b>
                        <i>
                          <span
                            style={{
                              color: msgList.isPrivate ? "red" : "black",
                            }}
                          >
                            {msgList.msg}
                          </span>
                        </i>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <br />
              <p>Chat Messages ({currentRoom})</p>
              <div className="msg-input">
                <form onSubmit={newMessageSubmit}>
                  <div className="msg-inside">
                    <div>
                      <input
                        size="40"
                        className="msg"
                        type="text"
                        name="msg"
                        value={chatMessage.msg}
                        onChange={handleChange}
                        required
                        style={{ width: "80%" }}
                      />
                    </div>
                    <Button variant="primary" type="submit" size="sm">
                      Send
                    </Button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Chat;
