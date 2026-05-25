import { useEffect, useState } from 'react';
import TodoTasks from './TodoTasks';

export default function ToDo() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(true);
  const handleAdd = (value, status) => {
    const id = new Date().getTime();
    const newTask = [...tasks, { id, value, status }];
    setTasks(newTask);
    setValue('');
  };
  const handleEnter = (e) => {
    let key = e.key;
    if (key === 'Enter') {
      handleAdd(value, false);
    }
  };
  const handleCompleted = (id) => {
    const newStatus = tasks.map((todo) => {
      return { ...todo };
    });
    newStatus.map((todo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
      }
    });
    setTasks(newStatus);
  };
  const handleRemove = (id) => {
    const newTask = tasks.filter((i) => i.id != id);
    setTasks(newTask);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  return (
    <div className="todo__container">
      <div className="input">
        <input
          type="text"
          onKeyDown={(e) => handleEnter(e)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          styles={{ cursor: 'pointer' }}
          onClick={() => handleAdd(value, false)}
        >
          Add Task
        </button>
      </div>
      <div>
        <TodoTasks
          tasks={tasks}
          handleCompleted={handleCompleted}
          handleRemove={handleRemove}
        />
      </div>
    </div>
  );
}
