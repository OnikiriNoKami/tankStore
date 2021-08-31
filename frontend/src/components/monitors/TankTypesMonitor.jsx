import useSnack from "../../hooks/useSnack";
import { useSelector } from "react-redux";
import { useEffect } from "react";



const TankTypesMonitor = () => {
    const snack = useSnack('Loading tank types...')
    const loading = useSelector(state => state.tankTypes.loading)
    const loaded = useSelector(state => state.tankTyped.loaded)

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

export default TankTypesMonitor