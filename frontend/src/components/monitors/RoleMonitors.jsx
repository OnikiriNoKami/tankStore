import useSnack from "../../hooks/useSnack";
import { useSelector } from "react-redux";
import { useEffect } from "react";



const RolesMonitor = () => {
    const snack = useSnack('Loading roles...')
    const loading = useSelector(state => state.roles.loading)
    const loaded = useSelector(state => state.roles.loaded)

    useEffect(()=>{
        if(loading){
            snack.open()
        }
        if(loaded){
            snack.close()
        }
    }, [loading, loaded])

    return null;
}

export default RolesMonitor