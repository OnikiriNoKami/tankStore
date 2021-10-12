import useMultipleCheck from "../customSelectHooks/useMultipleCheck";
import { useSelector, useDispatch } from "react-redux";
import { tankTypeFetch } from "../../asyncActions/fetcher";
import { useEffect, useState } from "react";

const useTankTypeFilter = () => {
    const types = useSelector((state) => state.tankTypes.tankTypes);
    const select = useMultipleCheck(types,{label:'Types'});
    const dispatch = useDispatch();
    const [filter , setFilter] = useState([]);

    const loadTypes = async () => {
        dispatch(tankTypeFetch());
    };

    useEffect(() => {
        loadTypes();
    }, []);

    useEffect(()=>{
        const tmpFilter = [];
        select.values.forEach((value)=>{
            tmpFilter.push({key: 'tankTypeId', value: value})
        })
        setFilter(tmpFilter)
    }, [select.values])

    return {
        ...select,
        filter
    };
};

export default useTankTypeFilter;