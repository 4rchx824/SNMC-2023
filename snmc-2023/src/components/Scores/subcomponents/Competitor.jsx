import React, { useState } from "react";
import GeneralModal from "../../GeneralModal";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Loading from "../../Loading";
import useAxiosPrivate from "../../../hooks/axios";
import useTimeConverter from "../../../hooks/useTimeConverter";

function Competitor({ user, event_id, refresh }) {
    const { convert } = useTimeConverter();
    const axios = useAxiosPrivate();
    const [errMsg, setErrMsg] = useState("An unexpected error has occured");
    const [showErr, setShowErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [scores, setScores] = useState({
        score: user.score,
        pts_attained: user.pts_attained,
    });

    const [showDelete, setShowDelete] = useState(false);
    const [deleteName, setDeleteName] = useState("");

    const handleChange = (e) => {
        setScores({
            ...scores,
            [e.target.name]: e.target.value,
        });
    };

    const onCancel = () => {
        setScores({
            score: 0,
            pts_attained: 0,
        });
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post("/scores/update", {
                uuid: user.uuid,
                event_id: event_id,
                ...scores,
            });

            setScores(data);
            setIsEditing(false);
            refresh();
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setErrMsg(e?.response?.data?.message || e?.message);

            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            if (deleteName !== user.name)
                throw new Error("Please enter correct name");

            const { data } = await axios.post("/scores/delete", {
                uuid: user.uuid,
                event_id: event_id,
            });

            if (data.success) refresh();
            else throw new Error("Failed to delete score");
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setErrMsg(e?.response?.data?.message || e?.message);

            setShowErr(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <GeneralModal open={showErr} onClose={() => setShowErr(false)}>
                <div className="flex items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <h1>{errMsg}</h1>
                </div>
            </GeneralModal>
            <tr>
                <th
                    onClick={() => {
                        setShowDelete(!showDelete);

                        if (isEditing) setIsEditing(false);
                    }}
                >
                    <h1 className="badge badge-neutral">{user.seat}</h1>
                </th>
                <td>
                    <div className="flex flex-col items-start justify-start">
                        <h1 className="text-lg font-bold">{user.name}</h1>
                        <h1 className="text-gray-400 text-[10px]">
                            {user.uuid}
                        </h1>
                    </div>
                </td>
                <td>
                    <input
                        type="text"
                        className={`input ${isEditing} input-bordered input-primary`}
                        name="score"
                        value={scores.score}
                        disabled={!isEditing}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        className={`input ${isEditing} input-bordered input-primary`}
                        name="pts_attained"
                        value={scores.pts_attained}
                        disabled={!isEditing}
                        onChange={handleChange}
                    />
                </td>
                <td>
                    {!user.last_updated
                        ? "NA"
                        : new Date(convert(user.last_updated)).toUTCString()}
                </td>
                <td className="flex items-center justify-center">
                    {isLoading ? (
                        <div className="w-36">
                            <Loading className="text-primary" />
                        </div>
                    ) : (
                        <div className="flex space-x-2 items-center justify-center w-36">
                            <button
                                className="btn w-20"
                                onClick={() => {
                                    if (showDelete) setShowDelete(false);
                                    if (isEditing) onCancel();

                                    setIsEditing(!isEditing);
                                }}
                            >
                                {isEditing ? "Cancel" : "Edit"}
                            </button>
                            {isEditing && (
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    )}

                    {showDelete && (
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                className="input input-bordered"
                                onChange={(e) => setDeleteName(e.target.value)}
                                value={deleteName}
                                placeholder={user.name}
                            />
                            <button
                                className="btn bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </td>
            </tr>
        </>
    );
}

export default Competitor;
