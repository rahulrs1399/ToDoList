import { useState, memo } from 'react'

export default memo(function TodoTasks({ todo, handleCompleted, handleRemove, handleUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [updatedTasks, setUpdatedTasks] = useState(todo.value)
  console.log("list item rendering TodoTasks")
  const handleEdit = (id) => {
    setIsEditing(true)
  }

  return (


    <div className="task_List" key={todo.id}>
      {
        todo.status ? <span className='completed'>{todo.value}</span> : isEditing
          ?
          <input
            type="text"
            value={updatedTasks}
            onChange={(e) => setUpdatedTasks(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate(todo.id, updatedTasks)
                setIsEditing(false)
              }
            }} />
          :
          <span>{todo.value}</span>
      }
      <div>
        <span onClick={() => handleCompleted(todo.id)}>✅</span>
        {!isEditing && !todo.status && <span onClick={() => handleEdit(todo.id)}>✏️</span>}
        <span onClick={() => handleRemove(todo.id)}>❌</span>
      </div>
    </div>


  );
})