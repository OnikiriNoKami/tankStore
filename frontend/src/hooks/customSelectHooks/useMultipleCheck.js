import { useEffect, useState } from "react";
import SelectMultipleCheck from "../../components/utils/SelectMultipleCheck";

const useMultipleSelect = (list = [], { label = "" }) => {
    const [values, setValues] = useState([]);
    const [isDirty, setIsDirty] = useState(false);
    const [validInput, setValidInput] = useState(false);

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
        if(isDirty){
            setIsDirty(false);
        }
    };

    const handleDirty = () => {
        if(!isDirty){
            setIsDirty(true)
        }
    }

    useEffect(()=>{
        if(isDirty&&values.length!==0){
            setValidInput(true);
        } else {
            setValidInput(false);
        }
    }, [isDirty, values])

    const render = () => {
        return (
            <SelectMultipleCheck
                onChange={handleChange}
                onFocus={handleDirty}
                selectLabel={label}
                values={values}
                list={list}
            />
        );
    };

    return {
        values,
        dirty: isDirty,
        valid: validInput,
        render,
        clear: handleClear,
    };
};

export default useMultipleSelect;
