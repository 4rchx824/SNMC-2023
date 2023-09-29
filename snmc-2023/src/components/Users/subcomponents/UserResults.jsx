import React from "react";
import Loading from "../../Loading";
import UserInfo from "./UserInfo";

function UserResults({ users, isLoading, refresh }) {
    return (
        <div
            className={`flex flex-col flex-grow items-center justify-center space-y-4 ${
                users?.length !== 0 ? "!justify-start" : ""
            }`}
        >
            {isLoading ? (
                <Loading />
            ) : users?.length === 0 ? (
                <div>No Results</div>
            ) : (
                users.map((user) => <UserInfo user={user} key={user.uuid} refresh={refresh} />)
            )}
        </div>
    );
}

export default UserResults;
