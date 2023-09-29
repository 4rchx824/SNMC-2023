import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/axios";
import EventInfo from "./subcomponents/EventInfo";
import Leaderboard from "./subcomponents/Leaderboard";

function Standings() {
    const axios = useAxiosPrivate();
    const [events, setEvents] = useState([]);

    const getEvents = async () => {
        try {
            const { data } = await axios.get("/events");
            setEvents(data);
        } catch (e) {
            console.error(e);
        }
    };

    const [selectedEvent, setSelectedEvent] = useState({
        event_id: "All",
    });

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <div className="flex flex-col w-full flex-grow items-center">
            <EventInfo event_id={selectedEvent.event_id} />
            <div className="form-control max-w-lg w-full pt-4">
                <label className="label">
                    <span className="label-text badge badge-primary text-white">
                        Event
                    </span>
                </label>
                <select
                    className="select select-bordered select-primary w-full max-w-lg"
                    value={selectedEvent.title}
                    onChange={(e) => {
                        setSelectedEvent({
                            event_id: e.target.value,
                        });
                    }}
                >
                    <option value="All">All</option>
                    {events.map((event) => (
                        <option value={event.event_id} key={event.event_id}>
                            {event.title}
                        </option>
                    ))}
                </select>
            </div>

            <Leaderboard event_id={selectedEvent.event_id} />
        </div>
    );
}

export default Standings;
