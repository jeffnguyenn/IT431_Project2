import React, { useState, useEffect } from "react";
import {
  Form,
  Card,
  Container,
  Row,
  Col,
  Button,
  Alert,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";

const KeyboardUpdate = () => {
  const navigate = useNavigate();
  const [token] = useToken();
  const [keyboard, setKeyboard] = useState({});
  const { id } = useParams();
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setKeyboard({ ...keyboard, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/api/keyboard/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(keyboard),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
      })
      .then((data) => {
        console.log(data);
        navigate(-1);
      })
      .catch((error) => {
        console.error(error);
        setError(`Failed to update keyboard: ${error.message}`);
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/keyboard/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setKeyboard(data);
      });
  }, [id]);

  return (
    <Card>
      <Container>
        <h1>Modify Keyboard</h1>
        {error && (
          <Alert variant="danger" className="my-3">
            {error}
          </Alert>
        )}
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
                    value={keyboard.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formSize">
                  <Form.Label>
                    <strong>Size</strong>
                  </Form.Label>
                  <Form.Select
                    name="size"
                    value={keyboard.size}
                    onChange={handleInputChange}
                  >
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
                    value={keyboard.switchBrand}
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
                    value={keyboard.caseColor}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="formBluetooth">
                  <Form.Label>
                    <strong>Connectivity</strong>
                  </Form.Label>
                  <Form.Select
                    name="connectivity"
                    value={keyboard.connectivity}
                    onChange={handleInputChange}
                  >
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
                    value={keyboard.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Card>
            <Button onClick={handleSubmit} variant="primary" class="custom-btn">
              Save
            </Button>
            &nbsp;
            <Button
              onClick={() => navigate(-1)}
              variant="primary"
              class="custom-btn"
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default KeyboardUpdate;
