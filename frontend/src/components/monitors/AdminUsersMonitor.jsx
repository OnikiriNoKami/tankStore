import useSnack from "../../hooks/useSnack";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminUsersMonitor = () => {
    const snack = useSnack('Loading users...')
    const loading = useSelector(state => state.users.loading)
    const loaded = useSelector(state => state.users.loaded)

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

export default AdminUsersMonitor