import React, { useState } from "react";
import useTimeConverter from "../../../hooks/useTimeConverter";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import GeneralModal from "../../GeneralModal";
import EditEventInfo from "./EditEventInfo";

function EventInfo({ event, refresh }) {
    const { convert } = useTimeConverter();
    const [editOpen, setEditOpen] = useState(false);
    // {
    //     event_id: 3,
    //     title: 'Event 3',
    //     status: 'Marking',
    //     last_updated: '2023-09-27 22:09:06',
    //     current: 1
    //   }
    return (
        <>
            <GeneralModal open={editOpen} onClose={() => setEditOpen(false)}>
                <EditEventInfo
                    refresh={refresh}
                    setEditOpen={setEditOpen}
                    event={event}
                />
            </GeneralModal>
            <div
                className={`w-full border p-4 rounded-md max-w-5xl ${
                    event.current === 1
                        ? "border-2 border-primary relative"
                        : ""
                }`}
            >
                <h1
                    className={`absolute -top-6 right-1 bg-primary text-white rounded-tl-md rounded-tr-md px-2`}
                >
                    Current Event
                </h1>
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col max-w-lg w-full">
                            <h1 className="text-gray-400 text-sm">Title</h1>
                            <h1 className="text-4xl font-bold pb-3 truncate">
                                {event.title}
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
                                {event.status}
                            </h1>
                        </div>
                    </div>

                    <h1 className="self-end max-w-xs w-full text-gray-500">
                        <span className="text-sm text-gray-400">Last Updated:</span> <br />
                        {event.last_updated ?? "NA" !== "NA"
                            ? convert(event.last_updated).toUTCString()
                            : "NA"}
                    </h1>

                    <div className="flex justify-between items-baseline">
                        <h1 className="text-sm text-gray-400">
                            {event.event_id}
                        </h1>
                        <button
                            className="btn btn-ghost"
                            onClick={() => setEditOpen(true)}
                        >
                            <PencilSquareIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventInfo;
