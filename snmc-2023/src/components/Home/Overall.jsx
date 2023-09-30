import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "../../api/axios";
import Loading from "../../components/Loading";
import Podium from "./subcomponents/Podium";
import Table from "./subcomponents/Table";

function Overall() {
    const [showErr, setShowErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [standings, setStandings] = useState([]);

    const getStanding = async () => {
        setShowErr(false);
        setIsLoading(true);
        try {
            const { data } = await axios.get("/leaderboard/overall");

            setStandings([]);
        } catch (e) {
            console.error(e);
            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getStanding();
        const standingFetch = setInterval(() => getStanding(), 5000);

        return () => {
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
                    <h1 className="text-3xl text-primary font-bold text-center">
                        Overall Championship Points
                    </h1>
                    <Podium standings={standings} />
                    <Table standings={standings} event={{ status: "All" }} />
                </div>
            )}
        </>
    );
}

export default Overall;
