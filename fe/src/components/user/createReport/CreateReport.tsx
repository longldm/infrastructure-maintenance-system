import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ICreateReportPayload, IReportItem } from "../../../types/Report";
import React, { useEffect, useState } from 'react';
import { createReport } from "./createReportApi";

function CreateReport() {
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(state => state.auth.currentUser); 
    const lectureHallList = useAppSelector(state => state.reporter.lectureHallList);

    // const [location, setLocation] = useState('');
    const [building, setBuilding] = useState('');
    const [floor, setFloor] = useState('');
    const [room, setRoom] = useState('');
    // const [equipment, setEquipment] = useState('');
    const [note, setNote] = useState('');
    const [roomList, setRoomList] = useState<string[]>([]);
    const [floorList, setFloorList] = useState<string[]>([]);
    const [buildingList, setBuildingList] = useState<string[]>([]);

    useEffect(() => {
        const uniqueBuildings = Array.from(new Set(lectureHallList.map((item) => item.lectureHall.building)));
        const uniqueFloors = Array.from(new Set(lectureHallList.filter(item => item.lectureHall.building === building).map((item) => item.lectureHall.floor)));
        const uniqueRooms = Array.from(new Set(lectureHallList.filter(item => item.lectureHall.building === building && item.lectureHall.floor === floor).map((item) => item.lectureHall.room)));
        setBuildingList(uniqueBuildings);
        setFloorList(uniqueFloors);
        setRoomList(uniqueRooms);
        // setBuildingList(lectureHallList.map((item) => item.lectureHall.building));
        // setFloorList(lectureHallList.map((item) => item.lectureHall.floor));
        // setRoomList(lectureHallList.map((item) => item.lectureHall.room));
    }, [lectureHallList, building, floor]);
    

    // const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setLocation(prev => name === 'building' ? `${value} ${prev.split(' ')[1] || ''}` : `${prev.split(' ')[0] || ''} ${value}`);
    // };

    const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { value } = e.target;
        setBuilding(value);
    };

    const handleFloorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFloor(value);
    };
    
    const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setRoom(value);
    };

    // const handleEquipmentChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    //     const { value } = e.target;
    //     setEquipment(value);
    // };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setNote(value);
    };

    const handleCancel = () => {
        // setLocation('');
        setBuilding('');
        setRoom('');
        setFloor('');
        // setEquipment('');
        setNote('');
    };

    const handleSubmit = () => {
        // Ask the user for confirmation
        console.log('button clicked')
        console.log("building: ", building)
        console.log("floor: ", floor)
        console.log("room: ", room)
        const chosenLecturalHallId = lectureHallList.find((item) => item.lectureHall.building === building && item.lectureHall.floor === floor && item.lectureHall.room === room)?.lectureHall.id; 
        // const chosenLecturalHallId = lectureHallList.filter((item) => item.lectureHall.building === building && item.lectureHall.floor === floor && item.lectureHall.room === room); 
        
        console.log("chosenLecturalHallId: ", chosenLecturalHallId)
        console.log("lectureHallList: ", lectureHallList[0].lectureHall.floor)
        if (!chosenLecturalHallId) {
            return;
        }
        console.log("got here");
        

        // Proceed with report submission
        const payload: ICreateReportPayload = {
            reporterId: currentUser.id,
            lectureHall: {
                id: chosenLecturalHallId,
                building: building,
                floor: floor,
                room: room
            },
            details: note,
            priority: 'HIGH',
            critical: true,
            stage: 'OPEN'
        };

        dispatch(createReport(payload));
        alert("Report submitted successfully!");
    };    

    return (
        <div className="container mt-4">
            <div className="mb-3 form-group">
                <label>Địa điểm: </label>
                <div className="mt-2 d-flex">
                    <select className="form-control mr-2" name="building" value = {building || ''} onChange={(e) => setBuilding(e.target.value)}>
                        <option value="" selected disabled>Tòa nhà</option>
                        {buildingList.map((building, index) => (
                            <option key={index} value={building}>{building}</option>
                        ))}
                    </select>
                    <select className="form-control mr-2" name="building" value = {floor || ''} onChange={(e) => setFloor(e.target.value)}>
                        <option value="" selected disabled>Tầng</option>
                        {floorList.map((floor, index) => (
                            <option key={index} value={floor}>{floor}</option>
                        ))}
                    </select>
                    <select className="form-control mr-2" name="building" value = {room || ''} onChange={(e) => setRoom(e.target.value)}>
                        <option value="" selected disabled>Phòng</option>
                        {roomList.map((room, index) => (
                            <option key={index} value={room}>{room}</option>
                        ))}
                    </select>
                </div>
            </div>
            {/* <div className="mb-3 form-group">
                <label>Loại sự cố: </label>
                <select className="mt-2 form-control" value={equipment || ''} onChange={handleEquipmentChange}>
                    <option value="" selected disabled>Chọn loại sự cố</option>
                    <option value="lightings">Đèn</option>
                    <option value="coolings">Điều hòa</option>
                    <option value="furnitures">Bàn ghế</option>
                    <option value="blackboards">Bảng</option>
                    <option value="projectors">Máy chiếu</option>
                    <option value="electricals">Hệ thống điện</option>
                    <option value="infrastructures">Cơ sở hạ tầng (tường nhà, trần nhà, ...)</option>
                </select>
            </div> */}
            <div className="mb-4 form-group">
                <label>Ghi chú: </label>
                <textarea
                    className="mt-2 form-control"
                    rows={5}   // Adjust height
                    placeholder="Ghi chú sự cố (hỏng gì, hỏng như thế nào, ...)"
                    value = {note || ''}
                    onChange={handleNoteChange}
                />
            </div>
            
            <div className="form-group d-flex justify-content-end">
                {/* Nút hủy báo cáo */}
                <button className="btn btn-secondary mr-2" data-bs-toggle="modal" data-bs-target="#cancelReportModal" style={{ marginRight: '5px' }}>Hủy báo cáo</button>
                {/* Modal xác nhận hủy báo cáo */}
                <div className="modal fade" id="cancelReportModal" tabIndex={-1} role="dialog" aria-labelledby="cancelReportModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cancelReportModalLabel">Xác nhận</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chăc chắn muốn hủy báo cáo?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                                <button type="reset" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleCancel}>Có</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Nút tạo báo cáo */}
                <button className="btn btn-primary ml-2" data-bs-toggle="modal" data-bs-target="#createReportModal" style={{ marginLeft: '5px' }}>Tạo báo cáo</button>
                {/* Modal xác nhận tạo báo cáo */}
                <div className="modal fade" id="createReportModal" tabIndex={-1} role="dialog" aria-labelledby="createReportModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="createReportModalLabel">Xác nhận</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn có chăc chắn muốn tạo báo cáo?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Có</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateReport;