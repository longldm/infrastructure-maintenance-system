import { useEffect, useState } from "react";
import { IAssignJobPayload, IReportItem } from "../../../types/Report";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { assignJobRequest } from "./managerApi";

function ManagerReport() {
  const dispatch = useAppDispatch()
  const reportList = useAppSelector(store => store.manager.reportList)
  const supervisorList = useAppSelector(store => store.manager.supervisorList)
  const currentUser = useAppSelector(store => store.auth.currentUser)

  // report list
  const pendingList = reportList.filter(item => item.status === 'OPEN');
  const onGoingList = reportList.filter(item => item.status === 'IN_PROGRESS');
  const processedList = reportList.filter(item => item.status === 'RESOLVED');

  const [activeSection, setActiveSection] = useState<string>('pending');
  const [selectedItem, setSelectedItem] = useState<IReportItem | null>(null);
  const [selectedAssignee, setSelectedAssignee] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const reportsPerPage = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSection])

  const handleRowClick = (item: IReportItem) => {
    setSelectedItem(item);
    setSelectedAssignee(item.assigneeId);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleAssigneeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAssignee(event.target.value);
  };

  const assignJob = () => {
    // TODO: Implement assign job logic
    const payload: IAssignJobPayload = {
      id: selectedItem!.id.toString(),
      accountId: currentUser.id,
      assignedSupervisorId: selectedAssignee,
      stage: 'IN_PROGRESS'
    };
    dispatch(assignJobRequest(payload));
    closeModal()
  };

  // Dynamically get the current list based on active section
  const data: Record<string, IReportItem[]> = {
    pending: pendingList,
    ongoing: onGoingList,
    processed: processedList
  };

  const totalReports = data[activeSection]?.length || 0;
  const totalPages = Math.ceil(totalReports / reportsPerPage);

  // Sort the data based on selected column and order
  const sortedReports = [...data[activeSection] || []].sort((a, b) => {
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

  const getSupervisorName = (id: string) => {
    const supervisor = supervisorList.find(supervisor => supervisor.id == id);
    return (supervisor ? supervisor.lastName + ' ' + supervisor.firstName : '');
  }

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
              <th onClick={() => handleSort('assignee')}>Người phụ trách </th>
              <th onClick={() => handleSort('time')}>Thời gian </th>
              {/* <th>Trạng thái xử lý</th> */}
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
                  <td>
                    {item.assigneeId === '' ? 'Chưa phân công' : getSupervisorName(item.assigneeId)}
                  </td>
                  <td>{item.time}</td>
                  {/* <td>{item.status}</td> */}
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
                {/* <p><strong>Độ ưu tiên:</strong> {selectedItem.priority}</p> */}
                <p><strong>Địa điểm:</strong> {selectedItem.location}</p>
                {/* <p><strong>Trang thiết bị:</strong> {selectedItem.equipment}</p> */}
                <p><strong>Ghi chú:</strong> {selectedItem.note}</p>
                <p><strong>Thời gian:</strong> {selectedItem.time}</p>
                <p><strong>Trạng thái xử lý:</strong> {getCurrentStatus(selectedItem.status)}</p>
                <div className="mb-3">
                  <label htmlFor="assigneeSelect" className="form-label"><strong>Người phụ trách:</strong></label>
                  {selectedItem.status === 'RESOLVED' ? (
                    <p>{getSupervisorName(selectedItem.assigneeId)}</p>
                  ) : (
                    <select
                      id="assigneeSelect"
                      className="form-select"
                      value={selectedAssignee}
                      onChange={handleAssigneeChange}
                    >
                      <option value=""></option> 
                      {supervisorList.map((executor) => (
                        <option key={executor.id} value={executor.id}>
                          {executor.firstName + " " + executor.lastName}
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
                    onClick={assignJob}
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
}

export default ManagerReport;