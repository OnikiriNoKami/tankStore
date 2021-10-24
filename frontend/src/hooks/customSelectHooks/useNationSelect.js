import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { nationFetch } from "../../asyncActions/fetcher";
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";

const useNationSelect = () => {
    const [selected, setSelected] = useState("");
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState(false);
    const [validInput, setValidInput] = useState(false);
    const [def, setDef] = useState("");
    const [isDefault, setIsDefault] = useState(true);
    const dispatch = useDispatch();
    const nations = useSelector((state) => state.nations.nations);

    const toDefault = () => {
        if (selected !== def) {
            setSelected(def);
        }
    };

    const setDefault = (value) => {
        setDef(value);
        setSelected(value);
    };

    const handleDirty = () => {
        setDirty(true);
    };

    const handleChange = (event) => {
        if (!dirty) {
            handleDirty();
        }
        setSelected(event.target.value);
    };

    const loadNations = () => {
        dispatch(nationFetch());
    };

    const clear = () => {
        if (dirty) {
            setDirty(false);
            setSelected("");
        }
    };

    useEffect(() => {
        loadNations();
    }, []);

    useEffect(() => {
        if (dirty && selected === "") {
            setError(true);
        } else {
            setError(false);
        }
        if (selected === def) {
            setIsDefault(true);
        } else {
            setIsDefault(false);
        }
    }, [selected, dirty]);

    useEffect(() => {
        if (dirty && !error) {
            setValidInput(true);
        } else {
            setValidInput(false);
        }
    }, [dirty, error]);

    const render = () => (
        <Box sx={{ minWidth: 120, display: "flex", justifyContent: "center" }}>
            <Box style={{ width: "100%" }}>
                <FormControl fullWidth>
                    <InputLabel id="nation-select-label">Nation</InputLabel>
                    <Select
                        id="nation-select"
                        value={selected}
                        label="Nation"
                        onBlur={handleDirty}
                        onChange={handleChange}
                        error={error}
                    >
                        {nations.length !== 0 ? (
                            nations.map((nation) => (
                                <MenuItem key={nation.id} value={nation.id}>
                                    {nation.title}
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
        validInput,
        toDefault,
        setDefault,
        isDefault,
    };
};

export default useNationSelect;
