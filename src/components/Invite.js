import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const Invite = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const sendMail = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("https://mern-chat-backend-production.up.railway.app/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })
      .then((response) => {
        if (response.status === 200) {
          setStatus("Invite Message Sent Successfully");
        } else {
          setStatus("Invite Message not Sent ,please check the mail address ");
        }
      });
  };

  return (
    <center>
      <div>
        <br />
        <br />
        <form onSubmit={sendMail}>
          <div className="input">
            <label>ENTER YOUR FRIEND'S MAIL TO INVITE THEM TO LETS CHAT</label>
            <input
              type="email"
              style={{ width: "50%" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <h2>{status}</h2>
          <br />
          <div className="input">
            <Button size="lg" type="submit">
              INVITE
            </Button>
          </div>
        </form>
      </div>
    </center>
  );
};

export default Invite;
