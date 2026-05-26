import { useEffect, useState, useCallback } from 'react';
import TodoTasks from './TodoTasks';

export default function ToDo() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [value, setValue] = useState('');
  const [edit, setEdit] = useState(true);

  const handleAdd = (value, status) => {
    if (!value.trim()) {
      alert("Enter Task")
      return
    };
    const id = new Date().getTime();
    const newTask = [...tasks, { id, value, status }];
    setTasks(newTask);
    setValue('');
  }
  const handleEnter = (e) => {
    let key = e.key;
    if (key === 'Enter') {
      handleAdd(value, false);
    }
  }
  const handleCompleted = useCallback((id) => {
    setTasks((prev) => {
      console.log(prev)
      return prev.map((todo) => {
        if (todo.id === id) {
          return {...todo, status : !status}        
        }else{
          return todo;
        }
      });
    });
  }, [])
  const handleRemove = useCallback((id) => {

    setTasks((prev) => {
      const newTask = prev.filter((i) => i.id != id);
      return newTaskss
    });
  }, [])

  const handleUpdate = useCallback((id, updatedTasks) => {
    setTasks((prev) => {
      const newTodo = prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, value: updatedTasks }
        } else {
          return todo;
        }
      });
      return newTodo;
    })
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  console.log("rendering ToDO Component")
  return (
    <div className="todo__container">
      <h1>📝 My Todo List</h1>
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
      <h3>
        Tasks: {tasks.length}
      </h3>
      <div>
        <div className="task__container">

          {tasks.map((todo) => {
            return (
              <TodoTasks
                key={todo.id}
                todo={todo}
                handleCompleted={handleCompleted}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}