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
    const [selected, setSelected] = useState('');
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();
    const nations = useSelector((state) => state.nations.nations);

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    const loadNations = () => {
        dispatch(nationFetch());
    };

    const handleDirty = () => {
        setDirty(true)
    };

    useEffect(() => {
        loadNations();
    }, []);

    useEffect(() => {
        if(dirty&&selected===''){
            setError(true)
        } else {
            setError(false)
        }
    }, [selected, dirty])

    const render = () => (
            <Box sx={{ minWidth: 120, width: 230}}>
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
                        {nations.length !== 0 ? nations.map(nation => (<MenuItem key={nation.id} value={nation.id}>{nation.title}</MenuItem>)) 
                        : 
                        <MenuItem value='None'>None</MenuItem>}
                    </Select>
                </FormControl>
            </Box>
    );
    return {
        render,
        selected,
        dirty,
    }

};

export default useNationSelect