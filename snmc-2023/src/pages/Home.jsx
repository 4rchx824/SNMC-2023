import {
    ChartBarIcon,
    ListBulletIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

import Current from "../components/Home/Current";
import Overall from "../components/Home/Overall";
import Others from "../components/Home/Others";
import { useState } from "react";

const Home = () => {
    const [activeTab, setActiveTab] = useState("Current");

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const Pages = {
        Current: <Current />,
        Overall: <Overall />,
        Others: <Others />,
    };

    const Icons = {
        Current: <ClockIcon className="w-4 h-4 mr-2" />,
        Overall: <ChartBarIcon className="w-4 h-4 mr-2" />,
        Others: <ListBulletIcon className="w-4 h-4 mr-2" />,
    };

    return (
        <div className="flex flex-grow flex-col w-full">
            <div className="p-4 self-center">
                <div className="tabs max-w-sm w-full">
                    {Object.keys(Pages).map((tabName) => (
                        <button
                            key={tabName}
                            className={`tab tab-bordered transition-all outline-none tab-sm ${
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

            <div className="flex flex-grow">{Pages[activeTab]}</div>
        </div>
    );
};

export default Home;
