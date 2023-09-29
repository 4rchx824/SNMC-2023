import React, { useState } from "react";
import useAxiosPrivate from "../../../hooks/axios";
import Loading from "../../Loading";
import { XCircleIcon } from "@heroicons/react/24/outline";

function EditEventInfo({ refresh, setEditOpen, event }) {
    const axios = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errMsg, setErrMsg] = useState("An unexpected error has occured!");

    const [showDelete, setShowDelete] = useState(false);
    const [deleteName, setDeleteName] = useState("");

    const [formData, setFormData] = useState({
        title: event.title,
        status: event.status,
    });

    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // {
    //     event_id: '942948e3-27e7-4109-8899-1e2798ff4fe5',
    //     title: 'Event 5',
    //     status: 'Upcoming',
    //     last_updated: null,
    //     current: 0
    //   }

    const handleUpdateEvent = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            const { data } = await axios.put(
                `/events/update/${event.event_id}`,
                formData
            );

            if (data.success) {
                refresh();
            } else {
                throw new Error("Failed to update event");
            }
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setErrMsg(e?.response?.data?.message || e?.message);

            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetCurrentEvent = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            const { data } = await axios.put(`/events/current`, {
                event_id: event.event_id,
            });

            if (data.success) {
                refresh();
            } else {
                throw new Error("Failed to set current event");
            }
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setErrMsg(e?.response?.data?.message || e?.message);

            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteEvent = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            if (deleteName !== event.title)
                throw new Error("Please type in correct title");

            const { data } = await axios.delete(
                `/events/delete/${event.event_id}`
            );

            console.log(data)

            if (data.success) {
                setEditOpen(false);
                refresh();
            } else {
                throw new Error("Something went wrong...");
            }
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setErrMsg(e?.response?.data?.message || e?.message);

            setShowError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full space-between max-w-xl">
            <div className="flex flex-col pb-4">
                <h1
                    className="text-gray-400 text-sm"
                    onClick={() => setShowDelete(!showDelete)}
                >
                    Edit Event
                </h1>
                <h1 className="text-gray-500 text-xs">{event.event_id}</h1>
                <div className="flex pt-2 relative max-w-max">
                    <h1 className="text-4xl font-bold">{event.title}</h1>

                    <span className="flex h-3 w-3 absolute top-3 -right-5">
                        <span
                            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                event.current === 0
                                    ? "!bg-red-600"
                                    : "!bg-green-600 animate-ping "
                            }`}
                        ></span>
                        <span
                            className={`relative inline-flex rounded-full h-3 w-3 ${
                                event.current === 0
                                    ? "!bg-red-600"
                                    : "!bg-green-600"
                            }`}
                        ></span>
                    </span>
                </div>

                <div className="flex flex-col items-center justify-center space-x-4 pt-4">
                    <div className="flex items-end justify-center space-x-4 ">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text badge badge-primary text-white">
                                    Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                name="title"
                                value={formData.title}
                                onChange={updateFormData}
                            />
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text badge badge-secondary  text-white">
                                    Status
                                </span>
                            </label>
                            <select
                                className="select select-bordered"
                                onChange={updateFormData}
                                value={formData.status}
                                name="status"
                            >
                                <option>Upcoming</option>
                                <option>Ongoing</option>
                                <option>Marking</option>
                                <option>Completed</option>
                            </select>
                        </div>

                        <button
                            className="btn btn-primary btn-outline"
                            disabled={event.current === 1}
                            onClick={handleSetCurrentEvent}
                        >
                            Set as Current Event
                        </button>
                    </div>
                </div>

                <h1 className="text-gray-400 text-sm pt-4">
                    Last Updated:{" "}
                    {event.last_updated ?? "NA" === "NA"
                        ? event.last_updated ?? "NA"
                        : ""}
                </h1>
            </div>
            <>
                {isLoading && <Loading className={"text-primary"} />}
                {showError && (
                    <div className="alert border-0 bg-base-100">
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                        <span>{errMsg}</span>
                    </div>
                )}
            </>

            <div className="flex self-end space-x-2 pt-4">
                <button className="btn" onClick={() => setEditOpen(false)}>
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdateEvent}>
                    Update
                </button>
            </div>

            {showDelete && (
                <>
                    <div className="divider text-red-600 font-bold">
                        Danger Zone
                    </div>
                    <div className="form-control w-full flex-row space-x-4">
                        <input
                            type="text"
                            placeholder={formData.title}
                            className="input input-bordered w-full"
                            name="title"
                            value={deleteName}
                            onChange={(e) => setDeleteName(e.target.value)}
                        />
                        <button
                            className="btn bg-red-600 text-white hover:bg-red-700 transition-all"
                            onClick={handleDeleteEvent}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default EditEventInfo;
