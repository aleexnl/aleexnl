import { createTheme, responsiveFontSizes } from "@material-ui/core";
import "@fontsource/Poppins";

export default responsiveFontSizes(
    createTheme({
        typography: {
            fontFamily: [
                "Poppins",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
        },
        palette: { mode: "light" },
        components: {
            MuiButton: {
                defaultProps: { disableElevation: true, variant: "contained" },
                styleOverrides: { root: { textTransform: "none" } },
            },
        },
    })
);
