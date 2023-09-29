import React from "react";

function Podium({ standings }) {
    let first = standings[0] ?? null;
    let second = standings[1] ?? null;
    let third = standings[2] ?? null;

    return (
        <div className="flex items-end justify-center w-full max-w-sm lg:max-w-xl">
            <div className="flex flex-col items-center w-1/3">
                <h1 className="pb-4 text-center px-4 font-bold text-sm text-gray-400">
                    {second?.name ?? "TBA"}
                </h1>
                <div className="h-48 border border-r-0 w-full flex justify-center items-center bg-slate-200 shadow-lg relative">
                    <h1 className="bg-gray-400 px-4 py-2 font-bold rounded-full text-black self-start mt-8">
                        2
                    </h1>
                    <div className="absolute w-36 lg:w-52 bg-slate-100 h-2 -top-1 shadow-md">
                        &nbsp;
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/3 z-10">
                <h1 className="pb-4 text-center px-4 font-bold text-sm text-yellow-400">
                    {first?.name ?? "TBA"}
                </h1>
                <div className="h-72 border w-full flex justify-center items-center bg-slate-100 shadow-lg relative">
                    <h1 className="bg-yellow-400 px-4 py-2 font-bold rounded-full text-black self-start mt-8">
                        1
                    </h1>
                    <div className="absolute w-36 lg:w-52 bg-slate-200 h-2 -top-1 shadow-md">
                        &nbsp;
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-1/3">
                <h1 className="pb-4 text-center px-4 font-bold text-sm text-yellow-700">
                    {third?.name ?? "TBA"}
                </h1>
                <div className="h-24 border border-l-0 w-full flex justify-center items-center bg-slate-300 shadow-lg relative">
                    <h1 className="bg-yellow-700 px-4 py-2 font-bold rounded-full text-black self-start mt-8">
                        3
                    </h1>
                    <div className="absolute w-36 lg:w-52 bg-slate-200 h-2 -top-1 shadow-md">
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Podium;
