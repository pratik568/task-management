"use client"; // Add this line at the top

import { useState } from 'react';
import '../app/styles/style.css'

export default function Home() {
  const [taskList, setTaskList] = useState([]); // Now it starts empty

  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'low' });

  const toggleComplete = (id) => {
    setTaskList(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTaskList(prev => prev.filter(task => task.id !== id));
  };

  const addTask = () => {
    const newId = taskList.length ? Math.max(...taskList.map(task => task.id)) + 1 : 1; // Use Math.max to find the next ID
    setTaskList(prev => [...prev, { ...newTask, id: newId, completed: false }]);
    setNewTask({ title: '', description: '', priority: 'low' });
  };
  

  const sortedTasks = taskList.sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div>
      <h1>Task Management</h1>
      <form onSubmit={(e) => { e.preventDefault(); addTask(); }}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          required
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button type="submit">Add Task</button>
      </form>

      <ul>
  {sortedTasks.map(task => (
    <li key={task.id} className={`task-${task.priority} ${task.completed ? 'completed' : ''}`}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button onClick={() => toggleComplete(task.id)}>
        {task.completed ? 'Undo' : 'Complete'}
      </button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  ))}
</ul>


    </div>
  );
}
