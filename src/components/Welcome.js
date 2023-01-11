import React from "react";
import { Button, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div>
      <center className="welcome">
        <h1>Welcome to LetsChat</h1>
        <br />
        <h5>
          <b>Happy Chatting !!!! &#9996;</b>
        </h5>

        <br />

        <Button variant="outline-light" size="lg" active>
          <Link to="/chat"> CHAT</Link>
        </Button>
      </center>
    </div>
  );
};

export default Welcome;
