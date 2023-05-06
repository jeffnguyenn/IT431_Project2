import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { useToken } from "../auth/useToken";
import { useUser } from "../auth/useUser";

const KeyboardDetails = () => {
  const navigate = useNavigate();
  const [keyboard, setKeyboard] = useState({});
  const { id } = useParams();
  const [token] = useToken();
  const [error, setError] = useState("");
  const user = useUser();
  const [loggedIn] = useState(user !== null);

  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/keyboard/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/keyboards");
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/keyboard/${id}`)
      .then((response) => {
        console.log(response.data);
        setKeyboard(response.data);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  }, [id]);

  return (
    <Card>
      <Container>
        <h1>{keyboard.name}</h1>
        <Button onClick={() => navigate(-1)} variant="primary">
          Back
        </Button>
        &nbsp;
        {loggedIn && (
          <LinkContainer to={`/keyboards/update/${id}`}>
            <Button disabled={!loggedIn} variant="primary">
              Edit Keyboard
            </Button>
          </LinkContainer>
        )}
        &nbsp;
        {loggedIn && (
          <Button onClick={handleDelete} variant="primary">
            Delete Keyboard
          </Button>
        )}
        {error && (
          <Alert variant="danger" className="my-3">
            {error}
          </Alert>
        )}
        <Row>
          <Col>
            <Card className="my-3 p-3 rounded">
              <Card.Title as="div">
                <strong>{keyboard.name}</strong>
              </Card.Title>
              <Card.Text as="div">
                <div className="my-3">
                  <strong>Size: </strong>
                  {keyboard.size}
                </div>
                <div className="my-3">
                  <strong>Switch: </strong>
                  {keyboard.switchBrand}
                </div>
                <div className="my-3">
                  <strong>Color: </strong>
                  {keyboard.caseColor}
                </div>
                <div className="my-3">
                  <strong>Connectivity: </strong>
                  {keyboard.connectivity === "bluetooth"
                    ? "Bluetooth 5.0"
                    : "Wired"}
                </div>
              </Card.Text>
              <Card.Text as="h3">{keyboard.price}</Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default KeyboardDetails;
