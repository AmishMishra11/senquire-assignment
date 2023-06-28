import React, { useState, useEffect } from "react";

import "./form.css";

const EmployeeForm = ({ onSubmit, onCancelEdit, selectedItem, onClose }) => {
  const [tempEmployeeDetails, setTempEmployeeDetails] = useState({
    position: "",
    name: "",
    address: "",
  });

  const handleChange = (e) => {
    setTempEmployeeDetails({
      ...tempEmployeeDetails,
      [e.target.name]: e.target.value,
    });
  };

  const resetEmployeeDetails = () => {
    setTempEmployeeDetails({
      position: "",
      name: "",
      address: "",
    });
  };

  useEffect(() => {
    console.log("here", selectedItem);
    if (selectedItem) {
      setTempEmployeeDetails({
        position: selectedItem.position,
        name: selectedItem.employee_details.name,
        address: selectedItem.employee_details.address,
      });
    }
  }, [selectedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      employee_id: selectedItem
        ? selectedItem.employee_id
        : Date.now().toString(),
      position: tempEmployeeDetails.position,
      employee_details: {
        name: tempEmployeeDetails.name,
        address: tempEmployeeDetails.address,
      },
    });

    resetEmployeeDetails();
    onClose();
  };

  const cancelEditFunction = () => {
    onCancelEdit();
    resetEmployeeDetails();
    onClose();
  };

  const employeeFromProperties = ["position", "name", "address"];

  return (
    <div className="mainContainer" onClick={onClose}>
      <div className="fonmContainer" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2>Employee Form</h2>

          {employeeFromProperties.map((item) => {
            return (
              <label>
                {item}
                <input
                  type="text"
                  value={tempEmployeeDetails[item]}
                  name={`${item}`}
                  onChange={handleChange}
                />
              </label>
            );
          })}

          <button type="submit">
            {selectedItem ? "Update Employee" : "Add Employee"}
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
export { EmployeeForm };
