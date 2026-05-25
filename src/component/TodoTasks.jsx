export default function TodoTasks({ tasks, handleCompleted, handleRemove }) {
  return (
    <div className="task__container">
      {tasks.map(({ id, value, status }) => {
        return (
          <div className="task_List" key={id}>
            <span className={status ? 'completed' : ''}>{value}</span>
            <div>
              <span onClick={() => handleCompleted(id)}>✅</span>
              <span onClick={() => handleRemove(id)}>❌</span>
              {/* <span onClick={() => handleEdit(id)}>✏️</span> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
