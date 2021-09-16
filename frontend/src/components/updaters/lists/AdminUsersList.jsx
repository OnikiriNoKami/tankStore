import { Container, Grid, Paper, Typography, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { nationFetch, usersFetch } from "../../../asyncActions/fetcher";
import { useEffect, useState } from "react";
import SearchBar from "../SearcBar";
import { nationSearch, usersSearch } from "../../../asyncActions/searchFetcher";
import BackdropStyles from "../../../styles/BackdropStyles";
import { usersSetLimit } from "../../../store/AdminUsers";

const AdminUsersList = () => {
    const classes = BackdropStyles();
    const dispatch = useDispatch();
    const token = useSelector(state => state.token.token)
    const users = useSelector((state) => state.users.users);
    const limit = useSelector((state) => state.users.limit)
    const currentPage = useSelector((state) => state.users.page)
    const offset = useSelector((state) => state.users.offset)
    const [currentUser, setCurrentUser] = useState(null);
    const [open, setOpen] = useState(false);


    const loadUsers = () => {
        if(token){
            dispatch(usersFetch(limit, offset, token));
        }
        
    };

    useEffect(() => {
        loadUsers()        
    }, []);
    useEffect(()=> {
        loadUsers()
    }, [token])

    const searchCallBack = (query) => {
        dispatch(usersSearch(query, limit, offset, token));
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>
            <SearchBar
                label="Search in users..."
                callBack={searchCallBack}
                callReset={loadUsers}
            />
        </Container>
    );
};

export default AdminUsersList;
