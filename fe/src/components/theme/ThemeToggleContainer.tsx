import * as React from 'react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../../hooks/useTheme';


function ThemeToggleContainer() {
    const [storedTheme, setStoredTheme] = useTheme();

    return (
        <ThemeToggle
            theme={storedTheme}
            setTheme={setStoredTheme}
        />
    );
}

export default ThemeToggleContainer;