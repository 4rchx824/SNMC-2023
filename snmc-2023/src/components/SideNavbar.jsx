import React from "react";
import SideNavItem from "./SideNavItem";

import {
    ChartPieIcon,
    UsersIcon,
    CalendarIcon,
    TrophyIcon,
    ArrowLeftOnRectangleIcon,
    HomeIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/auth";

function SideNavbar() {
    const { setUser } = useAuth();
    const handleLogout = () => {
        setUser({});
        localStorage.clear();
        navigate("/login");
    };
    return (
        <div className="bg-base-200 sticky top-0 h-screen px-4 py-4 flex flex-col items-center justify-between max-w-[15rem] w-full">
            <div className="flex flex-col items-center justify-center space-y-2 w-full">
                <SideNavItem to="/" isAdmin={true}>
                    <div className="flex items-center justify-start w-full space-x-2">
                        <ChartPieIcon className="w-6 h-6" />
                        <h1 className="">Dashboard</h1>
                    </div>
                </SideNavItem>
                <div className="divider"></div>
                <SideNavItem to="/users" isAdmin={true}>
                    <div className="flex items-center justify-start w-full space-x-2">
                        <UsersIcon className="w-6 h-6" />
                        <h1>Users</h1>
                    </div>
                </SideNavItem>
                <SideNavItem to="/events" isAdmin={true}>
                    <div className="flex items-center justify-start w-full space-x-2">
                        <CalendarIcon className="w-6 h-6" />
                        <h1>Events</h1>
                    </div>
                </SideNavItem>
                <SideNavItem to="/scores" isAdmin={true}>
                    <div className="flex items-center justify-start w-full space-x-2">
                        <TrophyIcon className="w-6 h-6" />
                        <h1>Scores</h1>
                    </div>
                </SideNavItem>

                <div className="divider"></div>

                <SideNavItem to="/" isAdmin={false}>
                    <div className="flex items-center justify-start w-full space-x-2">
                        <HomeIcon className="w-6 h-6" />
                        <h1>Home</h1>
                    </div>
                </SideNavItem>
            </div>

            <button className="btn btn-ghost w-full" onClick={handleLogout}>
                <div className="flex items-center justify-between w-full space-x-2">
                    <h1>Logout</h1>
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                </div>
            </button>
        </div>
    );
}

export default SideNavbar;
