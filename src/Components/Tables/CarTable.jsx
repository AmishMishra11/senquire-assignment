const CarTable = ({ data, onEdit, onDelete, setShowForm }) => {
  return (
    <div>
      <div>
        <h1>Car Table</h1>
        <p onClick={() => setShowForm(true)}>Add </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Name</th>
            <th>Car Number</th>
            <th>Car Engine</th>
            <th>Car Model</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((car) => (
            <tr key={car.car_id}>
              <td>{car.car_id}</td>
              <td>{car.car_name}</td>
              <td>{car.car_details.car_number}</td>
              <td>{car.car_details.car_engine}</td>
              <td>{car.car_details.car_model}</td>
              <td>
                <button
                  onClick={() => {
                    setShowForm(true);
                    onEdit("car", car.car_id);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => onDelete("car", car.car_id)}>
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

export { CarTable };
