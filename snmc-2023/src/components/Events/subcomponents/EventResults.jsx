import React from "react";
import EventInfo from "./EventInfo";
import Loading from "../../Loading";

function EventResults({ events, refresh, isLoading }) {
    return (
        <div
            className={`flex flex-col flex-grow items-center justify-center space-y-8 ${
                events?.length !== 0 ? "!justify-start" : ""
            }`}
        >
            {isLoading ? (
                <Loading className="text-primary" />
            ) : events?.length === 0 ? (
                <div>No Results</div>
            ) : (
                events.map((event) => (
                    <EventInfo
                        event={event}
                        key={event.event_id}
                        refresh={refresh}
                    />
                ))
            )}
        </div>
    );
}

export default EventResults;
