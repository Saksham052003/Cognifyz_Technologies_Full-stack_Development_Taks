import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Charts from '../components/Charts';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="title">Your Tasks</h1>
            <section className="form-section">
                <TaskForm />
            </section>
            <section className="list-section">
                <TaskList />
            </section>
            {/* Uncomment when Charts component is ready */}
            {/* <section className="charts-section">
                <Charts />
            </section> */}
        </div>
    );
};

export default Home;
