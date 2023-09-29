import React from "react";

function Loading({ className }) {
    return (
        <div className="flex items-center justify-center flex-grow">
            <span
                className={`loading loading-spinner loading-md ${
                    className ?? ""
                }`}
            ></span>
        </div>
    );
}

export default Loading;
