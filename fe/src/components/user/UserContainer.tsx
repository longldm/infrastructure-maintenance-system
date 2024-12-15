import { useState } from 'react';
import CreateReport from './createReport/CreateReport';
import RateReport from './rateReport/RateReport';

function UserContainer() {
    const [activeSection, setActiveSection] = useState<string>('section1');


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
                            Tạo báo cáo sự cố
                        </button>
                        <button
                            className={`btn w-100 mb-2 ${activeSection === 'section2' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setActiveSection('section2')}
                        >
                            Đánh giá xử lý sự cố
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="col-9 p-4">
                        {activeSection === 'section1' && (
                            <div>
                                <h3>Tạo báo cáo</h3>
                                <CreateReport />
                            </div>
                        )}
                        
                        {activeSection === 'section2' && (
                            <div>
                                <h3>Đánh giá xử lý sự cố</h3>
                                <RateReport />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserContainer;