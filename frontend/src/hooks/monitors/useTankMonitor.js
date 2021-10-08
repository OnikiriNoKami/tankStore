import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useSnack from "../useSnack";
import {
    tanksSetOffset,
    tanksSetTotalPages,
    tanksSetPage,
} from "../../store/TanksStore";

const useTankMonitor = () => {
    const tankSnack = useSnack("Tanks loading...");
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.tanks.loading);
    const loaded = useSelector((state) => state.tanks.loaded);
    const totalCount = useSelector((state) => state.tanks.totalCount);
    const offset = useSelector((state) => state.tanks.offset);
    const limit = useSelector((state) => state.tanks.limit);
    const page = useSelector((state) => state.tanks.page);
    const totalPages = useSelector((state) => state.tanks.totalPages);

    useEffect(() => {
        if (loading) {
            tankSnack.open();
        }
        if (loaded === true || loaded === false) {
            tankSnack.close();
        }
    }, [loading, loaded]);

    useEffect(() => {
        if (totalCount !== null) {
            dispatch(tanksSetOffset((page - 1) * (limit > 0 ? limit : 25)));
            dispatch(
                tanksSetTotalPages(
                    Math.ceil(totalCount / (limit > 0 ? limit : 25))
                )
            );
        } else {
            dispatch(tanksSetTotalPages(0));
        }
        if (page < 1) {
            dispatch(tanksSetPage(1));
        }
    }, [totalCount, page]);

    return {
        loading,
        loaded,
        totalCount,
        offset,
        limit,
        page,
        totalPages,
    };
};

export default useTankMonitor;
