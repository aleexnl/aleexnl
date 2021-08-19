import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import {
    ListItemButton,
    Link,
    IconButton,
    ListItemIcon,
} from "@material-ui/core";

/**
 * Component used to render MaterialUI ListItemButton as Next/Link.
 *
 * @param {Object}props
 * @param {String} props.to Link destination
 * @param {String} props.label Text of the link element
 * @param {String} props.selected If the user actually selected this button.
 * @param {JSX.Element} props.children Icon for the label
 *
 * @component
 *
 * @example
 * return (
 *  <List>
 *      <ListItemLink to="/" selected={true} label="Home"/>
 *      <ListItemLink to="/about" selected={false} label="About"/>
 *  </List>
 * )
 */
export default function ListItemLink({ to, label, selected, children }) {
    const CustomLink = React.useMemo(
        () =>
            React.forwardRef(function ComposedLink(props, ref) {
                const { to, label } = props;
                return (
                    <NextLink href={to} ref={ref} passHref>
                        <Link underline="none">{label}</Link>
                    </NextLink>
                );
            }),
        []
    );
    return (
        <ListItemButton selected={selected} sx={{ my: 0.2, borderRadius: 3 }}>
            <ListItemIcon>{children}</ListItemIcon>
            <CustomLink to={to} label={label} />
        </ListItemButton>
    );
}

ListItemLink.propTypes = {
    /**
     * Link destination
     */
    to: PropTypes.string.isRequired,
    /**
     * Text of the link element
     */
    label: PropTypes.string,
    /**
     * If the user actually selected this button.
     */
    selected: PropTypes.bool,
    /**
     * Label Icon
     */
    children: PropTypes.element,
};

ListItemLink.defaultProps = {
    label: "New Page",
    selected: false,
};
