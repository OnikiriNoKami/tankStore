import useSnack from "../../hooks/useSnack";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const TankStatusMonitor = () => {
    const snack = useSnack('Loading tank statuses...')
    const loading = useSelector(state => state.tankStatuses.loading)
    const loaded = useSelector(state => state.tankStatuses.loaded)

    useEffect(()=>{
        if(loading){
            snack.open()
        } 
        if(loaded === true || loaded === false){
            snack.close()
        }
    }, [loading, loaded])

    return null;
}

export default TankStatusMonitor