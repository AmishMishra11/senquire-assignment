import React, { useEffect, useState } from "react";
import "./App.css";
import { data } from "./DB/data";

import { TaskForm } from "./Components/Froms/TaskForm";
import { CarForm } from "./Components/Froms/CarFrom";
import { EmployeeForm } from "./Components/Froms/EmployeeForm";
import { TaskTable } from "./Components/Tables/TaskTable";
import { CarTable } from "./Components/Tables/CarTable";
import { EmployeeTable } from "./Components/Tables/EmployeeTable";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [cars, setCars] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedTab, setSelectedTab] = useState("tasks");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data) {
      setTasks(data.task);
      setCars(data.cars);
      setEmployees(data.employee);
    }
  }, [data]);

  const handleTaskSubmit = (task) => {
    if (selectedItemId) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === selectedItemId ? task : t))
      );
      setSelectedItemId(null);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const handleCarSubmit = (car) => {
    if (selectedItemId) {
      setCars((prevCars) =>
        prevCars.map((c) => (c.car_id === selectedItemId ? car : c))
      );
      setSelectedItemId(null);
    } else {
      setCars([...cars, car]);
    }
  };

  const handleEmployeeSubmit = (employee) => {
    if (selectedItemId) {
      setEmployees((prevEmployees) =>
        prevEmployees.map((e) =>
          e.employee_id === selectedItemId ? employee : e
        )
      );
      setSelectedItemId(null);
    } else {
      setEmployees([...employees, employee]);
    }
  };

  const handleEdit = (type, id) => {
    setSelectedItemId(id);
    setSelectedItemType(type);
  };

  const handleDelete = (type, id) => {
    switch (type) {
      case "task":
        setTasks(tasks.filter((task) => task.id !== id));
        break;
      case "car":
        setCars(cars.filter((car) => car.car_id !== id));
        break;
      case "employee":
        setEmployees(
          employees.filter((employee) => employee.employee_id !== id)
        );
        break;
      default:
        break;
    }
    if (selectedItemId === id) {
      setSelectedItemId(null);
    }
  };

  const handleCancelEdit = () => {
    setSelectedItemId(null);
  };

  return (
    <div className="App">
      <div>
        <button className="tabs" onClick={() => setSelectedTab("tasks")}>
          Tasks
        </button>
        <button className="tabs" onClick={() => setSelectedTab("cars")}>
          Cars
        </button>
        <button className="tabs" onClick={() => setSelectedTab("employees")}>
          Employees
        </button>
      </div>

      {selectedTab === "tasks" && showForm && (
        <TaskForm
          onSubmit={handleTaskSubmit}
          onCancelEdit={handleCancelEdit}
          selectedItem={tasks.find((task) => task.id === selectedItemId)}
          onClose={() => setShowForm(false)}
        />
      )}

      {selectedTab === "cars" && showForm && (
        <CarForm
          onSubmit={handleCarSubmit}
          onCancelEdit={handleCancelEdit}
          selectedItem={cars.find((car) => car.car_id === selectedItemId)}
          onClose={() => setShowForm(false)}
        />
      )}

      {selectedTab === "employees" && showForm && (
        <EmployeeForm
          onSubmit={handleEmployeeSubmit}
          onCancelEdit={handleCancelEdit}
          selectedItem={employees.find(
            (employee) => employee.employee_id === selectedItemId
          )}
          onClose={() => setShowForm(false)}
        />
      )}

      <div>
        {selectedTab === "tasks" && (
          <TaskTable
            data={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            setShowForm={setShowForm}
          />
        )}

        {selectedTab === "cars" && (
          <CarTable
            data={cars}
            onEdit={handleEdit}
            onDelete={handleDelete}
            setShowForm={setShowForm}
          />
        )}

        {selectedTab === "employees" && (
          <EmployeeTable
            data={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
};

export default App;
