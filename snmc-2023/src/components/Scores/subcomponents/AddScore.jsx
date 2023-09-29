import React from "react";
import CompetitorComboBox from "./CompetitorComboBox";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../../Loading";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../../../hooks/axios";
import Calculator from "../../../pages/Calculator";

function AddScore({ event_id, setAddScoreOpen, isOpen }) {
    const axios = useAxiosPrivate();
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("An unexpected error has occured");

    const [selectedPerson, setSelectedPerson] = useState(null);

    const [PersonUUID, setPersonUUID] = useState(null);
    const [formData, setFormData] = useState({
        score: 0,
        pts_attained: 0,
    });

    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitNewScore = async () => {
        setIsLoading(true);
        setShowError(false);
        setShowSuccess(false);
        try {
            const { data } = await axios.post("/scores/create", {
                ...formData,
                uuid: PersonUUID,
                event_id: event_id,
            });

            if (data.success) {
                setShowSuccess(true);
                setSelectedPerson(null);
                setAddScoreOpen(false);
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
        setShowError(false);
        setShowSuccess(false);
        setFormData({
            pts_attained: 0,
            score: 0,
        });
    }, [isOpen]);

    return (
        <div className="max-w-lg">
            <h1 className="text-xl text-primary font-bold">Add Score</h1>
            <div className="flex flex-col">
                <div className="pt-4">
                    <CompetitorComboBox
                        isOpen={isOpen}
                        event_id={event_id}
                        setPersonUUID={setPersonUUID}
                        selectedPerson={selectedPerson}
                        setSelectedPerson={setSelectedPerson}
                    />
                </div>
                <div className="flex pt-4 items-end space-x-4 ">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text badge badge-secondary text-white">
                                Raw Score
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="0"
                            className="input input-bordered w-full max-w-xs"
                            onChange={updateFormData}
                            value={formData.score}
                            name="score"
                        />
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text badge badge-accent text-white">
                                Points Attained
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="0"
                            className="input input-bordered w-full max-w-xs"
                            onChange={updateFormData}
                            value={formData.pts_attained}
                            name="pts_attained"
                        />
                    </div>
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
                        <span>Successfully created new score!</span>
                    </div>
                )}
            </>

            <div className="flex space-x-4 pt-4 justify-end">
                <button className="btn" onClick={() => setAddScoreOpen(false)}>
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={submitNewScore}>
                    Add Score
                </button>
            </div>
        </div>
    );
}

export default AddScore;
