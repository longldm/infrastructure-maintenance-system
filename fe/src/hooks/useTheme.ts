import * as React from 'react';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { ThemeMode} from "../components/theme/themeSlice";
import { setActiveTheme } from "../components/theme/themeSlice";
import { useLocalStorage } from "./useLocalStorage";

export const useTheme = () => {
    const dispatch = useAppDispatch();

    /** 
     * Actual theme to apply to the app. 
     * If storedTheme is "auto" then activeTheme will be "light" or "dark" depending on system
     */
    const activeTheme = useAppSelector(store => store.theme.activeTheme);
    /** Get theme config from the localstorage, default is 'auto'. */
    const [storedTheme, setStoredTheme] = useLocalStorage<ThemeMode>('theme', 'auto');


    React.useLayoutEffect(() => {
        let theme: ThemeMode = storedTheme;
        if (storedTheme === 'auto') {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = "dark";
            }
            else {
                theme = "light";
            }
        }
        dispatch(setActiveTheme(theme));
    }, [dispatch, storedTheme]);


    React.useLayoutEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', activeTheme);
    }, [activeTheme]);


    React.useEffect(() => {
        const handleColorSchemeChanged = () => {
            if (storedTheme === 'auto') {
                let theme: ThemeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
                dispatch(setActiveTheme(theme));
            }
        };
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleColorSchemeChanged);
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', handleColorSchemeChanged);
        };
    }, [dispatch, storedTheme]);

    return [storedTheme, setStoredTheme] as [ThemeMode, (val: ThemeMode) => void];
};