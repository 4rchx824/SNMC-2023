import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import TableRow from "./TableRow";

function Table({ standings, event }) {
    return (
        <>
            {event.status !== "Completed" && event.status !== "All" ? (
                <h1 className="italic text-black">
                    **Score will be realeased after marking
                </h1>
            ) : standings.length === 0 ? (
                <div className="flex items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <h1>There are no scores for this event</h1>
                </div>
            ) : (
                <div className="overflow-x-auto w-full max-w-sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                {event.status === "All" ? (
                                    ""
                                ) : (
                                    <th>Raw Score</th>
                                )}

                                <th>
                                    {event.status === "All"
                                        ? "Total Championship Points"
                                        : "Points Attained"}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((user, index) => (
                                <TableRow
                                    user={user}
                                    standing={index + 1}
                                    event={event.status}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default Table;
