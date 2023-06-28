const TaskTable = ({ data, onEdit, onDelete, setShowForm }) => {
  return (
    <div>
      <div>
        <h1>Task Table</h1>
        <button
          style={{ marginBottom: "1rem" }}
          onClick={() => setShowForm(true)}
        >
          Add
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <button
                  onClick={() => {
                    setShowForm(true);
                    onEdit("task", task.id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => onDelete("task", task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TaskTable };
