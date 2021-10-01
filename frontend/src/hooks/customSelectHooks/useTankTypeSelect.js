import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { tankTypeFetch } from "../../asyncActions/fetcher";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";

const useTankTypeSelect = () => {
    const [selected, setSelected] = useState("");
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState(false);
    const [validInput, setValidInput] = useState(false);
    const dispatch = useDispatch();
    const tankTypes = useSelector((state) => state.tankTypes.tankTypes);

    const handleDirty = () => {
        setDirty(true);
    };

    const handleChange = (event) => {
        if (dirty) {
            handleDirty();
        }
        setSelected(event.target.value);
    };

    const loadTypes = () => {
        dispatch(tankTypeFetch());
    };

    const clear = () => {
        if (dirty) {
            setDirty(false);
            setSelected("");
        }
    };

    useEffect(() => {
        loadTypes();
    }, []);

    useEffect(() => {
        if (dirty && selected === "") {
            setError(true);
        } else {
            setError(false);
        }
    }, [selected, dirty]);
    useEffect(()=>{
        if(dirty&&!error){
            setValidInput(true)
        } else {
            setValidInput(false)
        }
    }, [dirty, error])

    const render = () => (
        <Box sx={{ minWidth: 120, display: "flex", justifyContent: "center" }}>
            <Box style={{ width: '100%' }}>
                <FormControl fullWidth>
                    <InputLabel id="type-select-label">Type</InputLabel>
                    <Select
                        id="type-select"
                        value={selected}
                        label="Type"
                        onBlur={handleDirty}
                        onChange={handleChange}
                        error={error}
                    >
                        {tankTypes.length !== 0 ? (
                            tankTypes.map((type) => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.title}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem value="None">None</MenuItem>
                        )}
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
    return {
        render,
        selected,
        dirty,
        clear,
        validInput
    };
};

export default useTankTypeSelect;
