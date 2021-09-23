import {
    Container,
    Grid,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useValidatedInput from "../../../hooks/useValidatedInput";
import { userSetRole, userSetRoles } from "../../../asyncActions/creation";
import { removeRoleFromUser } from "../../../asyncActions/deletion";
import { roleFetch, userByIdFetch } from "../../../asyncActions/fetcher";
import Transfer from "./UserRoleTransfer";
import useTransferForRoles from "../../../hooks/useTransferForRoles";
import { usersByIdResetStatuses } from "../../../store/AdminUsers";

const UsersRoleUpdater = ({
    id = null,
    callBack = null,
    reloadCallback = null,
}) => {
    const user = useSelector((state) => state.users.userById);
    const token = useSelector((state) => state.token.token);
    const transfer = useTransferForRoles();
    const dispatch = useDispatch();

    const handleClear = () => {
        dispatch(usersByIdResetStatuses());
    };
    const loadUserData = () => {
        dispatch(userByIdFetch(id, token));
    };

    const loadRoles = () => {
        dispatch(roleFetch());
    };

    const handleSubmit = (applyArr, removeArr) => {
        if(applyArr.length !== 0){
            dispatch(userSetRoles(id, applyArr,token))
        }
        if(removeArr.length !== 0){
            for (let role of removeArr){
                dispatch(removeRoleFromUser(id, role, token))
            }
        }
        //dispatch(tankTypeUpdater(id, title.value, titleShort.value, token, reloadCallback))
        if (callBack) {
            callBack();
        }
    };

    useEffect(() => {
        loadUserData();
        loadRoles();

        return handleClear;
    }, []);

    return (
        <Container>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={11} sm={8}>
                    <Typography variant="h4">User role setter</Typography>
                </Grid>
                <Grid item xs={11} sm={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Typography variant="h5">id</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h5">Email</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={11} sm={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Typography variant="h5">{user.id}</Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h5">{user.email}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={10}>
                    <Transfer
                        choose={transfer.choose}
                        chosen={transfer.chosen}
                        handleSubmit={handleSubmit}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsersRoleUpdater;
