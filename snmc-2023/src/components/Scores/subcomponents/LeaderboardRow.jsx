import React from "react";

function LeaderboardRow({ event_id, user, standing }) {
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
            <td>
                <div className="flex flex-col">
                    <h1 className="font-bold text-lg">{user.name}</h1>
                    <h1 className="badge badge-info badge-sm mt-1">
                        {user.organisation}
                    </h1>
                    <h1 className="text-[10px] text-gray-400 pt-4">{user.uuid}</h1>
                </div>
            </td>
            <td>
                <h1 className="badge badge-neutral">{user.seat}</h1>
            </td>
            <td>{event_id === "All" ? user.total_score : user.score}</td>
            <td>
                {event_id === "All"
                    ? user.total_pts_attained
                    : user.pts_attained}
            </td>
        </tr>
    );
}

export default LeaderboardRow;
