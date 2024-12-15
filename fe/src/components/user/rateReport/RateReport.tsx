import React, { useState } from 'react';
import { ReportItem } from '../../../types/ReportForRating';

const data: { [key: string]: ReportItem[] } = {
  pending: [
    { id: '1', priority: 'High', location: 'Office A', equipment: 'Printer', assignee: 'John Doe', note: 'Replace cartridge', time: '2024-12-03 10:00 AM', status: 'Pending', ratings: 5 },
    { id: '2', priority: 'Low', location: 'Office B', equipment: 'Laptop', assignee: 'Jane Smith', note: 'Repair screen', time: '2024-12-01 9:00 AM', status: 'Pending', ratings: 3 },
    { id: '3', priority: 'Medium', location: 'Office C', equipment: 'Projector', assignee: 'Tom Johnson', note: 'Clean lens', time: '2024-12-02 11:00 AM', status: 'Pending', ratings: 4 },
    { id: '4', priority: 'High', location: 'Office A', equipment: 'Scanner', assignee: 'Alice Smith', note: 'Replace toner', time: '2024-12-04 1:00 PM', status: 'Pending', ratings: 5 },
    { id: '5', priority: 'Low', location: 'Office B', equipment: 'Monitor', assignee: 'Michael Brown', note: 'Calibrate screen', time: '2024-12-05 9:00 AM', status: 'Pending', ratings: 3 },
    { id: '6', priority: 'High', location: 'Office C', equipment: 'Desktop', assignee: 'Emily Davis', note: 'Check power supply', time: '2024-12-06 10:00 AM', status: 'Pending', ratings: 5 },
    { id: '7', priority: 'Medium', location: 'Office A', equipment: 'Air conditioner', assignee: 'John Doe', note: 'Clean filter', time: '2024-12-03 2:00 PM', status: 'Pending', ratings: 4 },
    { id: '8', priority: 'Low', location: 'Office B', equipment: 'Keyboard', assignee: 'Jane Smith', note: 'Replace keys', time: '2024-12-02 4:00 PM', status: 'Pending', ratings: 3 },
    { id: '9', priority: 'High', location: 'Office C', equipment: 'Laptop', assignee: 'Tom Johnson', note: 'Upgrade RAM', time: '2024-12-01 10:00 AM', status: 'Pending', ratings: 5 },
    { id: '10', priority: 'Medium', location: 'Office A', equipment: 'Phone', assignee: 'Alice Smith', note: 'Check network', time: '2024-12-04 3:00 PM', status: 'Pending', ratings: 4 },
    { id: '11', priority: 'Low', location: 'Office B', equipment: 'Projector', assignee: 'Michael Brown', note: 'Calibrate image', time: '2024-12-03 5:00 PM', status: 'Pending', ratings: 3 },
    { id: '12', priority: 'High', location: 'Office C', equipment: 'Printer', assignee: 'Emily Davis', note: 'Refill ink', time: '2024-12-06 8:00 AM', status: 'Pending', ratings: 5 },
    { id: '13', priority: 'Medium', location: 'Office A', equipment: 'Monitor', assignee: 'John Doe', note: 'Adjust brightness', time: '2024-12-02 11:30 AM', status: 'Pending', ratings: 4 },
    { id: '14', priority: 'Low', location: 'Office B', equipment: 'Speaker', assignee: 'Jane Smith', note: 'Fix audio output', time: '2024-12-01 8:00 PM', status: 'Pending', ratings: 3 },
    { id: '15', priority: 'High', location: 'Office C', equipment: 'Camera', assignee: 'Tom Johnson', note: 'Replace battery', time: '2024-12-05 10:00 AM', status: 'Pending', ratings: 5 },
    { id: '16', priority: 'Low', location: 'Office A', equipment: 'Microphone', assignee: 'Alice Smith', note: 'Test connection', time: '2024-12-04 2:30 PM', status: 'Pending', ratings: 3 },
    { id: '17', priority: 'High', location: 'Office B', equipment: 'Fan', assignee: 'Michael Brown', note: 'Oil motor', time: '2024-12-03 7:00 AM', status: 'Pending', ratings: 4 },
    { id: '18', priority: 'Medium', location: 'Office C', equipment: 'Laptop', assignee: 'Emily Davis', note: 'Upgrade OS', time: '2024-12-06 9:30 AM', status: 'Pending', ratings: 4 },
    { id: '19', priority: 'Low', location: 'Office A', equipment: 'Server', assignee: 'John Doe', note: 'Check storage', time: '2024-12-02 8:00 AM', status: 'Pending', ratings: 3 },
    { id: '20', priority: 'High', location: 'Office B', equipment: 'Tablet', assignee: 'Jane Smith', note: 'Check connectivity', time: '2024-12-01 12:00 PM', status: 'Pending', ratings: 4 },
    { id: '21', priority: 'Low', location: 'Office C', equipment: 'Router', assignee: 'Tom Johnson', note: 'Replace cables', time: '2024-12-03 3:30 PM', status: 'Pending', ratings: 3 },
    { id: '22', priority: 'High', location: 'Office A', equipment: 'Light', assignee: 'Alice Smith', note: 'Replace bulb', time: '2024-12-04 5:00 PM', status: 'Pending', ratings: 5 },
    { id: '23', priority: 'Medium', location: 'Office B', equipment: 'Refrigerator', assignee: 'Michael Brown', note: 'Check cooling', time: '2024-12-02 2:00 PM', status: 'Pending', ratings: 4 },
    { id: '24', priority: 'Low', location: 'Office C', equipment: 'Lock', assignee: 'Emily Davis', note: 'Lubricate lock', time: '2024-12-05 11:00 AM', status: 'Pending', ratings: 3 },
    { id: '25', priority: 'High', location: 'Office A', equipment: 'Desk', assignee: 'John Doe', note: 'Adjust height', time: '2024-12-03 12:00 PM', status: 'Pending', ratings: 5 },
    { id: '26', priority: 'Medium', location: 'Office B', equipment: 'Couch', assignee: 'Jane Smith', note: 'Fix leg', time: '2024-12-01 2:30 PM', status: 'Pending', ratings: 4 },
    { id: '27', priority: 'Low', location: 'Office C', equipment: 'Whiteboard', assignee: 'Tom Johnson', note: 'Clean surface', time: '2024-12-06 7:00 AM', status: 'Pending', ratings: 3 },
    { id: '28', priority: 'High', location: 'Office A', equipment: 'Fan', assignee: 'Alice Smith', note: 'Replace blades', time: '2024-12-04 9:00 AM', status: 'Pending', ratings: 5 },
    { id: '29', priority: 'Low', location: 'Office B', equipment: 'Table', assignee: 'Michael Brown', note: 'Reassemble frame', time: '2024-12-05 1:00 PM', status: 'Pending', ratings: 3 },
    { id: '30', priority: 'Medium', location: 'Office C', equipment: 'Chair', assignee: 'Emily Davis', note: 'Fix armrest', time: '2024-12-03 6:00 PM', status: 'Pending', ratings: 4 },
    { id: '31', priority: 'High', location: 'Office A', equipment: 'Projector', assignee: 'John Doe', note: 'Adjust settings', time: '2024-12-02 12:00 PM', status: 'Pending', ratings: 5 },
    { id: '32', priority: 'Low', location: 'Office B', equipment: 'Phone', assignee: 'Jane Smith', note: 'Install app', time: '2024-12-04 6:00 PM', status: 'Pending', ratings: 3 },
    { id: '33', priority: 'Medium', location: 'Office C', equipment: 'Monitor', assignee: 'Tom Johnson', note: 'Check HDMI port', time: '2024-12-01 3:00 PM', status: 'Pending', ratings: 4 },
    { id: '34', priority: 'High', location: 'Office A', equipment: 'Laptop', assignee: 'Alice Smith', note: 'Install software', time: '2024-12-02 10:00 AM', status: 'Pending', ratings: 5 },
    { id: '35', priority: 'Low', location: 'Office B', equipment: 'Printer', assignee: 'Michael Brown', note: 'Refill paper', time: '2024-12-05 8:00 AM', status: 'Pending', ratings: 3 }
  ],
  ongoing: [
    { id: '36', priority: 'Low', location: 'Office B', equipment: 'Printer', assignee: 'Michael Brown', note: 'Refill paper', time: '2024-12-05 8:00 AM', status: 'Ongoing', ratings: 3 }
  ],
  processed: [
    { id: '37', priority: 'Low', location: 'Office B', equipment: 'Printer', assignee: 'Michael Brown', note: 'Refill paper', time: '2024-12-05 8:00 AM', status: 'Processed', ratings: 3 }
  ]
};


