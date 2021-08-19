import { createTheme, responsiveFontSizes } from "@material-ui/core";
import "@fontsource/poppins";

export default responsiveFontSizes(
    createTheme({
        typography: {
            fontFamily: [
                "poppins",
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
