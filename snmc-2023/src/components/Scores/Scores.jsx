import React from "react";
import { useState } from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import GeneralModal from "../GeneralModal";
import AddScore from "./subcomponents/AddScore";
import SelectedEvent from "./subcomponents/SelectedEvent";
import { useEffect } from "react";
import useAxiosPrivate from "../../hooks/axios";
import Loading from "../Loading";
import CompetitorTable from "./subcomponents/CompetitorTable";
import { CalculatorBlock } from "../../pages/Calculator";

function Scores() {
    const axios = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState("");
    const [events, setEvents] = useState([]);
    const [addScoreOpen, setAddScoreOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState(
        "An unexpected error has occured"
    );

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("/events/selections");

            setEvents(data);
        } catch (e) {
            console.error(e);
            if (e?.response?.data?.message || e?.message)
                setModalMessage(e?.response?.data?.message || e?.message);

            setModalIsOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <GeneralModal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            >
                <div className="flex items-center justify-center space-x-2">
                    <XCircleIcon className="w-6 h-6 text-red-600" />
                    <h1>{modalMessage}</h1>
                </div>
            </GeneralModal>
            <GeneralModal
                open={addScoreOpen}
                onClose={() => setAddScoreOpen(false)}
            >
                <AddScore
                    event_id={selectedEvent}
                    setAddScoreOpen={setAddScoreOpen}
                    isOpen={addScoreOpen}
                />
            </GeneralModal>
            <div className="flex flex-col flex-grow">
                <SelectedEvent event_id={selectedEvent} />
                <CalculatorBlock />
                <div className="flex items-end justify-center space-x-4 pt-8">
                    <div className="form-control max-w-lg w-full">
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <select
                                className="select select-bordered"
                                onChange={(e) =>
                                    setSelectedEvent(e.target.value)
                                }
                                value={selectedEvent}
                            >
                                <option disabled value="">
                                    Select event
                                </option>
                                {events.map((event) => (
                                    <option
                                        value={event.event_id}
                                        key={event.event_id}
                                    >
                                        {event.title}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() => setAddScoreOpen(true)}
                    >
                        <h1>Add Score</h1>
                        <PlusCircleIcon className="w-6 h-6" />
                    </button>
                </div>

                <div
                    className={
                        "flex flex-grow items-center justify-center " +
                        (selectedEvent !== "" ? "!items-start pt-4" : "")
                    }
                >
                    {selectedEvent === "" ? (
                        <h1>Please select event</h1>
                    ) : (
                        <CompetitorTable
                            event_id={selectedEvent}
                            addScoreOpen={addScoreOpen}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

export default Scores;
