// TaskList.js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteTask, toggleTask, editTask } from '../Redux/actions';


const TaskList = ({ tasks, deleteTask, toggleTask, editTask }) => {
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    // Set filteredTasks to tasks when tasks change
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleEditStart = (taskId, title) => {
    setEditableTaskId(taskId);
    setEditedTaskTitle(title);
  };

  const handleEditCancel = () => {
    setEditableTaskId(null);
    setEditedTaskTitle('');
  };

  const handleEditSave = (taskId) => {
    if (editedTaskTitle.trim() !== '') {
      editTask(taskId, { title: editedTaskTitle });
      setEditableTaskId(null);
      setEditedTaskTitle('');
    }
  };

  const handleToggleFilter = (completed) => {
    if (completed === null) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.completed === completed);
      setFilteredTasks(filtered);
    }
  };

  return (
    <div className="container">
      <div>
        <h3>Task List</h3>
        <div className="filter-buttons">
          <button onClick={() => handleToggleFilter(null)}>Show All</button>
          <button onClick={() => handleToggleFilter(true)}>Show Completed</button>
          <button onClick={() => handleToggleFilter(false)}>Show Incomplete</button>
          {/* Add more buttons here */}
        </div>
      </div>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            {editableTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                />
                <button onClick={() => handleEditSave(task.id)}>Save</button>
                <button onClick={handleEditCancel}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </span>
                <button onClick={() => handleEditStart(task.id, task.title)}>
                  Edit
                </button>
                <button onClick={() => toggleTask(task.id)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  deleteTask,
  toggleTask,
  editTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
