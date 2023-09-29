import React, { useEffect, useState } from "react";
import {
    MagnifyingGlassIcon,
    UserPlusIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import GeneralModal from "../GeneralModal";
import UserResults from "./subcomponents/UserResults";
import Pagination from "../Pagination";
import useAxiosPrivate from "../../hooks/axios";
import AddUser from "./AddUser";

function UserManagement() {
    const axios = useAxiosPrivate();

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState({
        maxPage: 1,
        count: 0,
    });

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState(
        "An Unexpcted Error has occured"
    );

    const [addUserOpen, setAddUserOpen] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            let search = new URLSearchParams({
                name: name,
                page: currentPage,
            }).toString();

            const { data } = await axios.get(`/users/search?` + search);
            let { results, stats } = data;

            setUsers(results);
            setMaxPage(stats);
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setModalMessage(e?.response?.data?.message || e?.message);

            setModalIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const submitSearch = async (e) => {
        e.preventDefault();
        handleSearch();
    };

    useEffect(() => {
        handleSearch();
    }, [currentPage]);

    return (
        <>
            <GeneralModal
                open={addUserOpen}
                onClose={() => setAddUserOpen(false)}
            >
                <AddUser
                    setAddUserOpen={setAddUserOpen}
                    refresh={handleSearch}
                    isOpen={addUserOpen}
                />
            </GeneralModal>

            <GeneralModal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            >
                <div className="flex items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <h1>{modalMessage}</h1>
                </div>
            </GeneralModal>

            <div className="p-4 w-full flex flex-col space-y-8">
                <div className="flex items-center justify-center w-full space-x-4">
                    <form className="w-full max-w-lg" onSubmit={submitSearch}>
                        <div className="flex items-center input input-bordered input-primary">
                            <input
                                type="text"
                                placeholder="Search by name"
                                className="w-full focus:outline-none"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button type="submit" onClick={submitSearch}>
                                <MagnifyingGlassIcon className="w-8 h-8" />
                            </button>
                        </div>
                    </form>

                    <button
                        className="btn btn-primary"
                        onClick={() => setAddUserOpen(true)}
                    >
                        <h1>Create User</h1>
                        <UserPlusIcon className="w-6 h-6" />
                    </button>
                </div>

                <p className="text-sm text-gray-700 self-center">
                    Showing{" "}
                    <span className="font-medium">
                        {(currentPage - 1) * 5 + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                        {currentPage * 5 > maxPage.count
                            ? maxPage.count
                            : currentPage * 5}
                    </span>{" "}
                    of <span className="font-medium">{maxPage.count}</span>{" "}
                    results
                </p>

                <div className="flex flex-grow">
                    <UserResults
                        users={users}
                        isLoading={isLoading}
                        refresh={handleSearch}
                    />
                </div>

                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    maxPage={maxPage.maxPage}
                />
            </div>
        </>
    );
}

export default UserManagement;
