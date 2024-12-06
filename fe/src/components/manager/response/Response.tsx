import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ResponseItem {
    id: string;
    location: string;
    equipment: string;
    assignee: string;
    time: string;
    feedback: string;
    priority: string;
    status: string;
    note: string;
}

const responseList: ResponseItem[] = [
    {
        id: '1',
        location: 'Office A',
        equipment: 'Printer',
        assignee: 'John Doe',
        time: '2024-12-03 10:00 AM',
        feedback: 'Needs urgent repair',
        priority: 'High',
        status: 'Processed',
        note: 'Printer is not working',
    },
    {
        id: '2',
        location: 'Office B',
        equipment: 'Laptop',
        assignee: 'Jane Smith',
        time: '2024-12-01 9:00 AM',
        feedback: 'Repaired successfully',
        priority: 'Low',
        status: 'Processed',
        note: 'Screen replacement needed',
    },
    {
        id: '3',
        location: 'Office C',
        equipment: 'Projector',
        assignee: 'Tom Johnson',
        time: '2024-12-02 11:00 AM',
        feedback: 'Maintenance completed',
        priority: 'Medium',
        status: 'Processed',
        note: 'Lens cleaning required',
    },
];

function Response() {
    const [selectedItem, setSelectedItem] = useState<ResponseItem | null>(null);

    const handleRowClick = (item: ResponseItem) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    const reOpenReport = () => {
        // TODO: Reopen report
    }

    return (
        <div className="container mt-4">
            {/* Table */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Địa điểm</th>
                            <th>Trang thiết bị</th>
                            <th>Người phụ trách</th>
                            <th>Thời gian</th>
                            <th>Phản hồi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseList.map((item) => (
                            <tr
                                key={item.id}
                                onClick={() => handleRowClick(item)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{item.id}</td>
                                <td>{item.location}</td>
                                <td>{item.equipment}</td>
                                <td>{item.assignee}</td>
                                <td>{item.time}</td>
                                <td>{item.feedback}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedItem && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Xử lý phản hồi</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>ID:</strong> {selectedItem.id}</p>
                                <p><strong>Độ ưu tiên:</strong> {selectedItem.priority}</p>
                                <p><strong>Địa điểm:</strong> {selectedItem.location}</p>
                                <p><strong>Trang thiết bị:</strong> {selectedItem.equipment}</p>
                                <p><strong>Thời gian:</strong> {selectedItem.time}</p>
                                <p><strong>Ghi chú:</strong> {selectedItem.note}</p>
                                <p><strong>Trạng thái xử lý:</strong> {selectedItem.status}</p>
                                <p><strong>Người phụ trách:</strong> {selectedItem.assignee}</p>
                                <p><strong>Phản hồi:</strong> {selectedItem.feedback}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={closeModal}
                                >
                                    Xác nhận hoàn thành
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        alert(`Tạo lại báo cáo for ID: ${selectedItem.id}`)
                                    }
                                >
                                    Tạo lại báo cáo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Response;