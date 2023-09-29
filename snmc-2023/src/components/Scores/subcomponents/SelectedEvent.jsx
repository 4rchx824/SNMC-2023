import React, { useState, useEffect } from "react";
import useTimeConverter from "../../../hooks/useTimeConverter";
import Loading from "../../Loading";
import { XCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../../../hooks/axios";

function SelectedEvent({ event_id }) {
    const axios = useAxiosPrivate();
    const steps = ["Upcoming", "Ongoing", "Marking", "Completed"];
    const [event, setEvent] = useState({
        event_id: 0,
        title: "",
        status: "",
        last_updated: new Date(),
        current: 0,
    });
    const { convert } = useTimeConverter();
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const [showErr, setShowErr] = useState(false);
    const [errMsg, setErrMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEventData = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`/events/${event_id}`);

            setEvent(data);
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
        if (event_id.trim() !== "") fetchEventData();
    }, [event_id]);

    return (
        <div className="flex space-x-4 border rounded-lg shadow-md relative">
            {isLoading ? (
                <Loading className={"text-primary"} />
            ) : showErr ? (
                <div className="alert border-0 bg-base-100">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <span>{errMsg}</span>
                </div>
            ) : (
                <>
                    <div className="flex flex-col justify-between flex-grow p-4">
                        <div className="flex w-full justify-between">
                            <div className="flex flex-col max-w-lg w-full">
                                <h1 className="text-sm text-gray-400 pb-4">
                                    Selected Event
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
                                ).toString()}
                            </h1>
                        </div>
                    </div>

                    <div className="flex flex-col p-4">
                        <h1 className="text-sm text-gray-400 pb-4">
                            Selected Event Progress
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
        </div>
    );
}

export default SelectedEvent;
