import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import axios from "../../api/axios";
import Loading from "../../components/Loading";
import EventInfo from "./subcomponents/EventInfo";
import Table from "./subcomponents/Table";
import Podium from "./subcomponents/Podium";

function Others() {
    const [showErr, setShowErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [options, setOptions] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState("");

    const [standings, setStandings] = useState([]);

    const getAllEvents = async () => {
        setShowErr(false);
        setIsLoading(true);
        try {
            const { data } = await axios.get("/leaderboard/events");

            setOptions(data);
        } catch (e) {
            console.error(e);
            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    const [event, setEvent] = useState({});
    const getEvent = async () => {
        setShowErr(false);
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                `/leaderboard/events/${selectedEvent}`
            );

            setEvent(data);
        } catch (e) {
            console.error(e);
            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    const getStandings = async () => {
        setShowErr(false);
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                `/leaderboard/${selectedEvent}/standings`
            );

            if (event.status === "Completed") setStandings(data);
        } catch (e) {
            console.error(e);
            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedEvent !== "") {
            getEvent();
            getStandings();
        }
    }, [selectedEvent]);

    useEffect(() => {
        getAllEvents();
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
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text badge badge-primary text-white">
                                Event
                            </span>
                        </label>
                        <select
                            className="select select-bordered"
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            value={selectedEvent}
                        >
                            <option disabled value="">
                                Select event
                            </option>
                            {options.map((event) => (
                                <option
                                    value={event.event_id}
                                    key={event.event_id}
                                >
                                    {event.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <EventInfo event={event} />
                    <Podium standings={standings} />
                    <Table standings={standings} event={event} />
                </div>
            )}
        </>
    );
}

export default Others;
