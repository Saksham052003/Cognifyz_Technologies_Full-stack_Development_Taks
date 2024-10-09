// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email); // Store the email for displaying in Navbar
      onLogin(response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <Container className="auth-container">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h1 className="text-center">Login</h1>
          <Form onSubmit={handleLogin}>
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
            <Button color="primary" type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
