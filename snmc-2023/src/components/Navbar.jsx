import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar bg-base-300 px-4 shadow-md">
            <div className="flex-1">
                <>
                    <Link
                        className="btn btn-ghost text-xl font-bold uppercase hidden md:flex"
                        to="/"
                    >
                        Singapore
                        <label className="text-white drop-shadow-[0_0px_1.5px_rgba(57,78,106,1)]">
                            National
                        </label>
                        Memory Championship
                        <label className="text-white drop-shadow-[0_0px_1.5px_rgba(57,78,106,1)]">
                            2023
                        </label>
                    </Link>
                </>

                <>
                    <a className="btn btn-ghost text-xl font-bold uppercase md:hidden flex">
                        SNMC
                        <label className="text-white drop-shadow-[0_0px_1.5px_rgba(0,0,0,1)]">
                            2023
                        </label>
                    </a>
                </>
            </div>
        </div>
    );
}

export default Navbar;
