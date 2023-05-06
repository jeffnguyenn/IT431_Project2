import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

const KeyboardList = () => {
  const [keyboards, setKeyboards] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/keyboard`)
      .then((response) => {
        console.log(response.data);
        setKeyboards(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert("An error has occurred. Please contact your administrator.");
      });
  }, []);

  return (
    <Card>
      <Container>
        <h1>Keyboards</h1>
        <h4>
          Check out our offerings! If you would like to add, update, or delete
          anything, please login first.
        </h4>
        <LinkContainer to={`/keyboards/add`}>
          <Button variant="primary">Add Keyboard</Button>
        </LinkContainer>
        <Row>
          {keyboards.map((keyboard) => (
            <Col key={keyboard._id} sm={12} md={6} lg={4} xl={3}>
              <Card className="my-3 p-3 rounded custom-card">
                <LinkContainer to={`/keyboard/${keyboard.id}`}>
                  <Card.Title as="div">
                    <strong>{keyboard.name}</strong>
                  </Card.Title>
                </LinkContainer>
                <Card.Text as="div">
                  <div className="my-3">{keyboard.size}</div>
                  <div className="my-3">{keyboard.switchBrand}</div>
                  <div className="my-3">{keyboard.caseColor}</div>
                  <div className="my-3">
                    {keyboard.connectivity === "bluetooth"
                      ? "Bluetooth 5.0"
                      : "Wired"}
                  </div>
                </Card.Text>
                <Card.Text as="h3">{keyboard.price}</Card.Text>
                <LinkContainer to={`/keyboards/${keyboard._id}`}>
                  <Button variant="primary">View Keyboard</Button>
                </LinkContainer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Card>
  );
};

export default KeyboardList;
