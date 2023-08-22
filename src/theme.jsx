import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color tokens
export const colorTokens = (mode) => ({
    ...(mode === "dark"
        ? {
            black: {
                100: "#d5d7da",
                200: "#abb0b5",
                300: "#81888f",
                400: "#57616a",
                500: "#2d3945",
                600: "#242e37",
                700: "#1b2229",
                800: "#12171c",
                900: "#090b0e"
            },
            indigo: {
                100: "#e1e0e2",
                200: "#c3c1c6",
                300: "#a5a2a9",
                400: "#87838d",
                500: "#696470",
                600: "#54505a",
                700: "#3f3c43",
                800: "#2a282d",
                900: "#151416"
            },
            gray: {
                100: "#edecee",
                200: "#dbdade",
                300: "#cac7cd",
                400: "#b8b5bd",
                500: "#a6a2ac",
                600: "#85828a",
                700: "#646167",
                800: "#424145",
                900: "#212022"
            },
            lightGray: {
                100: "#f5efe9",
                200: "#ebded2",
                300: "#e1cebc",
                400: "#d7bda5",
                500: "#cdad8f",
                600: "#a48a72",
                700: "#7b6856",
                800: "#524539",
                900: "#29231d"
            },
            blue: {
                100: "#e4ebea",
                200: "#c8d6d5",
                300: "#adc2c0",
                400: "#91adab",
                500: "#769996",
                600: "#5e7a78",
                700: "#475c5a",
                800: "#2f3d3c",
                900: "#181f1e"
            },
        }
        : {
            black: {
                100: "#090b0e",
                200: "#12171c",
                300: "#1b2229",
                400: "#242e37",
                500: "#2d3945",
                600: "#57616a",
                700: "#81888f",
                800: "#abb0b5",
                900: "#d5d7da"
            },
            indigo: {
                100: "#151416",
                200: "#2a282d",
                300: "#3f3c43",
                400: "#54505a",
                500: "#696470",
                600: "#87838d",
                700: "#a5a2a9",
                800: "#c3c1c6",
                900: "#e1e0e2"
            },
            gray: {
                100: "#212022",
                300: "#424145",
                300: "#646167",
                400: "#85828a",
                500: "#a6a2ac",
                600: "#b8b5bd",
                700: "#cac7cd",
                800: "#dbdade",
                900: "#edecee"
            },
            lightGray: {
                100: "#29231d",
                200: "#524539",
                300: "#7b6856",
                400: "#a48a72",
                500: "#cdad8f",
                600: "#d7bda5",
                700: "#e1cebc",
                800: "#ebded2",
                900: "#f5efe9"
            },
            blue: {
                100: "#181f1e",
                200: "#2f3d3c",
                300: "#475c5a",
                400: "#5e7a78",
                500: "#769996",
                600: "#91adab",
                700: "#adc2c0",
                800: "#c8d6d5",
                900: "#e4ebea"
            },
        })
})

// theme settings
export const themeSettings = (mode) => {
    const colors = colorTokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colors.blue[500],
                    },
                    secondary: {
                        main: colors.indigo[500],
                    },
                    neutral: {
                        dark: colors.black[700],
                        main: colors.black[500],
                        light: colors.black[100]
                    },
                    background: {
                        default: colors.black[500]
                    }
                } : {
                    primary: {
                        main: colors.blue[100],
                    },
                    secondary: {
                        main: colors.indigo[500],
                    },
                    neutral: {
                        dark: colors.black[700],
                        main: colors.black[500],
                        light: colors.black[100]
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },
        typography: {
            fontFamily: ["Open Sans", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Open Sans", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [theme, colorMode];
}