import useMultipleCheck from "../customSelectHooks/useMultipleCheck";
import { useSelector, useDispatch } from "react-redux";
import { nationFetch } from "../../asyncActions/fetcher";
import { useEffect, useState } from "react";

const useNationFilter = () => {
    const nation = useSelector((state) => state.nations.nations);
    const select = useMultipleCheck(nation,{label:'Nations'});
    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);

    const loadNations = async () => {
        dispatch(nationFetch());
    };

    useEffect(() => {
        loadNations();
    }, []);

    useEffect(()=>{
        const tmpFilter = [];
        select.values.forEach((value)=>{
            tmpFilter.push({key: 'nationId', value: value})
        })
        setFilter(tmpFilter)
    }, [select.values])

    return {
        ...select,
        filter
    };
};

export default useNationFilter;
