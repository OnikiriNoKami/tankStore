import { useEffect, useState } from "react"
import useValidation from "./useValidation"

const useValidatedInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const [def, setDefault] = useState(initialValue)
    const [isDefault, setIsDefault] = useState(true)
    const valid = useValidation(value, validations)
    const [errorStatus, setErrorStatus] = useState(false)

    const changeHandler = (e) => {
        setValue(e.target.value)
    }

    const setDefaultValue = (value) => {
        setDefault(value);
        setValue(value)
    }

    const toDefault = () => {
        if(value !== def){
            setValue(def)
        }
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }
    const clear = () => {
        setValue('')
        setIsDirty(false)
    }

    useEffect(()=>{
        setErrorStatus(isDirty&&!valid.validInput)
    }, [valid.validInput, isDirty])
    useEffect(()=>{
        if(def === value){
            setIsDefault(true)
        } else {
            setIsDefault(false)
        }
    }, [def, value])

    return {
        value,
        clear,
        onChange: changeHandler,
        isDefault,
        setDefault,
        setValue,
        onBlur, 
        isDirty,
        errorStatus,
        setDefaultValue,
        toDefault,
        ...valid
    }
}

export default useValidatedInput