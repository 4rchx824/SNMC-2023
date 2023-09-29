import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/axios";
import Loading from "../Loading";
import { XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

function EventStatuses() {
    const axios = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [stats, setStats] = useState({
        upcoming: 0,
        completed: 0,
    });

    const fetchData = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            const { data } = await axios.get("/events/stats/");

            setStats({
                upcoming: data.UPCOMING,
                completed: data.COMPLETED,
            });
        } catch (e) {
            console.error(e);
            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => fetchData(), 60000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <>
            <div className="flex p-4 px-8 border rounded-lg shadow-md items-start justify-between space-x-12 relative">
                <div className="flex flex-col justify-between items-center h-full">
                    <h1 className="text-sm text-gray-400">Upcoming</h1>
                    <h1 className="text-4xl text-primary">
                        {isLoading ? (
                            <Loading className="text-primary" />
                        ) : showError ? (
                            <XCircleIcon className="h-10 w-10 text-red-600" />
                        ) : (
                            stats.upcoming
                        )}
                    </h1>
                    <h1></h1>
                </div>
                <div className="flex flex-col justify-between items-center h-full">
                    <h1 className="text-sm text-gray-400">Completed</h1>
                    <h1 className="text-4xl text-primary">
                        {isLoading ? (
                            <Loading className="text-primary" />
                        ) : showError ? (
                            <XCircleIcon className="h-10 w-10 text-red-600" />
                        ) : (
                            stats.completed
                        )}
                    </h1>
                    <h1></h1>
                    <button
                        onClick={fetchData}
                        className="absolute top-2 right-2"
                        disabled={isLoading}
                    >
                        <ArrowPathIcon
                            className={`h-4 w-4 ${
                                isLoading ? "animate-spin" : ""
                            }`}
                        />
                    </button>
                </div>
            </div>
        </>
    );
}

export default EventStatuses;
