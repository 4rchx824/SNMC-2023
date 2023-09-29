import React, { useState } from "react";
import Loading from "../../Loading";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import useAxiosPrivate from "../../../hooks/axios";

function EditUserInfo({ user, setEditOpen, refresh }) {
    const axios = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errMsg, setErrMsg] = useState("An unexpected error has occured!");
    const [showDelete, setShowDelete] = useState(false);
    const [deleteName, setDeleteName] = useState("");

    const [formData, setFormData] = useState({
        organisation: user.organisation,
        seat: user.seat,
        gender: user.gender === "M" ? "Male" : "Female",
        name: user.name,
    });

    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    // {
    //     uuid: 'd12ca299-9339-46a7-9392-de54332c5a5a',
    //     email: null,
    //     name: 'Glynis',
    //     password: null,
    //     role: 'COMPETITOR',
    //     organisation: 'SP MSC',
    //     seat: 'A1',
    //     gender: 'F'
    //   }

    // update organisation, seat, gender, name
    const handleUpdateUser = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            const { data } = await axios.put(
                `/users/update/${user.uuid}`,
                formData
            );
            console.log(data);
            if (data.success) {
                refresh();
            } else {
                throw new Error("Failed to update user");
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

    const handleDeleteUser = async () => {
        setIsLoading(true);
        setShowError(false);
        try {
            if (deleteName !== user.name)
                throw new Error("Please type in correct name");
            const { data } = await axios.delete(`/users/delete/${user.uuid}`);

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
        <div className="flex flex-col max-w-lg w-full">
            <h1
                className="text-sm self-start text-gray-400"
                onClick={() => setShowDelete(!showDelete)}
            >
                Edit User
            </h1>
            <h1 className="text-xs text-gray-500 pt-2">{user.uuid}</h1>
            <h1 className="text-4xl text-primary font-bold">{user.name}</h1>
            <div className="flex items-center space-x-2 pt-2">
                <h1 className="badge badge-info">
                    {user.organisation ?? "NA"}
                </h1>
                <h1 className="text-sm text-black">{user.role}</h1>
            </div>

            <div className="flex pt-4 space-x-4 items-center  justify-center">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        name="name"
                        value={formData.name}
                        onChange={updateFormData}
                    />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text badge badge-accent  text-white">
                            Gender
                        </span>
                    </label>
                    <select
                        className="select select-bordered"
                        onChange={updateFormData}
                        value={formData.gender}
                        name="gender"
                    >
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4 pb-4">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text badge badge-primary text-white">
                            Seat
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        name="seat"
                        value={formData.seat}
                        onChange={updateFormData}
                        maxLength={2}
                    />
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Organisation</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        name="organisation"
                        value={formData.organisation}
                        onChange={updateFormData}
                    />
                </div>
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
            <div className="flex items-center justify-end space-x-2 pt-4">
                <button className="btn" onClick={() => setEditOpen(false)}>
                    Cancel
                </button>
                <button className="btn btn-primary" onClick={handleUpdateUser}>
                    Update
                </button>
            </div>

            {showDelete && (
                <>
                    <div className="divider text-red-600 font-bold">
                        DANGER ZONE
                    </div>
                    <input
                        type="text"
                        name="delete"
                        className="input input-bordered w-full mb-2"
                        placeholder={user.name}
                        onChange={(e) => setDeleteName(e.target.value)}
                        value={deleteName}
                    />
                    <button
                        className="btn bg-red-600 text-white hover:bg-red-700 transition-all"
                        onClick={handleDeleteUser}
                    >
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}

export default EditUserInfo;
