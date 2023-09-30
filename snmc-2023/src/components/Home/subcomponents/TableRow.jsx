import React from "react";

function TableRow({ user, standing, event }) {
    return (
        <tr>
            <th>
                <h1
                    className={`badge badge-lg text-black ${
                        standing === 1
                            ? "bg-yellow-400"
                            : standing === 2
                            ? "bg-gray-400"
                            : standing === 3
                            ? "bg-yellow-700"
                            : ""
                    }`}
                >
                    {standing}
                </h1>
            </th>
            <th>{user.name}</th>

            {event === "All" ? (
                ""
            ) : (
                <th className="text-gray-400 text-center">{user.score} </th>
            )}

            {true ? (
                ""
            ) : (
                <th>
                    <h1
                        className={`text-center ${
                            event === "All" ? "font-normal" : ""
                        }`}
                    >
                        {event === "All"
                            ? user.total_pts_attained
                            : user.pts_attained}
                    </h1>
                </th>
            )}
        </tr>
    );
}

export default TableRow;
