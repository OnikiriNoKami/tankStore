import useMultipleCheck from "../customSelectHooks/useMultipleCheck";
import { useSelector, useDispatch } from "react-redux";
import { nationFetch } from "../../asyncActions/fetcher";
import { useEffect } from "react";

const useNationFilter = () => {
    const nation = useSelector((state) => state.nations.nations);
    const select = useMultipleCheck(nation,{label:'Nations'});
    const dispatch = useDispatch();

    const loadNations = async () => {
        dispatch(nationFetch());
    };

    useEffect(() => {
        loadNations();
    }, []);

    return {
        ...select
    };
};

export default useNationFilter;
