import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTankMonitor from '../../../hooks/monitors/useTankMonitor'
import { tanksFetch } from '../../../asyncActions/fetcher';
import { tanksSetPage } from "../../../store/TanksStore";
import { tanksFilterSearch } from "../../../asyncActions/searchFetcher";
import { Container } from "@material-ui/core";
import SearchBar from "../SearcBar";

const TankList = () => {
    const tankMonitor = useTankMonitor()
    const tanks = useSelector(state => state.tanks.tanks)
    const dispatch = useDispatch()
    const [lastAction, setLastAction] = useState('')
    const [lastFilter, setLastFilter] = useState([])

    const fetchTanks = () => {
        dispatch(tanksFetch(tankMonitor.limit, tankMonitor.offset))
    }

    const loadTanks = () => {
        setLastAction('load')
        fetchTanks()
    }

    useEffect(()=>{
        loadTanks()
    },[])

    const searchFetch = (filter) => {
        dispatch(tanksFilterSearch(filter, tankMonitor.limit, tankMonitor.offset));
    }

    const searchCallBack = (query) => {
        const filter = []
        filter.push({key: 'title', value: query})
        setLastAction('search')
        setLastFilter(filter);
        dispatch(tanksSetPage(1))
        searchFetch(filter)
    }

    return (
        <Container>
            <SearchBar
                label="Search in tanks..."
                callBack={searchCallBack}
                callReset={loadTanks}
            />
        </Container>
    );

}

export default TankList