function RateReport() {
  const [activeSection, setActiveSection] = useState<string>('pending');
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [ratings, setRatings] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const reportsPerPage = 10;

  const handleRowClick = (item: ReportItem) => {
    setSelectedReport(item);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  const handleReportClick = (report: ReportItem) => {
    setSelectedReport(report);
    setRatings(report.ratings);
  };

  const totalReports = data[activeSection]?.length || 0;
  const totalPages = Math.ceil(totalReports / reportsPerPage);

  // Sort the data based on selected column and order
  const sortedReports = [...data[activeSection] || []].sort((a, b) => {
    const aValue = a[sortColumn as keyof ReportItem];
    const bValue = b[sortColumn as keyof ReportItem];

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Slice the data for the current page
  const currentReports = sortedReports.slice((currentPage - 1) * reportsPerPage, currentPage * reportsPerPage);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };


  const handleRateClick = () => {
    if (selectedReport) {
      const updatedReports = data[activeSection]?.map((report) => {
        if (report.id === selectedReport.id) {
          return { ...report, ratings };
        }
        return report;
      });
      data[activeSection] = updatedReports as ReportItem[];
    }
  };




  return (
    <div className="container mt-4">
      {/* Phân loại báo cáo */}
      <div className="btn-group mb-3">
      <button
        className={`btn ${activeSection === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setActiveSection('pending')}
      >
        Chờ xử lý
      </button>
      <button
        className={`btn ${activeSection === 'ongoing' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setActiveSection('ongoing')}
      >
        Đang xử lý
      </button>
      <button
        className={`btn ${activeSection === 'processed' ? 'btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setActiveSection('processed')}
      >
        Đã xử lý
      </button>
      </div>

      {/* Bảng báo cáo có sắp xếp */}
      <div className="table-responsive">
      <table className="table table-bordered">
        <thead className="table-light">
        <tr>
          <th onClick={() => handleSort('id')}>ID {sortColumn === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th onClick={() => handleSort('priority')}>Độ ưu tiên {sortColumn === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th onClick={() => handleSort('location')}>Địa điểm {sortColumn === 'location' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th onClick={() => handleSort('equipment')}>Trang thiết bị {sortColumn === 'equipment' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th onClick={() => handleSort('assignee')}>Người phụ trách {sortColumn === 'assignee' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th>Ghi chú</th>
          <th onClick={() => handleSort('time')}>Thời gian {sortColumn === 'time' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
          <th>Trạng thái xử lý</th>
          <th onClick={() => handleSort('ratings')}>Đánh giá {sortColumn === 'ratings' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
        </tr>
        </thead>
        <tbody>
        {currentReports.length ? (
          currentReports.map((report) => (
          <tr key={report.id} onClick={() => handleReportClick(report)} style={{ cursor: 'pointer' }}>
            <td>{report.id}</td>
            <td>{report.priority}</td>
            <td>{report.location}</td>
            <td>{report.equipment}</td>
            <td>{report.assignee}</td>
            <td>{report.note}</td>
            <td>{report.time}</td>
            <td>{report.status}</td>
            <td>{report.ratings}</td>
          </tr>
          ))
        ) : (
          <tr>
          <td colSpan={9} className="text-center">
            No data available
          </td>
          </tr>
        )}
        </tbody>
      </table>
      </div>
      
      {/* Pagination Controls */}
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

      {/* Chọn một báo cáo từ bảng */}
      {selectedReport && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Chi tiết báo cáo</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {selectedReport.id}</p>
                <p><strong>Độ ưu tiên:</strong> {selectedReport.priority}</p>
                <p><strong>Địa điểm:</strong> {selectedReport.location}</p>
                <p><strong>Trang thiết bị:</strong> {selectedReport.equipment}</p>
                <p><strong>Người phụ trách:</strong> {selectedReport.assignee}</p>
                <p><strong>Ghi chú:</strong> {selectedReport.note}</p>
                <p><strong>Thời gian:</strong> {selectedReport.time}</p>
                <p><strong>Trạng thái xử lý:</strong> {selectedReport.status}</p>
                <p><strong>Đánh giá:</strong> {ratings !== null ? ratings : 'No rating'}</p>
                <button className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#rateReportModal">Đánh giá</button>
                {/* Modal đánh giá báo cáo */}
                {/* TODO: fix Modal.getInstance returns null */}
                <div className="modal fade" id="rateReportModal" tabIndex={-1} role="dialog" aria-labelledby="rateReportModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="rateReportModalLabel">Đánh giá</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <p>Đánh giá từ 1 đến 5:</p>
                        <input
                          type="range"
                          className="form-range"
                          min="1"
                          max="5"
                          value={ratings || 1}
                          onChange={(e) => setRatings(parseInt(e.target.value, 10))}
                        />
                        <div className="d-flex justify-content-between">
                          <span>1</span>
                          <span>2</span>
                          <span>3</span>
                          <span>4</span>
                          <span>5</span>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleRateClick}>Xác nhận</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default RateReport;