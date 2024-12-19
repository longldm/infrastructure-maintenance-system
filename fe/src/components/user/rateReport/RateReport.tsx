import React, { useEffect, useState } from 'react';
import { IReportItem } from '../../../types/Report';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getUserInfo } from '../../auth/loginApi';



const data: { [key: string]: IReportItem[] } = {
  pending: [
    { id: 1, reporterId: 'R1', location: 'Office A', assigneeId: 'A1', note: 'Replace cartridge', time: '2024-12-03 10:00 AM', status: 'OPEN' },
    { id: 2, reporterId: 'R2', location: 'Office B', assigneeId: 'A2', note: 'Repair screen', time: '2024-12-01 9:00 AM', status: 'OPEN' },
    { id: 3, reporterId: 'R3', location: 'Office C', assigneeId: 'A3', note: 'Clean lens', time: '2024-12-02 11:00 AM', status: 'OPEN' },
    { id: 4, reporterId: 'R4', location: 'Office A', assigneeId: 'A4', note: 'Replace toner', time: '2024-12-04 1:00 PM', status: 'OPEN' },
    { id: 5, reporterId: 'R5', location: 'Office B', assigneeId: 'A5', note: 'Calibrate screen', time: '2024-12-05 9:00 AM', status: 'OPEN' }
  ],
  ongoing: [
    { id: 6, reporterId: 'R6', location: 'Office C', assigneeId: 'A6', note: 'Check power supply', time: '2024-12-06 10:00 AM', status: 'IN_PROGRESS' }
  ],
  processed: [
    { id: 7, reporterId: 'R7', location: 'Office A', assigneeId: 'A7', note: 'Clean filter', time: '2024-12-03 2:00 PM', status: 'RESOLVED' }
  ]
};

function RateReport() {
  const dispatch = useAppDispatch();
  const reportedList = useAppSelector(store => store.reporter.reportedList);
  const currentUser = useAppSelector(store => store.auth.currentUser);
  const [activeSection, setActiveSection] = useState<string>('pending');
  const [selectedReport, setSelectedReport] = useState<IReportItem | null>(null);
  const [ratings, setRatings] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const reportsPerPage = 10;
  const [myReportedList, setMyReportedList] = useState<IReportItem[]>([]);


  useEffect(() => {
    setMyReportedList(reportedList.filter(report => report.reporterId === currentUser.id));
  }, [ reportedList ]);

  const handleRowClick = (item: IReportItem) => {
    setSelectedReport(item);
  };

  const closeModal = () => {
    setSelectedReport(null);
  };

  const getCurrentStatus = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'Chờ xử lý';
      case 'IN_PROGRESS':
        return 'Đang xử lý';
      case 'RESOLVED':
        return 'Đã xử lý';
      default:
        return '';
    }
  }
  // const handleReportClick = (report: IReportItem) => {
  //   setSelectedReport(report);
  //   setRatings(report.ratings);
  // };

  const totalReports = myReportedList.length;
  const totalPages = Math.ceil(totalReports / reportsPerPage);

  // Sort the data based on selected column and order
  const sortedReports = [...myReportedList].sort((a, b) => {
    const aValue = a[sortColumn as keyof IReportItem];
    const bValue = b[sortColumn as keyof IReportItem];

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


  // const handleRateClick = () => {
  //   if (selectedReport) {
  //     const updatedReports = data[activeSection]?.map((report) => {
  //       if (report.id === selectedReport.id) {
  //         return { ...report, ratings };
  //       }
  //       return report;
  //     });
  //     data[activeSection] = updatedReports as IReportItem[];
  //   }
  // };






  return (
    <div className="container mt-4">
      {/* Phân loại báo cáo */}
      {/* <div className="btn-group mb-3">
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
      </div> */}

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th onClick={() => handleSort('id')}>ID</th>
              {/* <th onClick={() => handleSort('priority')}>Độ ưu tiên {sortColumn === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}</th> */}
              <th onClick={() => handleSort('location')}>Địa điểm </th>
              {/* <th onClick={() => handleSort('equipment')}>Trang thiết bị {sortColumn === 'equipment' && (sortOrder === 'asc' ? '↑' : '↓')}</th> */}
              <th>Ghi chú</th>
              <th onClick={() => handleSort('time')}>Thời gian </th>
              {/* <th onClick={() => handleSort('assignee')}>Người phụ trách </th> */}
              <th>Trạng thái xử lý</th>
            </tr>
          </thead>
          <tbody>
            {currentReports.length ? (
              currentReports.map((item) => (
                <tr key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: 'pointer' }}>
                  <td>{item.id}</td>
                  {/* <td>{item.priority}</td> */}
                  <td>{item.location}</td>
                  {/* <td>{item.equipment}</td> */}
                  <td>{item.note}</td>
                  {/* <td>
                    {item.assigneeId === '' ? 'Chưa phân công' : getSupervisorName(item.assigneeId)}
                  </td> */}
                  <td>{item.time}</td>
                  <td>{getCurrentStatus(item.status)}</td>
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
                {/* <p><strong>Độ ưu tiên:</strong> {selectedReport.priority}</p> */}
                <p><strong>Địa điểm:</strong> {selectedReport.location}</p>
                {/* <p><strong>Trang thiết bị:</strong> {selectedReport.equipment}</p> */}
                {/* <p><strong>Người phụ trách:</strong> {selectedReport.assignee}</p> */}
                <p><strong>Ghi chú:</strong> {selectedReport.note}</p>
                <p><strong>Thời gian:</strong> {selectedReport.time}</p>
                <p><strong>Trạng thái xử lý:</strong>{selectedReport.status}</p>

                {/* <p><strong>Đánh giá:</strong> {ratings !== null ? ratings : 'No rating'}</p> */}
                {/* <button className="btn btn-primary mt-2" data-bs-toggle="modal" data-bs-target="#rateReportModal">Đánh giá</button> */}
                {/* Modal đánh giá báo cáo */}
                {/* TODO: fix Modal.getInstance returns null */}
                {/* <div className="modal fade" id="rateReportModal" tabIndex={-1} role="dialog" aria-labelledby="rateReportModalLabel" aria-hidden="true">
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
                </div> */}

              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default RateReport;