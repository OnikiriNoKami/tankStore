import useMultipleCheck from "../customSelectHooks/useMultipleCheck";
import { useSelector, useDispatch } from "react-redux";
import { tankStatusFetch } from "../../asyncActions/fetcher";
import { useEffect } from "react";

const useTankStatusFilter = () => {
    const statuses = useSelector((state) => state.tankStatuses.statuses);
    const select = useMultipleCheck(statuses,{label:'Statuses'});
    const dispatch = useDispatch();

    const loadStatuses = async () => {
        dispatch(tankStatusFetch());
    };

    useEffect(() => {
        loadStatuses();
    }, []);

    return {
        ...select
    };
};

export default useTankStatusFilter;