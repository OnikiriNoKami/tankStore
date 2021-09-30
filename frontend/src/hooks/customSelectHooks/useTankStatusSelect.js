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
    const dispatch = useDispatch();
    const statuses = useSelector((state) => state.tankStatuses.statuses);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const loadStatuses = () => {
        dispatch(tankStatusFetch);
    };

    const handleDirty = () => {
        setDirty(true);
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
    };
};

export default useTankStatusSelect;
