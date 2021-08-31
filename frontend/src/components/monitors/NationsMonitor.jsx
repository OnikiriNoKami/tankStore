import useSnack from "../../hooks/useSnack";
import { useSelector } from "react-redux";
import { useEffect } from "react";



const NationsMonitor = () => {
    const snack = useSnack('Loading nations...')
    const loading = useSelector(state => state.nations.loading)
    const loaded = useSelector(state => state.nations.loaded)

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

export default NationsMonitor