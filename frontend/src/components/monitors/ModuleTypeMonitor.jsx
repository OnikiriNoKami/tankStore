import useSnack from "../../hooks/useSnack";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ModuleTypeMonitor = () => {
    const snack = useSnack('Loading Module Types...')
    const loading = useSelector(state => state.moduleTypes.loading)
    const loaded = useSelector(state => state.moduleTypes.loaded)

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

export default ModuleTypeMonitor