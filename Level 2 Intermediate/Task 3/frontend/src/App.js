import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Container, Row, Col, Button, Form, FormGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/todos')
            .then(response => setTodos(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const addTodo = () => {
        if (newTodo.trim()) {
            const todo = { id: Date.now().toString(), text: newTodo };
            axios.post('http://localhost:5000/todos', todo)
                .then(response => setTodos([...todos, response.data]))
                .catch(error => console.error('Error adding todo:', error));
            setNewTodo('');
        }
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
            .catch(error => console.error('Error deleting todo:', error));
    };

    return (
        <Container className="mt-5 container">
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <h1 className="h1 text-center">To-Do List</h1>
                    <Form inline className="mb-3" onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
                        <FormGroup className="mr-2">
                            <Input 
                                type="text" 
                                value={newTodo} 
                                onChange={(e) => setNewTodo(e.target.value)} 
                                placeholder="Add a new task"
                            />
                        </FormGroup>
                        <Button color="primary" className="Add"onClick={addTodo}>Add</Button>
                    </Form>
                    <ListGroup>
                        {todos.map(todo => (
                            <ListGroupItem key={todo.id} className="d-flex justify-content-between align-items-center">
                                <span>{todo.text}</span>
                                <Button color="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
