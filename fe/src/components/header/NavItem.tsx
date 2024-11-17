import * as React from 'react';
import { Tooltip } from 'bootstrap';

interface NavItemProps {
    path?: string;
    label: string;
    children?: React.ReactNode;
    active?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}


const NavItem = (props: NavItemProps) => {

    const itemRef = React.useRef<HTMLLIElement>(null);

    React.useEffect(() => {
        let tooltip = new Tooltip(itemRef.current!, {
            title: props.label,
            placement: 'right',
            trigger: 'hover'
        });
        return () => {
            tooltip.dispose();
        };
    }, [props.label]);

    return (
        <li className="nav-item" ref={itemRef}>
            <button
                className={`nav-link text-light fs-5 my-1 px-0 rounded-0 w-100 ${props.active ? "active" : ""}`}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </li>
    );
};


export default NavItem;