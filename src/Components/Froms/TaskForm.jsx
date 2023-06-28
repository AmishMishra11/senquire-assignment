import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, onCancelEdit, selectedItem, onClose }) => {
  const [tempTaskDetails, setTempTaskDetails] = useState({
    title: "",
    description: "",
  });

  const taskFormProperties = ["title", "description"];

  const handleChange = (e) => {
    setTempTaskDetails({
      ...tempTaskDetails,
      [e.target.name]: e.target.value,
    });
  };

  const resetTaskDetails = () => {
    setTempTaskDetails({
      title: "",
      description: "",
    });
  };

  useEffect(() => {
    if (selectedItem) {
      setTempTaskDetails({
        title: selectedItem.title,
        description: selectedItem.description,
      });
    }
  }, [selectedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: selectedItem ? selectedItem.id : Date.now(),
      title: tempTaskDetails.title,
      description: tempTaskDetails.description,
    });
    resetTaskDetails();
    onClose();
  };

  const cancelEditFunction = () => {
    onCancelEdit();
    resetTaskDetails();
    onClose();
  };

  return (
    <div className="mainContainer" onClick={onClose}>
      <div className="fonmContainer" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2>Task Form</h2>

          {taskFormProperties.map((item) => {
            return (
              <label>
                {item}
                <input
                  type="text"
                  value={tempTaskDetails[item]}
                  name={`${item}`}
                  onChange={handleChange}
                />
              </label>
            );
          })}
          <button type="submit">
            {selectedItem ? "Update Task" : "Add Task"}
          </button>
          {selectedItem && (
            <button type="button" onClick={cancelEditFunction}>
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export { TaskForm };
