//create a Home React component
//this component will be used in the app.js file
import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Home = () => {
  return (
    <Card>
      <Container className="custom-container">
        <h1>Welcome to our Keyboard Shop!</h1>
        <h4>View our offerings:</h4>
        <LinkContainer to={`/keyboards`}>
          <Button variant="primary">View available keyboards</Button>
        </LinkContainer>
      </Container>
    </Card>
  );
};

export default Home;
