import React, { useEffect, useState } from "react";

// type 1 = 1 input
// type 2 = 2 input
const types = [
    {
        name: "5 Min Names & Faces",
        inputType: 1,
    },
    {
        name: "5 Min Binary Digits",
        inputType: 1,
    },
    {
        name: "15 Min Abstract Images",
        inputType: 1,
    },
    {
        name: "5 Min Speed Numbers",
        inputType: 1,
    },
    {
        name: "5 Min Historic/Future Dates",
        inputType: 1,
    },
    {
        name: "10 Min Cards",
        inputType: 1,
    },
    {
        name: "5 Min Random Words",
        inputType: 1,
    },
    {
        name: "15 Min Random Numbers",
        inputType: 1,
    },
    {
        name: "Spoken Number",
        inputType: 1,
    },
    {
        name: "5 Min Speed Cards",
        inputType: 2,
    },
];

const Calculate = ({ selectedCalculator }) => {
    const type = types.filter((t) => t.name === selectedCalculator)[0];

    const [rawScore, setRawScore] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [pts, setPts] = useState(0);

    useEffect(() => {
        setTimeTaken(null);
        setRawScore(null);
    }, [selectedCalculator]);

    useEffect(() => {
        let calculated_value = 0;

        let new_score = parseFloat(rawScore);
        let time_taken = parseFloat(timeTaken);

        switch (type.name) {
            // this one is the 2 values
            case "5 Min Names & Faces":
                calculated_value = (new_score / 95) * 1000;
                break;
            case "5 Min Binary Digits":
                calculated_value = new_score;
                break;
            case "15 Min Abstract Images":
                calculated_value = (new_score / 697) * 1000;
                break;
            case "5 Min Speed Numbers":
                calculated_value = (new_score / 547) * 1000;
                break;
            case "5 Min Historic/Future Dates":
                calculated_value = (new_score / 125) * 1000;
                break;
            case "10 Min Cards":
                calculated_value = (new_score / 407) * 1000;
                break;
            case "5 Min Random Words":
                calculated_value = (new_score / 125) * 1000;
                break;
            case "15 Min Random Numbers":
                calculated_value = (new_score / 900) * 1000;
                break;
            case "Spoken Number":
                calculated_value = Math.sqrt(new_score) * 47.3;
                break;
            case "5 Min Speed Cards":
                calculated_value =
                    new_score === 52
                        ? 9386 / time_taken ** 0.75
                        : (130.21 * new_score) / 52;
                break;
        }
        setPts(Math.ceil(calculated_value));
    }, [rawScore, timeTaken]);
    return (
        <div className="flex space-x-4 items-center">
            <div className="form-control w-full max-w-xs">
                <input
                    className="input input-bordered w-full max-w-xs"
                    placeholder="Raw Score"
                    value={rawScore}
                    onChange={(e) => setRawScore(e.target.value)}
                />
            </div>

            {type.inputType === 2 && (
                <div className="form-control w-full max-w-xs">
                    <input
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Time (in seconds)"
                        value={timeTaken}
                        onChange={(e) => setTimeTaken(e.target.value)}
                    />
                </div>
            )}

            <h1>=</h1>
            <div className="form-control w-full max-w-xs">
                <input
                    className="input input-bordered w-full max-w-xs"
                    disabled
                    value={pts}
                />
            </div>
        </div>
    );
};

export const CalculatorBlock = () => {
    const [selectedCalculator, setSelectedCalculator] =
        useState("5 Min Names & Faces");
    return (
        <div className="flex flex-col p-4 self-center">
            <div className="flex items-end space-x-4">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text badge badge-primary text-white">
                            Calculator Type
                        </span>
                    </label>
                    <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setSelectedCalculator(e.target.value)}
                    >
                        {types.map((type) => (
                            <option value={type.name}>{type.name}</option>
                        ))}
                    </select>
                </div>

                <Calculate selectedCalculator={selectedCalculator} />
            </div>
        </div>
    );
};

function Calculator() {
    return (
        <div className="flex flex-grow items-center justify-center">
            <CalculatorBlock />
        </div>
    );
}

export default Calculator;
