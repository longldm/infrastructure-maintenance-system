import { Tooltip } from 'bootstrap';
import * as React from 'react';
import { ThemeMode } from './themeSlice';

const iconThemeLight = (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
        <path d="M12 8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8ZM8 0C8.13261 0 8.25979 0.0526784 8.35355 0.146447C8.44732 0.240215 8.5 0.367392 8.5 0.5V2.5C8.5 2.63261 8.44732 2.75979 8.35355 2.85355C8.25979 2.94732 8.13261 3 8 3C7.86739 3 7.74021 2.94732 7.64645 2.85355C7.55268 2.75979 7.5 2.63261 7.5 2.5V0.5C7.5 0.367392 7.55268 0.240215 7.64645 0.146447C7.74021 0.0526784 7.86739 0 8 0ZM8 13C8.13261 13 8.25979 13.0527 8.35355 13.1464C8.44732 13.2402 8.5 13.3674 8.5 13.5V15.5C8.5 15.6326 8.44732 15.7598 8.35355 15.8536C8.25979 15.9473 8.13261 16 8 16C7.86739 16 7.74021 15.9473 7.64645 15.8536C7.55268 15.7598 7.5 15.6326 7.5 15.5V13.5C7.5 13.3674 7.55268 13.2402 7.64645 13.1464C7.74021 13.0527 7.86739 13 8 13ZM16 8C16 8.13261 15.9473 8.25979 15.8536 8.35355C15.7598 8.44732 15.6326 8.5 15.5 8.5H13.5C13.3674 8.5 13.2402 8.44732 13.1464 8.35355C13.0527 8.25979 13 8.13261 13 8C13 7.86739 13.0527 7.74021 13.1464 7.64645C13.2402 7.55268 13.3674 7.5 13.5 7.5H15.5C15.6326 7.5 15.7598 7.55268 15.8536 7.64645C15.9473 7.74021 16 7.86739 16 8ZM3 8C3 8.13261 2.94732 8.25979 2.85355 8.35355C2.75979 8.44732 2.63261 8.5 2.5 8.5H0.5C0.367392 8.5 0.240215 8.44732 0.146447 8.35355C0.0526784 8.25979 0 8.13261 0 8C0 7.86739 0.0526784 7.74021 0.146447 7.64645C0.240215 7.55268 0.367392 7.5 0.5 7.5H2.5C2.63261 7.5 2.75979 7.55268 2.85355 7.64645C2.94732 7.74021 3 7.86739 3 8ZM13.657 2.343C13.7507 2.43676 13.8034 2.56392 13.8034 2.6965C13.8034 2.82908 13.7507 2.95624 13.657 3.05L12.243 4.465C12.1965 4.51142 12.1413 4.54823 12.0806 4.57333C12.0199 4.59843 11.9548 4.61132 11.8891 4.61128C11.7565 4.61118 11.6293 4.55839 11.5355 4.4645C11.4891 4.41801 11.4523 4.36284 11.4272 4.30212C11.4021 4.24141 11.3892 4.17634 11.3892 4.11065C11.3893 3.97796 11.4421 3.85075 11.536 3.757L12.95 2.343C13.0438 2.24926 13.1709 2.19661 13.3035 2.19661C13.4361 2.19661 13.5632 2.24926 13.657 2.343ZM4.464 11.536C4.55774 11.6298 4.61039 11.7569 4.61039 11.8895C4.61039 12.0221 4.55774 12.1492 4.464 12.243L3.05 13.657C2.9557 13.7481 2.8294 13.7985 2.6983 13.7973C2.5672 13.7962 2.44179 13.7436 2.34909 13.6509C2.25639 13.5582 2.2038 13.4328 2.20266 13.3017C2.20152 13.1706 2.25192 13.0443 2.343 12.95L3.757 11.536C3.85076 11.4423 3.97792 11.3896 4.1105 11.3896C4.24308 11.3896 4.37024 11.4423 4.464 11.536ZM13.657 13.657C13.5632 13.7507 13.4361 13.8034 13.3035 13.8034C13.1709 13.8034 13.0438 13.7507 12.95 13.657L11.536 12.243C11.4449 12.1487 11.3945 12.0224 11.3957 11.8913C11.3968 11.7602 11.4494 11.6348 11.5421 11.5421C11.6348 11.4494 11.7602 11.3968 11.8913 11.3957C12.0224 11.3945 12.1487 11.4449 12.243 11.536L13.657 12.95C13.7507 13.0438 13.8034 13.1709 13.8034 13.3035C13.8034 13.4361 13.7507 13.5632 13.657 13.657ZM4.464 4.465C4.37024 4.55874 4.24308 4.61139 4.1105 4.61139C3.97792 4.61139 3.85076 4.55874 3.757 4.465L2.343 3.05C2.29524 3.00388 2.25715 2.9487 2.23095 2.8877C2.20474 2.8267 2.19095 2.76109 2.19037 2.6947C2.1898 2.62831 2.20245 2.56247 2.22759 2.50102C2.25273 2.43957 2.28986 2.38375 2.3368 2.3368C2.38375 2.28986 2.43957 2.25273 2.50102 2.22759C2.56247 2.20245 2.62831 2.1898 2.6947 2.19037C2.76109 2.19095 2.8267 2.20474 2.8877 2.23095C2.9487 2.25715 3.00388 2.29524 3.05 2.343L4.464 3.757C4.51056 3.80345 4.54751 3.85862 4.57271 3.91937C4.59792 3.98011 4.61089 4.04523 4.61089 4.111C4.61089 4.17677 4.59792 4.24189 4.57271 4.30263C4.54751 4.36338 4.51056 4.41855 4.464 4.465Z" fill="white" />
    </svg>
);

