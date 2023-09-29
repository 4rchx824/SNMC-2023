import React from "react";
import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";
import { Outlet } from "react-router-dom";

import "../index.css";

function Layout() {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen h-full w-full px-8">
                <Outlet />
            </div>
        </>
    );
}

export const AdminLayout = () => {
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen h-full w-full">
                <SideNavbar />
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
