import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import './Header.scss';
import { ThemeToggleContainer } from "../theme";
import { logout } from "../auth/authSlice";

const Header = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((store) => store.auth.currentUser);

    const onSignout = () => {
        dispatch(logout())
        navigate('/login');
    }

    return (
        <div className="navbar navbar-expand-lg bg-secondary fixed-top px-3 justify-content-end">
            <div className="d-flex align-items-center justify-content-end">
                {/* Display Username */}
                {currentUser && (
                    <span className="me-3 text-white">
                        {currentUser.username || "User"}
                    </span>
                )}

                {/* Logout Button */}
                <button
                    className="btn btn-outline-light btn-sm"
                    onClick={onSignout}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                </button>
            </div>
            {/* <div NameName="dropdown">
                <div className="d-flex align-items-center justify-content-center p-3 link-light text-decoration-none dropdown-toggle cursor-pointer" data-bs-toggle="dropdown">
                    <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                </div>
                <ul className="dropdown-menu text-small shadow">
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={onSignout}
                        >
                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                            Đăng xuất
                        </button>
                    </li>
                </ul>
            </div> */}
        </div>
    );
};

export default Header;
