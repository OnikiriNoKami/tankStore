import { useState, useEffect, forwardRef } from "react";
import NumberFormat from "react-number-format";

const render = forwardRef((props, ref) => {
    const { onChange, inputRef,...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            allowNegative={false}
        />
    );
});

const useNumberFormat = (defaultValue='') => {
    const [value, setValue] = useState(defaultValue);
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState(false);
    const [validInput, setValidInput] = useState(false);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onBlur = () => {
        setDirty(true)
    }

    const clear = () => {
        setValue(defaultValue)
        setDirty(false)
    }
    

    useEffect(()=>{
        if(dirty&&value.length===0){
            
            setError(true)
        } else {
            setError(false)
        }
    }, [value, dirty])

    useEffect(()=>{
        if(error&&dirty){
            setValidInput(false)
        } else {
            setValidInput(true)
        }
    }, [dirty, error])

    return {
        render,
        onChange,
        value,
        onBlur,
        clear,
        error,
        validInput
    };
};

export default useNumberFormat;
