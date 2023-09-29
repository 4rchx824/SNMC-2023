import React, { useEffect, useState } from "react";
import {
    TrashIcon,
    XCircleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Loading from "../Loading";
import useAxiosPrivate from "../../hooks/axios";

function AddEvent({ refresh, isOpen }) {
    const axios = useAxiosPrivate();
    const [name, setName] = useState("");
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("An unexpected error has occured");

    const handleCreateEvent = async () => {
        setIsLoading(true);
        setShowError(false);
        setShowSuccess(false);
        try {
            const { data } = await axios.post("/events/create", {
                eventName: name,
            });

            if (data.uuid) {
                setShowSuccess(true);
                setName("");
                refresh();
            } else {
                throw new Error("Failed to create event");
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

    useEffect(() => {
        setName("");
        setShowError(false);
        setShowSuccess(false);
    }, [isOpen]);

    return (
        <div className="flex flex-col w-full max-w-xl">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-primary">Create Event</h1>
                <button onClick={() => setName("")}>
                    <TrashIcon className="w-6 h-6 text-red-600 hover:-translate-y-1 transition-all" />
                </button>
            </div>
            <div className="form-control w-full pt-4">
                <label className="label">
                    <span className="label-text">Event Title</span>
                </label>
                <div className="flex items-center justify-center space-x-2">
                    <input
                        type="text"
                        placeholder="Event title"
                        className="input input-bordered w-full"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handleCreateEvent}
                    >
                        Create
                    </button>
                </div>
            </div>

            <>
                {isLoading && <Loading className="mt-4 text-primary" />}
                {showError && (
                    <div className="alert border-0 bg-base-100 mt-4">
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                        <span>{errMsg}</span>
                    </div>
                )}
                {showSuccess && (
                    <div className="alert border-0 bg-base-100 mt-4">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                        <span>Successfully created new event!</span>
                    </div>
                )}
            </>
        </div>
    );
}

export default AddEvent;
