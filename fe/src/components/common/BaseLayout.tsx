import { Outlet } from 'react-router-dom';
import Header from '../header/Header';

interface BaseLayoutProps {
    className?: string;
}

function BaseLayout(props: BaseLayoutProps) {
    let customClass = props.className ? props.className : "";
    return (
        <div className={"w-100 h-100 position-absolute overflow-hidden d-flex main-bg" + customClass}>
            <div className='position-relative'>
                <Header />
            </div>
            <div className="flex-fill position-relative h-100 overflow-hidden mt-5 pt-3 px-3">
                <Outlet />
            </div>
        </div>
    );
}

export default BaseLayout;