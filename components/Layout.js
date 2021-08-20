import React from "react";
import PropTypes from "prop-types";
// Frameworks
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
    AppBar,
    Box,
    Link,
    Toolbar,
    IconButton,
    List,
    SwipeableDrawer,
    Paper,
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
    /**
     *The following properties are used in this documentation website for optimal usability of the component:
     *   iOS is hosted on high-end devices. The backdrop transition can be enabled without dropping frames. The performance will be good enough.
     *   iOS has a "swipe to go back" feature that interferes with the discovery feature, so discovery has to be disabled.
     */
    const iOS =
        typeof navigator !== "undefined" &&
        /iPad|iPhone|iPod/.test(navigator.userAgent);
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
                    <NextLink href="/" passHref>
                        <Link variant="h4" underline="hover">
                            Aleexnl
                        </Link>
                    </NextLink>
                    <SwipeableDrawer
                        keepMounted={true}
                        open={open}
                        disableBackdropTransition={!iOS}
                        disableDiscovery={iOS}
                        onOpen={handleOpen}
                        onClose={handleClose}
                        ModalProps={{
                            keepMounted: true,
                            disablePortal: true,
                        }}
                        PaperProps={{ sx: { alignItems: "center" } }}
                        component="nav"
                    >
                        <Paper sx={{ px: 4, py: 2, my: 2 }}>
                            <NextLink href="/" passHref>
                                <Link
                                    variant="h1"
                                    underline="hover"
                                    onClick={handleClose}
                                >
                                    a
                                </Link>
                            </NextLink>
                        </Paper>
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
                                        closeDrawer={handleClose}
                                    >
                                        {link.icon}
                                    </ListItemLink>
                                );
                            })}
                        </List>
                    </SwipeableDrawer>
                    <IconButton
                        onClick={handleOpen}
                        aria-label="open menu"
                        sx={{ ml: "auto" }}
                    >
                        {open ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>
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
        </>
    );
}

Layout.propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.element.isRequired,
};
