import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SideNavItem({ children, to, isAdmin }) {
    const { pathname } = useLocation();
    let toLink = isAdmin ? "/admin" + to : "/";

    const isActive = toLink == pathname

    return (
        <Link
            className={`btn btn-ghost w-full ${isActive ? "bg-base-300" : ""}`}
            to={toLink}
        >
            {children}
        </Link>
    );
}

export default SideNavItem;
