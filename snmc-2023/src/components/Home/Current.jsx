import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "../../api/axios";
import Loading from "../../components/Loading";
import EventInfo from "./subcomponents/EventInfo";
import Podium from "./subcomponents/Podium";
import Table from "./subcomponents/Table";

function Current() {
    const [current, setCurrent] = useState({
        event_id: null,
        title: null,
        status: null,
        last_updated: null,
        current: 0,
    });

    const [showErr, setShowErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCurrent = async () => {
        setShowErr(false);
        setIsLoading(true);
        try {
            const { data } = await axios.get("/leaderboard/current");

            setCurrent(data);
        } catch (e) {
            console.error(e);
            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    const [standings, setStandings] = useState([]);

    const getStanding = async () => {
        setShowErr(false);
        setIsLoading(true);
        try {
            const { data } = await axios.get("/leaderboard/current/standings");

            setStandings(data);
        } catch (e) {
            console.error(e);
            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrent();
        getStanding();

        const currentFetch = setInterval(() => fetchCurrent(), 5000);
        const standingFetch = setInterval(() => {
            if (current.status === "Completed") getStanding();
        }, 5000);

        return () => {
            clearInterval(currentFetch);
            clearInterval(standingFetch);
        };
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : showErr ? (
                <div className="flex flex-grow items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <h1>An unexpected error has occured!</h1>
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center space-y-8 pb-12">
                    <EventInfo event={current} />
                    <Podium standings={standings} />
                    <Table standings={standings} event={current} />
                </div>
            )}
        </>
    );
}

export default Current;
