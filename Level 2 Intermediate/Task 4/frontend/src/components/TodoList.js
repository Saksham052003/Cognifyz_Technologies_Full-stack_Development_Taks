import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, FormGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';


const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Fetch todos on component mount
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/todos', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTodos(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchTodos();
    }, []);

    // Add a new todo
    const addTodo = async () => {
        if (newTodo.trim()) {
            try {
                const token = localStorage.getItem('token');
                const todo = { text: newTodo, createdAt: new Date().toISOString() };
                const response = await axios.post('http://localhost:5000/todos', todo, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTodos([...todos, response.data]);
                setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    // Delete a todo
    const deleteTodo = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Calculate time ago
    const calculateTimeAgo = (createdAt) => {
        const now = new Date();
        const diff = Math.round((now - new Date(createdAt)) / (1000 * 60)); // Difference in minutes
        return `${diff} minute${diff !== 1 ? 's' : ''} ago`;
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ size: 6, offset: 3 }}>
                    <h1 className="text-center">To-Do List</h1>
                    <Form inline className="mb-3" onSubmit={(e) => { e.preventDefault(); addTodo(); }}>
                        <FormGroup className="mr-2">
                            <Input
                                type="text"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                placeholder="Add a new task"
                            />
                        </FormGroup>
                        <Button color="primary" onClick={addTodo}>Add</Button>
                    </Form>
                    <ListGroup>
                        {todos.map(todo => (
                            <ListGroupItem key={todo.id} className="d-flex justify-content-between align-items-center">
                                <span>{todo.text}</span>
                                <span>{calculateTimeAgo(todo.createdAt)}</span>
                                <Button color="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default TodoList;
