import React, { useState, useEffect } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Loading from "../../Loading";
import useAxiosPrivate from "../../../hooks/axios";
import useTimeConverter from "../../../hooks/useTimeConverter";

const steps = ["Upcoming", "Ongoing", "Marking", "Completed"];

function EventInfo({ event }) {
    const { convert } = useTimeConverter();
    return (
        <div className={`w-full border p-4 rounded-md max-w-5xl`}>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
                    <div className="flex flex-col max-w-sm lg:max-w-lg w-full">
                        <h1 className="text-gray-400 text-sm">Title</h1>
                        <h1 className="text-4xl font-bold pb-3 truncate whitespace-normal">
                            {event.title ?? "NA"}
                        </h1>
                    </div>

                    <div className="flex flex-col w-full max-w-xs">
                        <h1 className="text-gray-400 text-sm">Status</h1>
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

                <div className="flex items-end justify-between">
                    <h1 className=" max-w-xs w-full text-gray-500">
                        <span className="text-sm text-gray-400">
                            Last Updated:
                        </span>{" "}
                        <br />
                        {event.last_updated ?? "NA" !== "NA"
                            ? convert(event.last_updated).toUTCString()
                            : "NA"}
                    </h1>

                    <div className="hidden lg:block">
                        <h1 className="text-sm text-gray-400 pb-4">Progress</h1>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventInfo;
