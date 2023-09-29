import React, { useState, useEffect } from "react";
import EventStatuses from "./EventStatuses";
import CurrentEvent from "./CurrentEvent";
import {
    MagnifyingGlassIcon,
    CalendarDaysIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../Pagination";
import GeneralModal from "../GeneralModal";
import useAxiosPrivate from "../../hooks/axios";
import EventResults from "./subcomponents/EventResults";
import Loading from "../Loading";
import AddEvent from "./AddEvent";

function EventManagement() {
    const axios = useAxiosPrivate();
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [addEventOpen, setAddEventOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState(
        "An unexpected error has occured"
    );
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState({
        maxPage: 1,
        count: 0,
    });
    const [events, setEvents] = useState([]);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            let search = new URLSearchParams({
                name: name,
                page: currentPage,
            }).toString();

            const { data } = await axios.get(`/events/search?` + search);
            let { results, stats } = data;

            setEvents(results);
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
                open={addEventOpen}
                onClose={() => setAddEventOpen(false)}
            >
                <AddEvent refresh={handleSearch} isOpen={addEventOpen} />
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
            <div className="p-4 flex flex-grow flex-col space-y-8">
                <div className="flex space-x-4">
                    <CurrentEvent />
                    <EventStatuses />
                </div>

                <div className="flex justify-center items-center w-full space-x-2">
                    <form className="w-full max-w-lg" onSubmit={submitSearch}>
                        <div className="flex items-center input input-bordered input-primary max-w-lg">
                            <input
                                type="text"
                                placeholder="Search by event title"
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
                        onClick={() => setAddEventOpen(true)}
                    >
                        <h1>Create Event</h1>
                        <CalendarDaysIcon className="w-6 h-6" />
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
                    <EventResults
                        events={events}
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

export default EventManagement;
