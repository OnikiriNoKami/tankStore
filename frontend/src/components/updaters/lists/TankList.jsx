import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import useTankMonitor from "../../../hooks/monitors/useTankMonitor";
import { tanksFetch } from "../../../asyncActions/fetcher";
import { tanksSetPage } from "../../../store/TanksStore";
import { tanksFilterSearch } from "../../../asyncActions/searchFetcher";
import { Container } from "@material-ui/core";
import SearchBar from "../SearcBar";
import TankRow from "../rows/TankRow";
import { Pagination } from "@mui/material";
import BackdropStyles from "../../../styles/BackdropStyles";
import PaginationStyles from "../../../styles/PaginationStyles";
import {ADMIN_ROUTE} from '../../../utils/consts';
import useTankFilter from "../../../hooks/filters/useTankFilters";

const TankList = () => {
    const paginationClasses = PaginationStyles();
    const tankMonitor = useTankMonitor();
    const tanks = useSelector((state) => state.tanks.tanks);
    const dispatch = useDispatch();
    const history = useHistory();
    const tankFilter = useTankFilter()
    
    const [lastAction, setLastAction] = useState("");
    const [lastFilter, setLastFilter] = useState([]);

    const fetchTanks = () => {
        dispatch(tanksFetch(tankMonitor.limit, tankMonitor.offset));
    };

    const loadTanks = () => {
        setLastAction("load");
        fetchTanks();
    };

    useEffect(() => {
        loadTanks();
    }, []);

    useEffect(() => {
        if (lastAction === "load") {
            fetchTanks();
        }
        if (lastAction === "search") {
            searchFetch(lastFilter);
        }
    }, [tankMonitor.offset]);

    const searchFetch = (filter) => {
        dispatch(
            tanksFilterSearch(filter, tankMonitor.limit, tankMonitor.offset)
        );
    };

    const searchCallBack = (query) => {
        const filter = [];
        filter.push({ key: "title", value: query });
        setLastAction("search");
        setLastFilter(filter);
        dispatch(tanksSetPage(1));
        searchFetch(filter);
    };

    const handleTankClick = (id) => {
        history.push(`${ADMIN_ROUTE}/modify&tank?tank=${id}`)
     }

    const changePage = (event, value) => {
        if (tankMonitor.currentPage !== value) {
            dispatch(tanksSetPage(value));
        }
    };

    const paginator = () => {
        return (<Grid item xs={6}>
            {tanks.length !== 0 && (
                <Pagination
                    classes={{ ul: paginationClasses.ul }}
                    count={tankMonitor.totalPages ? tankMonitor.totalPages : 0}
                    page={tankMonitor.page}
                    onChange={changePage}
                />
            )}
        </Grid>);
    };

    const rowMap = () => {
        return (
            <Grid container spacing={3} justifyContent="center">
                {tanks.length !== 0 ? (
                    tanks.map((tank) => {
                        return (
                            <Grid key={tank.id} item xs={11} sm={10}>
                                <TankRow
                                    id={tank.id}
                                    title={tank.title}
                                    clickHandle={handleTankClick}
                                />
                            </Grid>
                        );
                    })
                ) : (
                    <Typography variant="h4">No tanks</Typography>
                )}
                {paginator()}
            </Grid>
        );
    };    

    return (
        <Container>
            <SearchBar
                label="Search in tanks..."
                callBack={searchCallBack}
                callReset={loadTanks}
            />
            {tankFilter.render()}
            {rowMap()}
        </Container>
    );
};

export default TankList;