const iconThemeDark = (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-moon-stars-fill" viewBox="0 0 16 16">
        <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
        <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z" />
    </svg>
);

const iconThemeAuto = (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-circle-half" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
    </svg>
);

interface ThemeToggleProps {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

function ThemeToggle(props: ThemeToggleProps) {
    const themeDropdown = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        const tooltip = new Tooltip(themeDropdown.current!, {
            title: "Toggle theme",
            trigger: "hover",
        });
        return () => tooltip.dispose();
    }, []);

    const getActiveThemeIcon = (theme: ThemeMode) => {
        if (theme === 'light') {
            return iconThemeLight;
        }
        if (theme === 'dark') {
            return iconThemeDark;
        }
        return iconThemeAuto;
    };

    return (
        <div className="dropdown">
            <div
                ref={themeDropdown}
                className="d-flex justify-content-center align-items-center link-light text-decoration-none dropdown-toggle cursor-pointer"
                onClick={() => props.setTheme(props.theme === 'light' ? "dark" : "light")}
            >
                {getActiveThemeIcon(props.theme)}
            </div>
            <ul className="dropdown-menu text-small shadow">
                <li>
                    <button
                        className={`dropdown-item d-flex align-items-center gap-2 ${props.theme === "light" ? "active" : ""}`}
                        onClick={() => props.setTheme("light")}
                    >
                        {iconThemeLight}
                        Light theme
                    </button>
                </li>
                <li>
                    <button
                        className={`dropdown-item d-flex align-items-center gap-2 ${props.theme === "dark" ? "active" : ""}`}
                        onClick={() => props.setTheme("dark")}
                    >
                        {iconThemeDark}
                        Dark theme
                    </button>
                </li>
                <li>
                    <button
                        className={`dropdown-item d-flex align-items-center gap-2 ${props.theme === "auto" ? "active" : ""}`}
                        onClick={() => props.setTheme("auto")}
                    >
                        {iconThemeAuto}
                        Auto
                    </button>
                </li>
            </ul>
        </div >
    );
}

export default ThemeToggle;