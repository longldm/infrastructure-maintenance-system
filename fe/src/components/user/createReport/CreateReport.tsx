import { ReportItem } from "../../../types/Report";
import React, { useState } from 'react';

function CreateReport() {
    const [location, setLocation] = useState('');
    const [building, setBuilding] = useState('');
    const [room, setRoom] = useState('');
    const [equipment, setEquipment] = useState('');
    const [note, setNote] = useState('');

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocation(prev => name === 'building' ? `${value} ${prev.split(' ')[1] || ''}` : `${prev.split(' ')[0] || ''} ${value}`);
    };

    const handleBuildingChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { value } = e.target;
        setBuilding(value);
    };

    const handleRoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setRoom(value);
    }

    const handleEquipmentChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { value } = e.target;
        setEquipment(value);
    };

    const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        setNote(value);
    }

    const handleCancel = () => {
        // setLocation('');
        setBuilding('');
        setRoom('');
        setEquipment('');
        setNote('');
        // TODO: Reset form fields here

    };

    const handleSubmit = () => {
        // TODO: Handle report submission logic here
    };

    return (
        <div className="container mt-4">
            <div className="mb-3 form-group">
                <label>Địa điểm: </label>
                <div className="mt-2 d-flex">
                    <select className="form-control mr-2" name="building" value = {building || ''} onChange={handleBuildingChange}>
                        <option value="" selected disabled>Tòa nhà</option>
                        <option value="D3">D3</option>
                        <option value="D3-5">D3-5</option>
                        <option value="D5">D5</option>
                        <option value="D6">D6</option>
                        <option value="D7">D7</option>
                        <option value="D8">D8</option>
                        <option value="D9">D9</option>
                    </select>
                    <input 
                        className="form-control ml-2"
                        type="text"
                        name="room"
                        placeholder="Phòng"
                        value = {room || ''}
                        onChange={handleRoomChange} />
                </div>
            </div>
            <div className="mb-3 form-group">
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
            </div>
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