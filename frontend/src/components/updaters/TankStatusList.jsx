import { Container } from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tankStatusFetch } from "../../asyncActions/fetcher";
import { tankTypeSearch } from "../../asyncActions/searchFetcher";
import BackdropStyles from "../../styles/BackdropStyles";

const TankStatusList = () => {
    const classes = BackdropStyles();
    const dispatch = useDispatch();
    const tankStatus = useSelector((state) => state.tabkStatuses.statuses);

    const [open, setOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(null);

    const loadStatuses = () => {
        dispatch(tankStatusFetch());
    };

    useEffect =
        (() => {
            loadStatuses();
        },
        []);

    const handleClick = (id) => {
        setCurrentStatus(id);
        setOpen(true);
    };

    const searchCallBack = (query) => {
        dispatch(tankTypeSearch(query));
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <SearchBar
                label="Search in tank statuses..."
                callBack={searchCallBack}
                callReset={loadStatuses}
            />
            
        </Container>
    );
};

export default TankStatusList;
