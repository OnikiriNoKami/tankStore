import useSnack from "../../hooks/useSnack";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { usersSetCurrentPage, usersSetOffset, usersSetTotalPages } from "../../store/AdminUsers";

const AdminUsersMonitor = () => {
    const snack = useSnack('Loading users...')
    const userSnack = useSnack('Loading user...')
    const dispatch = useDispatch()
    const loading = useSelector(state => state.users.loading)
    const loaded = useSelector(state => state.users.loaded)
    const userLoading = useSelector(state => state.users.userByIdLoading)
    const userLoaded = useSelector( state => state.users.userByIdLoaded)
    const totalCount = useSelector(state => state.users.totalCount)
    const page = useSelector(state => state.users.page)
    const limit = useSelector(state => state.users.limit)

    useEffect(()=>{
        if(loading){
            snack.open()
        } 
        if(loaded === true || loaded === false){
            snack.close()
        }
    }, [loading, loaded])

    useEffect(() => {
        if(userLoading){
            userSnack.open()
        }
        if(userLoaded === true || userLoaded === false) {
            userSnack.close()
        }
    }, [userLoading, userLoaded])

    useEffect(() => {
        if(totalCount !== null){
            dispatch(usersSetOffset((page-1)*(limit > 0? limit : 25))) 
            dispatch(usersSetTotalPages(Math.ceil(totalCount/(limit > 0? limit: 25))))
        } else {
            dispatch(usersSetTotalPages(0))
        }
        if(page < 1){
            dispatch(usersSetCurrentPage(1))
        }
    }, [totalCount, page])

    return null;
}

export default AdminUsersMonitor