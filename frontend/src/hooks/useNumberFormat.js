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
    const [def, setDef]= useState(defaultValue);
    const [isDefault, setIsDefault] = useState(true);

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const setDefault = (value) => {
        setDef(value);
        setValue(value);
    }

    const onBlur = () => {
        setDirty(true)
    }
    
    const toDefault = () => {
        if(value!==def){
            setValue(def)
        }
    }

    const clear = () => {
        if(dirty){
        setValue(defaultValue)
        setDirty(false)}
    }
    

    useEffect(()=>{
        if(dirty&&value.length===0){
            
            setError(true)
        } else {
            setError(false)
        }

        if(value===def){
            setIsDefault(true)
        } else {
            setIsDefault(false)
        }
    }, [value, dirty])

    useEffect(()=>{
        if(error&&dirty){
            setValidInput(false)
        }
        if(!error&&dirty) {
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
        validInput,
        dirty,
        setDefault,
        isDefault,
        toDefault,
        def,
    };
};

export default useNumberFormat;
