import React, { useState } from 'react';

const RadioSelect = ({ label, repeat , name}) => {
    const [cLabel, setLabel] = useState(label);
    const [nRepeat, setRepeat] = useState(repeat);
    const [cName, setName] = useState(name);

    var rows = [], i = 0, len = nRepeat;
    while (++i <= len) rows.push(i);

    return (
        <div>
            {rows.map(function (i, x) {
                return (
                    <li key={x} className="my-1">
                        <input id={cLabel+'_'+i} type="radio" name={cName} value={i} className="hidden peer" />
                        <label for={cLabel+'_'+i} className="inline-flex items-center justify-between w-full py-1 px-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            {i+'+ '+cLabel}
                        </label>
                    </li>
                    );
            })}
        </div>
    )
}

export default RadioSelect;