import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Signup = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/signup', { email, password });
      onLogin(response.data.token, response.data.email);
      navigate('/');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Container className="auth-container">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h1 className="text-center">Signup</h1>
          <Form onSubmit={handleSignup}>
            <FormGroup>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </FormGroup>
            {error && <p className="text-danger">{error}</p>}
            <Button color="primary" type="submit">Signup</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
