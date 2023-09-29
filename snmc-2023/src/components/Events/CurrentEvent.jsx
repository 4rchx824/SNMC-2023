import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/axios";
import useTimeConverter from "../../hooks/useTimeConverter";
import Loading from "../Loading";
import { XCircleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

const steps = ["Upcoming", "Ongoing", "Marking", "Completed"];

function CurrentEvent() {
    const axios = useAxiosPrivate();
    const { convert } = useTimeConverter();
    const [isLoading, setIsLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const [event, setEvent] = useState({
        event_id: 0,
        title: "",
        status: "",
        last_updated: new Date(),
        current: 0,
    });
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const fetchData = async () => {
        setLastUpdated(new Date());
        setIsLoading(true);
        setShowError(false);
        try {
            const { data } = await axios.get("/events/current");

            setEvent(data);
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
            <div className="flex flex-grow space-x-4 border rounded-lg shadow-md relative">
                {isLoading ? (
                    <Loading className="text-primary" />
                ) : showError ? (
                    <div className="flex flex-grow items-center justify-center space-x-2">
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                        <h1>An unexpected error has occured</h1>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col justify-between flex-grow p-4">
                            <div className="flex w-full justify-between">
                                <div className="flex flex-col max-w-lg w-full">
                                    <h1 className="text-sm text-gray-400 pb-4">
                                        Current Event
                                    </h1>
                                    <h1 className="text-4xl text-primary font-bold">
                                        {event.title ?? "NO CURRENT EVENT"}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <h1 className="pt-2 text-gray-400 text-sm">
                                    {event.event_id ?? "NA"}
                                </h1>
                                <h1 className="pt-2 text-gray-400 text-sm">
                                    {new Date(
                                        convert(event.last_updated)
                                    ).toUTCString()}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-col p-4">
                            <h1 className="text-sm text-gray-400 pb-4">
                                Current Event Progress
                            </h1>
                            <ul className="steps">
                                {steps.map((step, index) => {
                                    if (index <= steps.indexOf(event.status))
                                        return (
                                            <li
                                                className="step step-primary"
                                                key={step}
                                            >
                                                {step}
                                            </li>
                                        );
                                    else
                                        return (
                                            <li className="step" key={step}>
                                                {step}
                                            </li>
                                        );
                                })}
                            </ul>

                            <h1 className="text-sm text-gray-400 self-end">
                                {lastUpdated.toLocaleString()}
                            </h1>
                        </div>
                    </>
                )}
                <button
                    onClick={fetchData}
                    className="absolute top-3 right-3"
                    disabled={isLoading}
                >
                    <ArrowPathIcon
                        className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                    />
                </button>
            </div>
        </>
    );
}

export default CurrentEvent;
