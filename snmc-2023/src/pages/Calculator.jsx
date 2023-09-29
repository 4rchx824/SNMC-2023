import React, { useEffect, useState } from "react";

// type 1 = 1 input
// type 2 = 2 input
const types = [
    {
        name: "Spoken Number",
        inputType: 1,
    },
    {
        name: "5 Min Speed Cards",
        inputType: 2,
    },
    {
        name: "5 Min Binary Digits",
        inputType: 1,
    },
    {
        name: "5 Min Names & Faces",
        inputType: 1,
    },
    {
        name: "5 Min Random Numbers",
        inputType: 1,
    },
    {
        name: "5 Min Historic/Future Dates",
        inputType: 1,
    },
    {
        name: "5 Min Words",
        inputType: 1,
    },
    {
        name: "15 Min Abstract Images",
        inputType: 1,
    },
    {
        name: "15 Min Random Numbers",
        inputType: 1,
    },
    {
        name: "10 Min Speed Cards",
        inputType: 1,
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

        switch (type.name) {
            // this one is the 2 values
            case "5 Min Speed Cards":
                calculated_value = rawScore * (9386 / timeTaken ** 0.75);
                break;
            case "Spoken Number":
                calculated_value = Math.sqrt(rawScore) * 47.3;
                break;
            case "5 Min Binary Digits":
                calculated_value = rawScore;
                break;
            case "5 Min Names & Faces":
                calculated_value = rawScore * 10.5263;
                break;
            case "5 Min Random Numbers":
                calculated_value = rawScore * 1.8282;
                break;
            case "5 Min Historic/Future Dates":
                calculated_value = rawScore * 8;
                break;
            case "5 Min Words":
                calculated_value = rawScore * 8;
                break;
            case "15 Min Abstract Images":
                calculated_value = rawScore * 1.6584;
                break;
            case "15 Min Random Numbers":
                calculated_value = rawScore * 1.1111;
                break;
            case "10 Min Speed Cards":
                calculated_value = rawScore * 2.7397;
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
        useState("Spoken Number");
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
    return <div className="flex flex-grow items-center justify-center">
        <CalculatorBlock />
    </div>
}

export default Calculator;
