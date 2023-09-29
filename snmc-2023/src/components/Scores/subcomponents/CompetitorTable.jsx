import React, { useEffect, useState } from "react";
import Loading from "../../Loading";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Competitor from "./Competitor";
import useAxiosPrivate from "../../../hooks/axios";

function CompetitorTable({ event_id, addScoreOpen }) {
    const axios = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [showErr, setShowErr] = useState(false);
    const [errMsg, setErrMsg] = useState("An unexpected error has occured");

    const [competitors, setCompetitors] = useState([]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/events/${event_id}/competitors`);
            setCompetitors(data);
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setErrMsg(e?.response?.data?.message || e?.message);

            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [event_id, addScoreOpen]);

    return (
        <>
            {isLoading ? (
                <Loading className="text-primary" />
            ) : showErr ? (
                <div className="flex items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <h1>{errMsg}</h1>
                </div>
            ) : competitors.length === 0 ? (
                <div className="flex-grow h-full flex items-center justify-center">
                    <h1 className="">No competitors for this event</h1>
                </div>
            ) : (
                <div className="overflow-x-auto w-full px-20">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Seat</th>
                                <th>Name</th>
                                <th>Raw Score</th>
                                <th>Points Attained</th>
                                <th>Last Updated</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {competitors.map((user) => (
                                <Competitor user={user} key={user.uuid} event_id={event_id} refresh={fetchData}/>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}

export default CompetitorTable;
