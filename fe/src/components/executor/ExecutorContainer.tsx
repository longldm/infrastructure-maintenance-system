import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TaskItem {
  id: string;
  priority: number;
  location: string;
  equipment: string;
  note: string;
  time: string;
  state: 'Được giao' | 'Hoàn thành';
}

const taskList: TaskItem[] = [
  { id: '1', priority: 3, location: 'Office A', equipment: 'Printer', note: 'Requires urgent repair', time: '2024-12-03 10:00 AM', state: 'Được giao' },
  { id: '2', priority: 1, location: 'Office B', equipment: 'Laptop', note: 'Battery replacement', time: '2024-12-02 9:00 AM', state: 'Hoàn thành' },
  { id: '3', priority: 2, location: 'Office C', equipment: 'Projector', note: 'Lens cleaning required', time: '2024-12-01 11:00 AM', state: 'Được giao' },
  { id: '4', priority: 2, location: 'Office D', equipment: 'Monitor', note: 'Broken screen', time: '2024-12-01 2:00 PM', state: 'Hoàn thành' },
];

function ExecutorContainer() {
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [sortBy, setSortBy] = useState<string>('id');

  const handleRowClick = (task: TaskItem) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const sortedTasks = (tasks: TaskItem[]) => {
    return [...tasks].sort((a, b) => {
      if (sortBy === 'priority') return a.priority - b.priority;
      if (sortBy === 'location') return a.location.localeCompare(b.location);
      if (sortBy === 'equipment') return a.equipment.localeCompare(b.equipment);
      if (sortBy === 'time') return new Date(a.time).getTime() - new Date(b.time).getTime();
      return a.id.localeCompare(b.id);
    });
  };

  const assignedTasks = sortedTasks(taskList.filter((task) => task.state === 'Được giao'));
  const completedTasks = sortedTasks(taskList.filter((task) => task.state === 'Hoàn thành'));

  return (
    <div className="container mt-4">
      <h2>Task Management</h2>

      {/* Sort Dropdown */}
      <div className="mb-3">
        <label htmlFor="sortSelect" className="form-label">
          <strong>Sort By:</strong>
        </label>
        <select
          id="sortSelect"
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="id">ID</option>
          <option value="priority">Độ ưu tiên</option>
          <option value="location">Địa điểm</option>
          <option value="equipment">Trang thiết bị</option>
          <option value="time">Thời gian</option>
        </select>
      </div>

      {/* Assigned Section */}
      <div className="mb-4">
        <h3>Được giao</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Độ ưu tiên</th>
                <th>Địa điểm</th>
                <th>Trang thiết bị</th>
                <th>Ghi chú</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  style={{ cursor: 'pointer' }}
                >
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
      </div>

      {/* Completed Section */}
      <div>
        <h3>Hoàn thành</h3>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Độ ưu tiên</th>
                <th>Địa điểm</th>
                <th>Trang thiết bị</th>
                <th>Ghi chú</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => handleRowClick(task)}
                  style={{ cursor: 'pointer' }}
                >
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
      </div>

      {/* Modal */}
      {selectedTask && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết công việc</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Hủy
                </button>
                {selectedTask.state === 'Được giao' && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => alert('Xác nhận xử lý công việc')}
                  >
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