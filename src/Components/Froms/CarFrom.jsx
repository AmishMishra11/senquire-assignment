import React, { useState, useEffect } from "react";

import "./form.css";

const CarForm = ({ onSubmit, onCancelEdit, selectedItem, onClose }) => {
  const [tempCarDetails, setTempCarDetails] = useState({
    carName: "",
    carNumber: "",
    carEngine: "",
    carModel: "",
  });

  const carFromProperties = ["carName", "carNumber", "carEngine", "carModel"];

  const handleChange = (e) => {
    setTempCarDetails({
      ...tempCarDetails,
      [e.target.name]: e.target.value,
    });
  };

  const resetCarDetails = () => {
    setTempCarDetails({
      carName: "",
      carNumber: "",
      carEngine: "",
      carModel: "",
    });
  };

  useEffect(() => {
    if (selectedItem) {
      setTempCarDetails({
        carName: selectedItem.car_name,
        carNumber: selectedItem.car_details.car_number,
        carEngine: selectedItem.car_details.car_engine,
        carModel: selectedItem.car_details.car_model,
      });
    }
  }, [selectedItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      car_id: selectedItem ? selectedItem.car_id : Date.now(),
      car_name: tempCarDetails.carName,
      car_details: {
        car_number: tempCarDetails.carNumber,
        car_engine: tempCarDetails.carEngine,
        car_model: tempCarDetails.carModel,
      },
    });
    resetCarDetails();
    onClose();
  };

  const cancelEditFunction = () => {
    onCancelEdit();
    resetCarDetails();
    onClose();
  };

  return (
    <div className="mainContainer" onClick={onClose}>
      <div className="fonmContainer" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2>Car Form</h2>
          {carFromProperties.map((item) => {
            return (
              <label>
                {item}
                <input
                  type="text"
                  value={tempCarDetails[item]}
                  name={`${item}`}
                  onChange={handleChange}
                />
              </label>
            );
          })}
          <button type="submit">
            {selectedItem ? "Update Car" : "Add Car"}
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

export { CarForm };
