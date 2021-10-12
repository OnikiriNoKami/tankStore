import { useState } from "react";
import SelectMultipleCheck from "../../components/utils/SelectMultipleCheck";

const useMultipleSelect = (list = [], { label = "" }) => {
    const [values, setValues] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setValues(value);
    };

    const handleClear = () => {
        if (values.length !== 0) {
            setValues([]);
        }
    };

    const render = () => {
        return (
            <SelectMultipleCheck
                onChange={handleChange}
                selectLabel={label}
                values={values}
                list={list}
            />
        );
    };

    return {
        values,
        render,
        clear: handleClear,
    };
};

export default useMultipleSelect;
