import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";

function GeneralModal({ open, onClose, children }) {
    return (
        <div
            onClick={onClose}
            className={`z-50 fixed inset-0 flex justify-center items-center transition-colors !m-0 ${
                open ? "visible bg-black/20" : "invisible"
            }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all ${
                    open ? "scale-100 opacity-100" : "scale-125 opacity-0"
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-1 right-1 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 transition-all"
                >
                    <XMarkIcon className="h-4 w-4" />
                </button>
                {children}
            </div>
        </div>
    );
}

export default GeneralModal;
