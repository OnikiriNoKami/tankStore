import { useLocation } from "react-router";
import { useEffect, useRef, useState } from "react";

const useQuery = () => {
    const values = useRef()
    const lquery = new URLSearchParams(useLocation().search);
    values.current = []
    for(let [key, value] of lquery){
        values.current = [...values.current,{key: key, value:value}]
    }


    return values.current
}

export default useQuery;