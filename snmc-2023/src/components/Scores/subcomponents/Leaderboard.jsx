import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../../../hooks/axios";
import Loading from "../../Loading";
import LeaderboardRow from "./LeaderboardRow";

function Leaderboard({ event_id }) {
    const axios = useAxiosPrivate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showErr, setShowErr] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`/scores/leaderboard/${event_id}`);

            setData(data);
        } catch (e) {
            setShowErr(true);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [event_id]);
    return (
        <div className="pt-8 flex-grow flex flex-col w-full">
            {isLoading ? (
                <Loading className="text-primary" />
            ) : showErr ? (
                <div className="flex flex-grow items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <h1>An unexpected error has occured</h1>
                </div>
            ) : data.length === 0 ? (
                <div className="flex flex-grow items-center justify-center">
                    <h1>There are no scores for this event</h1>
                </div>
            ) : (
                <div className="overflow-x-auto w-full px-20">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ranking</th>
                                <th>Name</th>
                                <th>Seat</th>
                                <th>
                                    {event_id === "All"
                                        ? "Total Score"
                                        : "Raw Score"}
                                </th>
                                <th>
                                    {event_id === "All"
                                        ? "Total Championship Points"
                                        : "Points Attained"}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((user, index) => (
                                <LeaderboardRow
                                    user={user}
                                    standing={index + 1}
                                    event_id={event_id}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
