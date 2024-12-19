import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IGetALlReportPayload, IReportItem, IUpdateStagePayload } from "../../types/Report";
import { getReportForExecutor, updateReport } from "./executorApi";
import { getUserInfo } from "../auth/loginApi";
import { report } from "process";

const ExecutorContainer = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(store => store.auth.currentUser)
  const reportList = useAppSelector(store => store.executor.reportList)
  const userId = localStorage.getItem('userid');

  const [currentUserId, setCurrentUserId] = useState<string>('');
  const [activeState, setActiveState] = useState<"IN_PROGRESS" | "RESOLVED">("IN_PROGRESS");
  const [selectedTask, setSelectedTask] = useState<IReportItem | null>(null);
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;
  const [currentExecutorReportList, setCurrentExecutorReportList] = useState<IReportItem[]>([]);


  useEffect(() => {
    setCurrentExecutorReportList(reportList.filter(report => report.assigneeId === currentUserId))
  },[reportList])

  useEffect(() => {
    dispatch(getUserInfo())
  }, [dispatch])

  useEffect(() => {
    if (currentUser && currentUser.id !== currentUserId) {
      setCurrentUserId(currentUser.id)
    }
  }, [currentUserId])

  useEffect(() => {
    const id = currentUser?.id? currentUser.id : userId
    if (!id) return
    const payload: IGetALlReportPayload = {
      accountId: id
    }
  
    dispatch(getReportForExecutor(payload))
  }, [currentUserId, dispatch, currentUser.id, userId])

  const handleRowClick = (task: IReportItem) => {
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

  const sortedTasks = (tasks: IReportItem[]) => {
    return [...tasks].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "location") comparison = a.location.localeCompare(b.location);
      if (sortBy === "time") comparison = new Date(a.time).getTime() - new Date(b.time).getTime();
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  const filteredTasks = sortedTasks(currentExecutorReportList.filter((report) => report.status === activeState));
  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const currentTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  const finishReport = () => {
    const payload: IUpdateStagePayload = {
      id: selectedTask!.id.toString(),
      accountId: currentUserId,
      assignedSupervisorId: currentUserId,
      stage: "RESOLVED",
    }

    dispatch(updateReport(payload)) 
    closeModal()
  }

  return (
    <div className="container mt-4">
      <h2>Quản lý công việc</h2>

      {/* Tabs for State */}
      <div className="btn-group mb-3">
        <button
          className={`btn ${activeState === "IN_PROGRESS" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setActiveState("IN_PROGRESS");
            setCurrentPage(1); // Reset pagination
          }}
        >
          Được giao
        </button>
        <button
          className={`btn ${activeState === "RESOLVED" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => {
            setActiveState("RESOLVED");
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
              <th onClick={() => handleHeaderClick("location")} style={{ cursor: "pointer" }}>
                Địa điểm
              </th>
              <th>Ghi chú</th>
              <th onClick={() => handleHeaderClick("time")} style={{ cursor: "pointer" }}>
                Thời gian
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task) => (
              <tr key={task.id} onClick={() => handleRowClick(task)} style={{ cursor: "pointer" }}>
                <td>{task.id}</td>
                <td>{task.location}</td>
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
                <p><strong>Địa điểm:</strong> {selectedTask.location}</p>
                <p><strong>Ghi chú:</strong> {selectedTask.note}</p>
                <p><strong>Thời gian:</strong> {selectedTask.time}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Hủy
                </button>
                {selectedTask.status === "IN_PROGRESS" && (
                  <button type="button" className="btn btn-primary" onClick={finishReport}>
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
