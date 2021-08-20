import { useState } from "react"

const useBasicInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const changeHandler = (e) => {
        setValue(e.target.value)
    }

    return {
        value, onChange: changeHandler
    }
}

export default useBasicInput