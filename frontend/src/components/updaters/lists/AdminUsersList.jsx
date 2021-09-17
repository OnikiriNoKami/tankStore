import { Container, Grid, Paper, Typography, Modal } from "@material-ui/core";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { usersFetch } from "../../../asyncActions/fetcher";
import { useEffect, useState } from "react";
import SearchBar from "../SearcBar";
import { usersSearch } from "../../../asyncActions/searchFetcher";
import BackdropStyles from "../../../styles/BackdropStyles";
import {
    usersSetCurrentPage,
    usersSetLimit,
} from "../../../store/AdminUsers";
import UsersRow from "../rows/UsersRow";
import PaginationStyles from "../../../styles/PaginationStyles";

const AdminUsersList = () => {
    const classes = BackdropStyles();
    const paginationClasses = PaginationStyles();
    const dispatch = useDispatch();
    const loaded = useSelector((state) => state.users.loaded);
    const token = useSelector((state) => state.token.token);
    const users = useSelector((state) => state.users.users);
    const limit = useSelector((state) => state.users.limit);
    const totalPages = useSelector((state) => state.users.totalPages);
    const currentPage = useSelector((state) => state.users.page);
    const offset = useSelector((state) => state.users.offset);
    const [currentUser, setCurrentUser] = useState(null);
    const [lastQuery, setLastQuery] = useState('');
    const [lastAction, setLastAction] = useState(null);
    const [open, setOpen] = useState(false);
    dispatch(usersSetLimit(2));

    const loadUsers = () => {
        if (token) {
            setLastAction('load')
            dispatch(usersSetCurrentPage(1))
            usersFetchData()
        }
    };

    const usersFetchData = () => {
        dispatch(usersFetch(limit, offset, token));
    }

    useEffect(() => {
        if (token && !loaded) {
            loadUsers();
        }
    }, []);
    useEffect(() => {
        if (token && !loaded) {
            loadUsers();
        }
    }, [token]);

    useEffect(() => {
        if(lastAction==='load')
        {
            usersFetchData();
        }
        if(lastAction==='search'){
            searchFetch(lastQuery);
        }
        
    }, [offset]);

    const searchCallBack = (query) => {
        setLastAction('search')
        setLastQuery(query);
        dispatch(usersSetCurrentPage(1))
        searchFetch(query)
    };
    
    const searchFetch = (query) => {
        dispatch(usersSearch(query, limit, offset, token));
    }

    const handleClick = () => {
        console.log(offset);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const changePage = (event, value) => {
        if (currentPage !== value) {
            dispatch(usersSetCurrentPage(value));
        }
    };

    return (
        <Container>
            <SearchBar
                label="Search in users..."
                callBack={searchCallBack}
                callReset={loadUsers}
            />
            <Grid container spacing={3} justifyContent="center">
                {users.length !== 0 ? (
                    users.map((user) => {
                        return (
                            <Grid key={user.id} item xs={11}>
                                <UsersRow
                                    id={user.id}
                                    email={user.email}
                                    clickHandle={handleClick}
                                />
                            </Grid>
                        );
                    })
                ) : (
                    <Typography variant="h4">No users</Typography>
                )}
                <Grid item xs={6}>
                    {
                        users.length !== 0&& <Pagination
                        classes={{ ul: paginationClasses.ul }}
                        count={totalPages ? totalPages : 0}
                        page={currentPage}
                        onChange={changePage}
                        />
                    }                    
                    
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminUsersList;
