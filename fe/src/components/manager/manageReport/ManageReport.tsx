import { useState } from "react";
import { ReportItem } from "../../../types/Report";

const data: { [key: string]: ReportItem[] } = {
    pending: [
        {
            id: '1',
            priority: 'High',
            location: 'Office A',
            equipment: 'Printer',
            assignee: 'John Doe',
            note: 'Replace cartridge',
            time: '2024-12-03 10:00 AM',
            status: 'Pending',
        },
    ],
    delayed: [
        {
            id: '2',
            priority: 'Low',
            location: 'Office B',
            equipment: 'Laptop',
            assignee: 'Jane Smith',
            note: 'Repair screen',
            time: '2024-12-01 9:00 AM',
            status: 'Delayed',
        },
    ],
    processed: [
        {
            id: '3',
            priority: 'Medium',
            location: 'Office C',
            equipment: 'Projector',
            assignee: 'Tom Johnson',
            note: 'Clean lens',
            time: '2024-12-02 11:00 AM',
            status: 'Processed',
        },
    ],
};

const executorsPool: { [key: string]: string[] } = {
    'Office A': ['John Doe', 'Alice Smith'],
    'Office B': ['Jane Smith', 'Michael Brown'],
    'Office C': ['Tom Johnson', 'Emily Davis'],
  };

function ManagerReport() {
    const [activeSection, setActiveSection] = useState<string>('pending');
    const [selectedItem, setSelectedItem] = useState<ReportItem | null>(null);
    const [selectedAssignee, setSelectedAssignee] = useState<string>('');

    const handleRowClick = (item: ReportItem) => {
        setSelectedItem(item);
        setSelectedAssignee(item.assignee);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const handleAssigneeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAssignee(event.target.value);
    };

    const assignJob = () => {
        // TODO: Implement assign job logic
    }

    return (
        <div className="container mt-4">
            {/* Section Buttons */}
            <div className="btn-group mb-3">
                <button
                    className={`btn ${activeSection === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveSection('pending')}
                >
                    Chờ xử lý
                </button>
                <button
                    className={`btn ${activeSection === 'delayed' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveSection('delayed')}
                >
                    Chậm trễ
                </button>
                <button
                    className={`btn ${activeSection === 'processed' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveSection('processed')}
                >
                    Đã xử lý
                </button>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Độ ưu tiên</th>
                            <th>Địa điểm</th>
                            <th>Trang thiết bị</th>
                            <th>Người phụ trách</th>
                            <th>Ghi chú</th>
                            <th>Thời gian</th>
                            <th>Trạng thái xử lý</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data[activeSection]?.length ? (
                            data[activeSection].map((item) => (
                                <tr key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                                    <td>{item.id}</td>
                                    <td>{item.priority}</td>
                                    <td>{item.location}</td>
                                    <td>{item.equipment}</td>
                                    <td>{item.assignee}</td>
                                    <td>{item.note}</td>
                                    <td>{item.time}</td>
                                    <td>{item.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="text-center">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
      {selectedItem && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết báo cáo</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedItem.id}</p>
                <p><strong>Độ ưu tiên:</strong> {selectedItem.priority}</p>
                <p><strong>Địa điểm:</strong> {selectedItem.location}</p>
                <p><strong>Trang thiết bị:</strong> {selectedItem.equipment}</p>
                <p><strong>Ghi chú:</strong> {selectedItem.note}</p>
                <p><strong>Thời gian:</strong> {selectedItem.time}</p>
                <p><strong>Trạng thái xử lý:</strong> {selectedItem.status}</p>
                <div className="mb-3">
                  <label htmlFor="assigneeSelect" className="form-label"><strong>Người phụ trách:</strong></label>
                  {selectedItem.status === 'Processed' ? (
                    <p>{selectedItem.assignee}</p>
                  ) : (
                    <select
                      id="assigneeSelect"
                      className="form-select"
                      value={selectedAssignee}
                      onChange={handleAssigneeChange}
                    >
                      {executorsPool[selectedItem.location]?.map((executor) => (
                        <option key={executor} value={executor}>
                          {executor}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                {selectedItem.status !== 'Processed' && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => alert(`Assignee changed to ${selectedAssignee}`)}
                  >
                    Save Changes
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

export default ManagerReport;