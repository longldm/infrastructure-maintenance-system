import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface TaskItem {
  id: number;
  priority: number;
  location: string;
  equipment: string;
  note: string;
  time: string;
  state: "Được giao" | "Hoàn thành";
}

const taskList: TaskItem[] = [
  { id: 1, priority: 3, location: "Office A", equipment: "Printer", note: "Requires urgent repair", time: "2024-12-03 10:00 AM", state: "Được giao" },
  { id: 2, priority: 1, location: "Office B", equipment: "Laptop", note: "Battery replacement needed", time: "2024-12-02 9:00 AM", state: "Hoàn thành" },
  { id: 3, priority: 2, location: "Conference Room", equipment: "Projector", note: "Lens cleaning required", time: "2024-12-01 11:00 AM", state: "Được giao" },
  { id: 4, priority: 2, location: "Office D", equipment: "Monitor", note: "Broken screen needs replacement", time: "2024-12-01 2:00 PM", state: "Hoàn thành" },
  { id: 5, priority: 5, location: "Lobby", equipment: "Security Camera", note: "Malfunctioning camera", time: "2024-12-03 1:30 PM", state: "Được giao" },
  { id: 6, priority: 4, location: "Office E", equipment: "Desktop PC", note: "Hard drive upgrade requested", time: "2024-12-04 3:00 PM", state: "Hoàn thành" },
  { id: 7, priority: 1, location: "Reception", equipment: "Telephone", note: "No dial tone", time: "2024-12-03 4:00 PM", state: "Được giao" },
  { id: 8, priority: 3, location: "Office F", equipment: "Router", note: "Intermittent connectivity", time: "2024-12-04 10:30 AM", state: "Hoàn thành" },
  { id: 9, priority: 4, location: "Office G", equipment: "Air Conditioner", note: "Cooling issue reported", time: "2024-12-02 1:00 PM", state: "Được giao" },
  { id: 10, priority: 2, location: "Cafeteria", equipment: "Microwave", note: "Heating not working", time: "2024-12-05 12:15 PM", state: "Được giao" },
  { id: 11, priority: 5, location: "Server Room", equipment: "UPS", note: "Battery replacement needed", time: "2024-12-06 10:00 AM", state: "Được giao" },
  { id: 12, priority: 3, location: "Office H", equipment: "Speaker", note: "Low sound quality", time: "2024-12-06 2:00 PM", state: "Hoàn thành" },
  { id: 13, priority: 1, location: "Meeting Room", equipment: "Whiteboard", note: "Stains not removable", time: "2024-12-07 9:00 AM", state: "Được giao" },
  { id: 14, priority: 4, location: "Office J", equipment: "Desk Lamp", note: "Broken switch", time: "2024-12-07 11:30 AM", state: "Hoàn thành" },
  { id: 15, priority: 2, location: "Parking Lot", equipment: "Gate Barrier", note: "Motor malfunction", time: "2024-12-07 4:00 PM", state: "Được giao" },
];

const ExecutorContainer = () => {
  const [activeState, setActiveState] = useState<"Được giao" | "Hoàn thành">("Được giao");
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;

  const handleRowClick = (task: TaskItem) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleHeaderClick = (column: string) => {
    if (sortBy === column) {
      // Toggle sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new column and default to ascending
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const sortedTasks = (tasks: TaskItem[]) => {
    return [...tasks].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "priority") comparison = a.priority - b.priority;
      if (sortBy === "location") comparison = a.location.localeCompare(b.location);
      if (sortBy === "equipment") comparison = a.equipment.localeCompare(b.equipment);
      if (sortBy === "time") comparison = new Date(a.time).getTime() - new Date(b.time).getTime();
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  const filteredTasks = sortedTasks(taskList.filter((task) => task.state === activeState));
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const currentTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  return (
    <div className="container mt-4">
      <h2>Executor Task Management</h2>

      {/* Tabs for State */}
      <div className="btn-group mb-3">
        <button
          className={`btn ${activeState === "Được giao" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setActiveState("Được giao");
            setCurrentPage(1); // Reset pagination
          }}
        >
          Được giao
        </button>
        <button
          className={`btn ${activeState === "Hoàn thành" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setActiveState("Hoàn thành");
            setCurrentPage(1); // Reset pagination
          }}
        >
          Hoàn thành
        </button>
      </div>

      {/* Task Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th >
                ID
              </th>
              <th onClick={() => handleHeaderClick("priority")} style={{ cursor: "pointer" }}>
                Độ ưu tiên {sortBy === "priority" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => handleHeaderClick("location")} style={{ cursor: "pointer" }}>
                Địa điểm {sortBy === "location" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
              </th>
              <th onClick={() => handleHeaderClick("equipment")} style={{ cursor: "pointer" }}>
                Trang thiết bị {sortBy === "equipment" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
              </th>
              <th>Ghi chú</th>
              <th onClick={() => handleHeaderClick("time")} style={{ cursor: "pointer" }}>
                Thời gian {sortBy === "time" ? (sortDirection === "asc" ? "↑" : "↓") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id} onClick={() => handleRowClick(task)} style={{ cursor: "pointer" }}>
                <td>{task.id}</td>
                <td>{task.priority}</td>
                <td>{task.location}</td>
                <td>{task.equipment}</td>
                <td>{task.note}</td>
                <td>{task.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedTask && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết công việc</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedTask.id}</p>
                <p><strong>Độ ưu tiên:</strong> {selectedTask.priority}</p>
                <p><strong>Địa điểm:</strong> {selectedTask.location}</p>
                <p><strong>Trang thiết bị:</strong> {selectedTask.equipment}</p>
                <p><strong>Ghi chú:</strong> {selectedTask.note}</p>
                <p><strong>Thời gian:</strong> {selectedTask.time}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                {selectedTask.state === "Được giao" && (
                  <button type="button" className="btn btn-primary" onClick={() => alert("Xác nhận xử lý công việc")}>
                    Xác nhận xử lý
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutorContainer;
