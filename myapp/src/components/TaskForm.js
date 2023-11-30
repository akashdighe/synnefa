// TaskForm.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from '../Redux/actions';

const TaskForm = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (taskTitle.trim() !== '') {
      // Dispatch the addTask action for local state management
      addTask({ id: Date.now(), title: taskTitle, completed: false });
      setTaskTitle('');
    }

    // Create a new task object for the API request
    const newTask = {
      title: taskTitle,
    };

    try {
      // Use the correct fetch syntax
      await fetch(`http://localhost:8080/api/v1/toDoList/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
        
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(taskTitle, 'mm')

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

const mapDispatchToProps = {
  addTask,
};

export default connect(null, mapDispatchToProps)(TaskForm);
