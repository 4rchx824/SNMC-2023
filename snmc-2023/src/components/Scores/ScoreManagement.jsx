import {
    ChartBarIcon,
    TrophyIcon,
} from "@heroicons/react/24/outline";

import Scores from "./Scores";
import Standings from "./Standings";
import { useState } from "react";

const ScoreManagement = () => {
    const [activeTab, setActiveTab] = useState("Scores");

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const Pages = {
        Scores: <Scores />,
        Standings: <Standings />,
    };

    const Icons = {
        Scores: <TrophyIcon className="w-4 h-4 mr-2" />,
        Standings: <ChartBarIcon className="w-4 h-4 mr-2" />,
    };

    return (
        <div className="flex flex-grow flex-col w-full">
            <div className="p-4 self-center">
                <div className="tabs">
                    {Object.keys(Pages).map((tabName) => (
                        <button
                            key={tabName}
                            className={`tab tab-bordered transition-all outline-none ${
                                activeTab === tabName
                                    ? "tab-active text-primary"
                                    : ""
                            }`}
                            onClick={() => handleTabClick(tabName)}
                        >
                            {Icons[tabName]}
                            {tabName}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-grow p-4">{Pages[activeTab]}</div>
        </div>
    );
};

export default ScoreManagement;
