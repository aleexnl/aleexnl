import React from "react";
// Frameworks
import { useRouter } from "next/router";
import {
    AppBar,
    Typography,
    Toolbar,
    Box,
    IconButton,
    List,
    ListItemText,
    ListItemButton,
} from "@material-ui/core";
// Assets
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

const menuItems = [
    { id: 1, name: "Home", to: "/" },
    { id: 2, name: "About", to: "/about" },
];

function Menu() {
    const router = useRouter();
    return (
        <List sx={{ display: "flex" }}>
            {menuItems.map((item) => {
                return (
                    <ListItemButton
                        key={item.id}
                        to={item.to}
                        component={NextLink}
                        selected={item.to === router.pathname}
                    >
                        <ListItemText sx={{ fontWeight: 700 }}>
                            {item.name}
                        </ListItemText>
                    </ListItemButton>
                );
            })}
        </List>
    );
}

export default function Layout({ children }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <AppBar color="transparent" position="static">
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography component="h1" variant="h5" fontWeight={400}>
                        aleexnl&apos;s portfolio
                    </Typography>
                    <Box display="flex" component="nav">
                        {open && <Menu />}
                        <IconButton onClick={handleOpen}>
                            {open ? <MenuOpenIcon /> : <MenuIcon />}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
            >
                {children}
            </Box>
        </>
    );
}
