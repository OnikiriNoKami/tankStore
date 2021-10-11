import { useState } from 'react';
import SelectMultipleCheck from '../../components/utils/SelectMultipleCheck';

const useMultipleSelect= (list=[],{ label=''}) => {
    const [values, setValues] = useState([])

    const handleChange = (event) => {
        const {target: { value }} = event;
        setValues(value);
    };

    const render = () => {
        return (
            <SelectMultipleCheck onChange={handleChange} selectLabel={label} values={values} list={list}/>
        )
    }

    return {
        values,
        render,
    }
}

export default useMultipleSelect