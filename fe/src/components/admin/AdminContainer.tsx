import { useState } from 'react';
import ManageAccount from './manageAccount/ManageAccount';
// import ManageEquipment from './manageEquipment/ManageEquipment';
// import ManageLocation from './manageLocation/ManageLocation';

// function UserContainer() {
//     const [activeSection, setActiveSection] = useState<string>('section1');


//     return (
//         <>
//             <div className="container-fluid vh-100">
//                 <div className="row h-100">
//                     {/* Menu Bar */}
//                     <div className="col-3 bg-light border-end p-3">
//                         {/* <h4>Menu</h4> */}
//                         <button
//                             className={`btn w-100 mb-2 ${activeSection === 'section1' ? 'btn-primary' : 'btn-outline-primary'}`}
//                             onClick={() => setActiveSection('section1')}
//                         >
//                             Quản lý tài khoản
//                         </button>
//                         {/* <button
//                             className={`btn w-100 mb-2 ${activeSection === 'section2' ? 'btn-primary' : 'btn-outline-primary'}`}
//                             onClick={() => setActiveSection('section2')}
//                         >
//                             Quản lý loại sự cố
//                         </button> */}
//                         {/* <button
//                             className={`btn w-100 mb-2 ${activeSection === 'section3' ? 'btn-primary' : 'btn-outline-primary'}`}
//                             onClick={() => setActiveSection('section3')}
//                         >
//                             Quản lý địa điểm
//                         </button> */}

//                     </div>

//                     {/* Content Area */}
//                     <div className="col-9 p-4">
//                         {activeSection === 'section1' && (
//                             <div>
//                                 <h3>Quản lý tài khoản</h3>
//                                 <ManageAccount />
//                             </div>
//                         )}
                        
//                         {/* {activeSection === 'section2' && (
//                             <div>
//                                 <h3>Quản lý loại sự cố</h3>
//                                 <ManageEquipment />
//                             </div>
//                         )} */}

//                         {/* {activeSection === 'section3' && (
//                             <div>
//                                 <h3>Quản lý địa điểm</h3>
//                                 <ManageLocation />
//                             </div>
//                         )} */}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
function UserContainer() {
    const [activeSection, setActiveSection] = useState<string>('section1');

    return (
    <>
        <div className="container-fluid vh-100">
            <div className="row h-100">
                {/* Content Area */}
                <div className="">
                    {activeSection === 'section1' && (
                        <div>
                            <h3>Quản lý tài khoản</h3>
                            <ManageAccount />
                        </div>
                    )}
                    
                    {/* {activeSection === 'section2' && (
                        <div>
                            <h3>Quản lý loại sự cố</h3>
                            <ManageEquipment />
                        </div>
                    )} */}

                    {/* {activeSection === 'section3' && (
                        <div>
                            <h3>Quản lý địa điểm</h3>
                            <ManageLocation />
                        </div>
                    )} */}
                </div>
            </div>
        </div>
    </>
);
}


export default UserContainer;