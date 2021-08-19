import React from "react";
import PropTypes from "prop-types";
// Frameworks
import { useRouter } from "next/router";
import {
    AppBar,
    Typography,
    Toolbar,
    Box,
    IconButton,
    List,
    SwipeableDrawer,
    Avatar,
    Divider,
} from "@material-ui/core";
// Assets
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import ConnectWithoutContactIcon from "@material-ui/icons/ConnectWithoutContact";
// Custom
import ListItemLink from "components/ListItemLink";

const links = [
    { id: 1, name: "Home", to: "/", icon: <HomeIcon /> },
    { id: 2, name: "About", to: "/about", icon: <InfoIcon /> },
    {
        id: 3,
        name: "Contact",
        to: "/contact",
        icon: <ConnectWithoutContactIcon />,
    },
];

/**
 * Layout of for the pages.
 *
 * @param {Object} props
 * @param {JSX.Element} props.children The page you want to include Layout
 *
 * @component
 *
 * @example
 * return (
 *  <Layout>
 *      <Home/>
 *  </Layout>
 * )
 */
export default function Layout({ children }) {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    /**
     * Handles Opening the drawer
     */
    const handleOpen = () => setOpen(true);
    /**
     * Handles Closing the drawer
     */
    const handleClose = () => setOpen(false);

    return (
        <>
            <AppBar color="transparent" position="static">
                <Toolbar>
                    <IconButton onClick={handleOpen}>
                        {open ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography component="h1" variant="h5" fontWeight={400}>
                        Aleexnl&apos;s portfolio
                    </Typography>
                    <SwipeableDrawer
                        keepMounted={true}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{ sx: { alignItems: "center" } }}
                        component="nav"
                    >
                        <Avatar
                            sx={{ my: 2 }}
                            variant="rounded"
                            alt="Aleexnl logo"
                        />
                        <Divider light flexItem />
                        <List
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                px: 1,
                            }}
                        >
                            {links.map((link) => {
                                return (
                                    <ListItemLink
                                        key={link.id}
                                        to={link.to}
                                        selected={link.to === router.pathname}
                                        label={link.name}
                                    >
                                        {link.icon}
                                    </ListItemLink>
                                );
                            })}
                        </List>
                    </SwipeableDrawer>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
                p={3}
                overflow="auto"
            >
                {children}
            </Box>
            {/*
                <Box component="footer">
                    <AppBar position="static" color="transparent">
                        <Toolbar />
                    </AppBar>
                </Box>
                 */}
        </>
    );
}

Layout.propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.element.isRequired,
};
