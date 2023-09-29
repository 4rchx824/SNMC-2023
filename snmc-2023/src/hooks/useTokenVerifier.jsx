import useAxiosPrivate from "./axios";

function useTokenVerifier() {
    const axios = useAxiosPrivate();

    const verifyToken = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post("/verify");
                resolve(response);
            } catch (e) {
                reject(e);
            }
        });
    };

    return verifyToken;
}

export default useTokenVerifier;
