import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import useTokenVerifier from "../hooks/useTokenVerifier";
import Loading from "./Loading";
import GeneralModal from "./GeneralModal";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";

const PersistLogin = ({ allowedRoles }) => {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("An unexpected error has occured!");

    const [isLoading, setIsLoading] = useState(true);
    const verify = useTokenVerifier();
    const { user, setUser } = useAuth();

    const navigate = useNavigate();

    const handleExpiredToken = () => {
        setUser({});
        localStorage.clear();
        navigate("/login");
    };

    const verifyToken = async () => {
        try {
            const { data } = await verify();
            setUser({
                ...user,
                ...data,
            });
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setMsg(e?.response?.data?.message || e?.message);

            if (e?.response?.status === 401)
                setMsg("Your access has expired! Redirecting to login...");

            setOpen(true);

            if (e?.response?.status === 401) {
                await new Promise((resolve) => {
                    setTimeout(() => {
                        handleExpiredToken();
                        resolve();
                    }, 3000);
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verifyToken();
    }, [location.pathname]);
    return (
        <>
            <GeneralModal open={open} onClose={() => setOpen(false)}>
                <div className="flex items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <p>{msg}</p>
                </div>
            </GeneralModal>
            {isLoading ? (
                <div className="h-screen flex">
                    <Loading />
                </div>
            ) : !allowedRoles.includes(user.role) ? (
                <Navigate to="/" />
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
