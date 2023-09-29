import React, { useState } from "react";
import { useAuth } from "../../../context/auth";
import {
    PencilSquareIcon,
    BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import GeneralModal from "../../GeneralModal";
import EditUserInfo from "./EditUserInfo";

function UserInfo({ user, refresh }) {
    const auth = useAuth();
    let { uuid } = auth.user;

    const [editOpen, setEditOpen] = useState(false);
    // {
    //     uuid: '6a85e48e-1577-4c3d-90b0-f091c488dace',
    //     email: 'archielaw824@gmail.com',
    //     name: 'Archie',
    //     password: '$2b$10$FocXLSM6oPMn4XvkZ2/Pd.ElYuBNrlNEglS7w.sniucFLKk2toOQq',
    //     role: 'ADMIN',
    //     organisation: 'ORGANISER',
    //     seat: null,
    //     gender: 'M'
    //   }
    return (
        <>
            <GeneralModal open={editOpen} onClose={() => setEditOpen(false)}>
                <EditUserInfo user={user} setEditOpen={setEditOpen} refresh={refresh}/>
            </GeneralModal>
            <div
                className={`border border-gray-300 rounded-xl p-4 shadow-sm w-full max-w-5xl flex flex-col justify-between ${
                    uuid === user.uuid
                        ? "border-2 !border-primary relative"
                        : ""
                }`}
            >
                {uuid === user.uuid ? (
                    <div className="absolute -top-7 right-1 bg-primary px-4 rounded-tl-md rounded-tr-md">
                        <h1 className=" text-white text-lg font-bold">You</h1>
                    </div>
                ) : (
                    ""
                )}
                <div className="flex items-center justify-between">
                    <div className="w-full max-w-xs">
                        <h1 className="text-gray-400">Name</h1>
                        <h1 className="font-bold text-4xl truncate pb-2">
                            {user.name}
                        </h1>
                    </div>

                    <div>
                        <h1 className="text-gray-400">Seat</h1>
                        <h1 className="font-bold text-4xl">
                            {user.seat ?? "NA"}
                        </h1>
                    </div>

                    <div>
                        <h1 className="text-gray-400">Gender</h1>
                        <h1 className="font-bold text-4xl">
                            {user.gender ?? "NA"}
                        </h1>
                    </div>

                    <div className="w-full max-w-xs">
                        <h1 className="text-gray-400">Role</h1>
                        <h1 className="font-bold text-4xl">
                            {user.role ?? "NA"}
                        </h1>
                    </div>
                </div>
                <div className="py-4">
                    <h1>{user.email ?? "NA"}</h1>
                    <h1
                        className={`badge badge-primary ${
                            user.role === "COMPETITOR" ? "!badge-info" : ""
                        }`}
                    >
                        <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                        {user.organisation ?? "NA"}
                    </h1>
                </div>
                <div className="flex items-center justify-between">
                    <h1 className="text-gray-400 text-sm">{user.uuid}</h1>
                    {user.role !== "ADMIN" && (
                        <button
                            className="btn btn-ghost"
                            onClick={() => setEditOpen(true)}
                        >
                            <PencilSquareIcon className="w-6 h-6 text-primary" />
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}

export default UserInfo;
