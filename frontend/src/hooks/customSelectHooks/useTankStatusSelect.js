import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { tankStatusFetch } from "../../asyncActions/fetcher";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";

const useTankStatusSelect = () => {
    const [selected, setSelected] = useState("");
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState(false);
    const [validInput, setValidInput] = useState(false);
    const dispatch = useDispatch();
    const statuses = useSelector((state) => state.tankStatuses.statuses);

    const handleDirty = () => {
        setDirty(true);
    };

    const handleChange = (event) => {
        if (!dirty) {
            handleDirty();
        }
        setSelected(event.target.value);
    };

    const loadStatuses = () => {
        dispatch(tankStatusFetch());
    };

    const clear = () => {
        if (dirty) {
            setDirty(false);
            setSelected("");
        }
    };

    useEffect(() => {
        loadStatuses();
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
            <Box style={{ width: 230 }}>
                <FormControl fullWidth>
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select
                        id="status-select"
                        value={selected}
                        label="Status"
                        onBlur={handleDirty}
                        onChange={handleChange}
                        error={error}
                    >
                        {statuses.length !== 0 ? (
                            statuses.map((statuses) => (
                                <MenuItem key={statuses.id} value={statuses.id}>
                                    {statuses.title}
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

export default useTankStatusSelect;
