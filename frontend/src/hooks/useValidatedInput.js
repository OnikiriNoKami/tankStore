import { useEffect, useState } from "react"
import useValidation from "./useValidation"

const useValidatedInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const valid = useValidation(value, validations)
    const [errorStatus, setErrorStatus] = useState(false)

    const changeHandler = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }
    const clear = () => {
        setValue('')
    }

    useEffect(()=>{
        setErrorStatus(isDirty&&!valid.validInput)
    }, [valid.validInput, isDirty])

    return {
        value,
        clear,
        onChange: changeHandler,
        onBlur, 
        isDirty,
        errorStatus,
        ...valid
    }
}

export default useValidatedInput