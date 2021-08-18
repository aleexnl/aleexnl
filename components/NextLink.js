import React from "react";
import Link from "next/link"
export default function NextLink({ to, ref }) {
    return React.forwardRef(
        function NextLink({ itemProps, ref }) {
            return <Link href={to} {...itemProps} ref={ref}></Link>
        }
        ),
   
}
function ListItemLink(props) {
    const { icon, primary, to } = props;
  
    const renderLink = React.useMemo(
      () =>
        React.forwardRef(function Link(itemProps, ref) {
          return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
        }),
      [to],
    )
