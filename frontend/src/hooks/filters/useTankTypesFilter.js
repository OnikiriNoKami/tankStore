import useMultipleCheck from "../customSelectHooks/useMultipleCheck";
import { useSelector, useDispatch } from "react-redux";
import { tankTypeFetch } from "../../asyncActions/fetcher";
import { useEffect } from "react";

const useTankTypeFilter = () => {
    const types = useSelector((state) => state.tankTypes.tankTypes);
    const select = useMultipleCheck(types,{label:'Types'});
    const dispatch = useDispatch();

    const loadTypes = async () => {
        dispatch(tankTypeFetch());
    };

    useEffect(() => {
        loadTypes();
    }, []);

    return {
        ...select
    };
};

export default useTankTypeFilter;