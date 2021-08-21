import { useState } from "react"
import useValidation from "./useValidation"

const useValidatedInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const valid = useValidation(value, validations)
    
    const changeHandler = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }

    return {
        value, 
        onChange: changeHandler,
        onBlur, 
        isDirty,
        ...valid
    }
}

export default useValidatedInput