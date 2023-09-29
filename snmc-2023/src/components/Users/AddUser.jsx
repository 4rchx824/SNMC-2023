import React, { useEffect, useState } from "react";
import {
    TrashIcon,
    XCircleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Loading from "../Loading";
import useAxiosPrivate from "../../hooks/axios";

function AddUser({ isOpen, setAddUserOpen, refresh }) {
    const axios = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errMsg, setErrMsg] = useState("An unexpected error has occured!");

    const [showSuccess, setShowSuccess] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        organisation: "",
        seat: "",
        role: "",
        gender: "",
        password: "",
        email: "",
    });

    const handleFormReset = () => {
        setFormData({
            name: "",
            organisation: "",
            seat: "",
            role: "",
            gender: "",
            password: "",
            email: "",
        });
    };

    const updateFormData = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateUser = async () => {
        setIsLoading(true);
        setShowError(false);
        setShowSuccess(false);
        try {
            const { data } = await axios.post("/users/create", formData);

            if (data.uuid) {
                setShowSuccess(true);
                handleFormReset();
                refresh();
            } else {
                throw new Error("Failed to create user");
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
        setFormData({
            name: "",
            organisation: "",
            seat: "",
            role: "",
            gender: "",
            password: "",
            email: "",
        });
        setShowError(false);
        setShowSuccess(false);
    }, [isOpen]);

    return (
        <div className="flex flex-col w-full max-w-lg">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-primary">Create User</h1>
                <button onClick={handleFormReset}>
                    <TrashIcon className="w-6 h-6 text-red-600 hover:-translate-y-1 transition-all" />
                </button>
            </div>

            <div className="flex items-center justify-center space-x-4">
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        name="name"
                        value={formData.name}
                        onChange={updateFormData}
                    />
                </div>

                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text">Organisation</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        name="organisation"
                        value={formData.organisation}
                        onChange={updateFormData}
                    />
                </div>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-2">
                <div className="form-control w-full max-w-lg">
                    <label className="label">
                        <span className="label-text badge badge-primary text-white">
                            Seat
                        </span>
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. A1"
                        className="input input-bordered w-full max-w-xs"
                        onChange={updateFormData}
                        value={formData.seat}
                        name="seat"
                        maxLength={2}
                    />
                </div>
                <div className="form-control w-full max-w-lg">
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text badge badge-secondary text-white">
                                Role
                            </span>
                        </label>
                        <select
                            className="select select-bordered"
                            onChange={updateFormData}
                            value={formData.role}
                            name="role"
                        >
                            <option value="" disabled>
                                Select
                            </option>
                            <option>Competitor</option>
                            <option>Admin</option>
                        </select>
                    </div>
                </div>
                <div className="form-control w-full max-w-lg">
                    <div className="form-control w-full max-w-xs">
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
                            <option value="" disabled>
                                Select
                            </option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                </div>
            </div>

            {formData.role === "Admin" && (
                <>
                    <div className="form-control w-full pt-4">
                        <label className="label">
                            <span className="label-text badge badge-neutral text-white">
                                Email
                            </span>
                        </label>
                        <input
                            type="text"
                            placeholder="example@gmail.com"
                            className="input input-bordered w-full"
                            onChange={updateFormData}
                            value={formData.email}
                            name="email"
                        />
                    </div>
                    <div className="form-control w-full pt-4">
                        <label className="label">
                            <span className="label-text badge badge-neutral text-white">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="******"
                            className="input input-bordered w-full"
                            onChange={updateFormData}
                            value={formData.password}
                            name="password"
                        />
                    </div>
                </>
            )}

            <div className="divider"></div>

            <>
                {isLoading && <Loading className={"text-primary"} />}
                {showError && (
                    <div className="alert border-0 bg-base-100">
                        <XCircleIcon className="w-6 h-6 text-red-600" />
                        <span>{errMsg}</span>
                    </div>
                )}
                {showSuccess && (
                    <div className="alert border-0 bg-base-100">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                        <span>Successfully created new user!</span>
                    </div>
                )}
            </>

            <div className="flex items-center justify-center space-x-4 self-end pt-4">
                <button className="btn" onClick={() => setAddUserOpen(false)}>
                    Cancel
                </button>

                <button
                    className="btn btn-primary !px-8"
                    onClick={handleCreateUser}
                >
                    Create User
                </button>
            </div>
        </div>
    );
}

export default AddUser;
