import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import { useAuth } from "../context/auth";
import useTokenVerifier from "./useTokenVerifier";

const useAxiosPrivate = () => {
    const { user } = useAuth();
    let auth = user;

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => Promise.reject(error)
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [user]);

    return axiosPrivate;
};

export default useAxiosPrivate;
