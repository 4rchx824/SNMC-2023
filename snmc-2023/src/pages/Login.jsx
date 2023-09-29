import React, { useEffect, useState } from "react";
import GeneralModal from "../components/GeneralModal";
import {
    ExclamationCircleIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

import Loading from "../components/Loading";
import useAxiosPrivate from "../hooks/axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

function Login() {
    const axios = useAxiosPrivate();
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    // modals
    const [errorModal, setErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState(
        "An unexpected error has occured!"
    );

    const [successModal, setSuccessModal] = useState(false);

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleFormUpdate = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        try {
            setIsLoading(true);
            const { data } = await axios.post("/auth", login);

            if (!data.uuid || !data.accessToken)
                throw new Error("An unexpected error has occured!");

            setUser(data.uuid);
            localStorage.setItem("auth", data.accessToken);

            navigate("/");
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setErrorMsg(e?.response?.data?.message || e?.message);

            setErrorModal(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log(!localStorage.getItem("auth"));
        if (!user === false && !localStorage.getItem("auth") === false) {
            setUser(localStorage.getItem("auth"));
            navigate("/");
        }
    }, []);

    return (
        <>
            <GeneralModal
                open={errorModal}
                onClose={() => setErrorModal(false)}
            >
                <div className="flex items-center justify-center space-x-2">
                    <ExclamationCircleIcon className="w-8 h-8 text-red-600" />
                    <p>{errorMsg}</p>
                </div>
            </GeneralModal>

            <GeneralModal
                open={successModal}
                onClose={() => setSuccessModal(false)}
            >
                <div className="flex items-center justify-center space-x-2">
                    <CheckCircleIcon className="w-8 h-8 text-green-600" />
                    <p>Login successful!</p>
                </div>
            </GeneralModal>

            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse min-w-full">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Login is for Admins{" "}
                            <label className="underline">only</label>
                        </p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    onChange={handleFormUpdate}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    onChange={handleFormUpdate}
                                />
                            </div>

                            {isLoading && (
                                <Loading className="self-center mt-6" />
                            )}

                            <div className="form-control mt-6">
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
