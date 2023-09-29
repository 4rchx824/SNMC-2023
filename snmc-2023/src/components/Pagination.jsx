import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, setCurrentPage, maxPage }) => {
    const handleFirst = () => {
        setCurrentPage(1);
    };

    const handleLast = () => {
        setCurrentPage(maxPage);
    };

    const handleNext = () => {
        if (!(currentPage + 1 > maxPage)) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (!(currentPage - 1 < 1)) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-row justify-center mb-8 py-4">
            <div className="flex items-center border border-slate-900 border-opacity-25 rounded-lg">
                <button
                    className="shadow-lg px-4 py-2 text-sm font-medium text-primary border-r bg-white border-0 border-slate-400 rounded-l-lg"
                    onClick={handleFirst}
                >
                    <ChevronDoubleLeftIcon className="w-6 h-6 text-primary" />
                </button>
                <button
                    className="shadow-lg px-4 py-2 text-sm font-medium bg-white border-0 border-mainOrange rounded-r-lg"
                    onClick={handlePrev}
                >
                    Prev
                </button>
            </div>
            <div className="inline-flex items-center px-4 py-2 mx-1 rounded-lg text-sm text-black font-bold border border-slate-400 bg-white shadow-lg">
                {currentPage}
            </div>
            <div className="flex items-center border border-slate-900 border-opacity-25 rounded-lg">
                <button
                    className="shadow-lg px-4 py-2 text-sm font-medium bg-white border-0 border-mainOrange rounded-l-lg"
                    onClick={handleNext}
                >
                    Next
                </button>
                <button
                    className="shadow-lg px-4 py-2 text-sm font-medium border-l bg-white border-0 border-slate-400 rounded-r-lg"
                    onClick={handleLast}
                >
                    <ChevronDoubleRightIcon className="w-6 h-6 text-primary" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
