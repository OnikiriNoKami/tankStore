import useMultipleCheck from "../customSelectHooks/useMultipleCheck";
import { useSelector, useDispatch } from "react-redux";
import { tankStatusFetch } from "../../asyncActions/fetcher";
import { useEffect, useState } from "react";

const useTankStatusFilter = () => {
    const statuses = useSelector((state) => state.tankStatuses.statuses);
    const select = useMultipleCheck(statuses,{label:'Statuses'});
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);

    const loadStatuses = async () => {
        dispatch(tankStatusFetch());
    };

    useEffect(() => {
        loadStatuses();
    }, []);

    useEffect(()=>{
        const tmpFilter = [];
        select.values.forEach((value)=>{
            tmpFilter.push({key: 'statusId', value: value})
        })
        setFilter(tmpFilter)
    }, [select.values])

    return {
        ...select,
        filter
    };
};

export default useTankStatusFilter;