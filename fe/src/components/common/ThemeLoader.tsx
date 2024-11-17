import { Outlet } from "react-router";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeLoader() {
    useTheme();
    return <Outlet />;
}