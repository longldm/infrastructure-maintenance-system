import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import './Header.scss';
import { ThemeToggleContainer } from "../theme";

const Header = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const currentUser = useAppSelector((store) => store.auth.currentUser);

    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-3">
                <NavLink to="/view" className="navbar-brand">
                    App Name
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ThemeToggleContainer />
                <div className="dropdown">
                    <div className="d-flex align-items-center justify-content-center p-3 link-light text-decoration-none dropdown-toggle cursor-pointer" data-bs-toggle="dropdown">
                        <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                    </div>
                    <ul className="dropdown-menu text-small shadow">
                        <li>
                            <button
                                className="dropdown-item"
                                // onClick={onSignout}
                            >
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                sign out
                            </button>
                        </li>
                    </ul>
            </div>
        </div>
    );
};

export default Header;
