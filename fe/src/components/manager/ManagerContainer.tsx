import { useEffect, useLayoutEffect, useState } from "react";
import ManagerReport from "./manageReport/ManageReport";
import Statistic from "./statistic/Statistic";
import Response from "./response/Response";
import { IGetALlReportPayload } from "../../types/Report";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAllReport, getAllUser } from "./manageReport/managerApi";
import { getUserInfo } from "../auth/loginApi";
import { showAlert } from "../../utils/showAlert";

function ManagerContainer() {
    const dispatch = useAppDispatch()
    const [activeSection, setActiveSection] = useState<string>('section1');
    const currentUser = useAppSelector(store => store.auth.currentUser)
    const [currentUserId, setCurrentUserId] = useState<string>('');

    useLayoutEffect(() => {
        const payload: IGetALlReportPayload = {
            accountId: currentUser.id
        }
        dispatch(getUserInfo())
        dispatch(getAllReport(payload))
    }, [currentUserId])

    useLayoutEffect(() => {
        dispatch(getAllUser())
    }, [])

    useLayoutEffect(() => {
        if (currentUser && currentUser.id !== currentUserId) {
            setCurrentUserId(currentUser.id)
        }
    }, [currentUser])

    return (
        <>
            <div className="container-fluid vh-100">
                <div className="row h-100">
                    {/* Menu Bar */}
                    <div className="col-3 bg-light border-end p-3">
                        {/* <h4>Menu</h4> */}
                        <button
                            className={`btn w-100 mb-2 ${activeSection === 'section1' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setActiveSection('section1')}
                        >
                            Xử lý báo cáo
                        </button>
                        <button
                            className={`btn w-100 mb-2 ${activeSection === 'section2' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setActiveSection('section2')}
                        >
                            Thống kê
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="col-9 p-4">
                        {activeSection === 'section1' && (
                            <div>
                                <h3>Xử lý báo cáo</h3>
                                <ManagerReport />
                            </div>
                        )}
                        {activeSection === 'section2' && (
                            <div>
                                <h3>Thống kê</h3>
                                <Statistic />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManagerContainer;