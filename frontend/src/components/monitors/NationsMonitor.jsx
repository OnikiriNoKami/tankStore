import useSnack from "../../hooks/useSnack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { nationsLoading, nationsLoaded } from "../../store/NationStore";



const NationsMonitor = () => {
    const snack = useSnack('Loading nations...')
    const loading = useSelector(state => state.nations.loading)
    const loaded = useSelector(state => state.nations.loaded)

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

export default NationsMonitor