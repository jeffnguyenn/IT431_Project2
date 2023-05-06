import React, { useState } from "react";
import {
  Form,
  Card,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../auth/useToken";
const KeyboardAdd = () => {
  const navigate = useNavigate();
  const [keyboard, setKeyboard] = useState({});
  const [token] = useToken();
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKeyboard({ ...keyboard, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/keyboard/`, keyboard, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/keyboards");
      })
      .catch((error) => {
        console.error(error);
        setError("An error has occurred. Please contact your administrator.");
      });
  };

  return (
    <Card>
      <Container>
        <h1>Add Keyboard</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col>
            <Card className="my-3 p-3 rounded">
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>
                    <strong>Name</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Keyboard Name"
                    name="name"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formSize">
                  <Form.Label>
                    <strong>Size</strong>
                  </Form.Label>
                  <Form.Select name="size" onChange={handleInputChange}>
                    <option value="0">Choose a size</option>
                    <option value="60%">60%</option>
                    <option value="75%">75%</option>
                    <option value="96%">96%</option>
                    <option value="TKL">TKL</option>
                    <option value="100%">100%</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formSwitchBrand">
                  <Form.Label>
                    <strong>Switch Brand</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Keyboard Switch Brand"
                    name="switchBrand"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCaseColor">
                  <Form.Label>
                    <strong>Case Color</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Color of Case"
                    name="caseColor"
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBluetooth">
                  <Form.Label>
                    <strong>Connectivity</strong>
                  </Form.Label>
                  <Form.Select name="connectivity" onChange={handleInputChange}>
                    <option value="0">Choose a connection</option>
                    <option value="wired">Wired</option>
                    <option value="bluetooth">Bluetooth</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formPrice">
                  <Form.Label>
                    <strong>Price</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Price"
                    name="price"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Card>
            <Button onClick={handleSubmit} variant="primary">
              Save
            </Button>
            &nbsp;
            <Button onClick={() => navigate(-1)} variant="primary">
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default KeyboardAdd;
