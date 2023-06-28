const EmployeeTable = ({ data, onEdit, onDelete, setShowForm }) => {
  return (
    <div>
      <div>
        <h1>Employee Table</h1>
        <button
          style={{ marginBottom: "1rem" }}
          onClick={() => setShowForm(true)}
        >
          Add{" "}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Position</th>
            <th>Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr key={employee.employee_id}>
              <td>{employee.employee_id}</td>
              <td>{employee.position}</td>
              <td>{employee.employee_details.name}</td>
              <td>{employee.employee_details.address}</td>
              <td>
                <button
                  onClick={() => {
                    setShowForm(true);
                    onEdit("employee", employee.employee_id);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete("employee", employee.employee_id)}
                >
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

export { EmployeeTable };
