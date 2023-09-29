import React, { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Loading from "../../Loading";
import useAxiosPrivate from "../../../hooks/axios";
import useTimeConverter from "../../../hooks/useTimeConverter";

const steps = ["Upcoming", "Ongoing", "Marking", "Completed"];

function EventInfo({ event_id }) {
    const { convert } = useTimeConverter();
    const axios = useAxiosPrivate();
    const [showErr, setShowErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [event, setEvent] = useState({
        event_id: 0,
        title: null,
        status: null,
        last_updated: null,
        current: 0,
    });

    const fetchData = async () => {
        setIsLoading(true);
        setShowErr(false);
        try {
            const { data } = await axios.get(`/events/${event_id}`);

            console.log(data);
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
        fetchData();
    }, [event_id]);

    return (
        <>
            {isLoading ? (
                <div className="">
                    <Loading className="text-primary" />
                </div>
            ) : showErr ? (
                <div className="flex items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <h1>An unexpected error has occured</h1>
                </div>
            ) : (
                <div
                    className={`w-full border p-4 rounded-md max-w-5xl ${
                        event.current === 1
                            ? "border-2 border-primary relative"
                            : ""
                    }`}
                >
                    <h1
                        className={`absolute -top-0 right-0 bg-primary text-white rounded-bl-md px-5 font-bold`}
                    >
                        Current Event
                    </h1>
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col max-w-lg w-full">
                                <h1 className="text-gray-400 text-sm">Title</h1>
                                <h1 className="text-4xl font-bold pb-3 truncate">
                                    {event.title ?? "NA"}
                                </h1>
                            </div>

                            <div className="flex flex-col w-full max-w-xs">
                                <h1 className="text-gray-400 text-sm">
                                    Status
                                </h1>
                                <h1
                                    className={`text-4xl font-bold ${
                                        event.status === "Ongoing"
                                            ? "text-red-600"
                                            : event.status === "Marking"
                                            ? "text-orange-400"
                                            : event.status === "Completed"
                                            ? "text-green-400"
                                            : ""
                                    }`}
                                >
                                    {event.status ?? "NA"}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <h1 className=" max-w-xs w-full text-gray-500">
                                <span className="text-sm text-gray-400">
                                    Last Updated:
                                </span>{" "}
                                <br />
                                {event.last_updated ?? "NA" !== "NA"
                                    ? convert(event.last_updated).toUTCString()
                                    : "NA"}
                            </h1>

                            <div>
                                <h1 className="text-sm text-gray-400 pb-4">
                                    Progress
                                </h1>
                                <ul className="steps">
                                    {steps.map((step, index) => {
                                        if (
                                            index <= steps.indexOf(event.status)
                                        )
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
                            </div>
                        </div>

                        <div className="flex justify-between items-baseline">
                            <h1 className="text-sm text-gray-400">
                                {event.event_id}
                            </h1>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default EventInfo;
