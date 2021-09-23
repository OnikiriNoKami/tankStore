import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import useArrayEquals from "../../../hooks/useArrayEquals";

const useStyles = makeStyles((theme) => ({
    paper: {
        width: 200,
        height: 250,
        overflow: "auto",
        "::-webkit-scrollbar": {
            all: "auto",
        },
        margin: "auto",
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export default function Transfer({
    choose,
    chosen,
    handleSubmit = (applyArr, removeArr) => {},
}) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const [left, setLeft] = React.useState([]);
    const [right, setRight] = React.useState([]);
    const [toRemove, setToRemove] = useState([])
    const [toAdd, setToAdd] = useState([])
    const [removeDirty, setRemoveDirty] = useState(false)
    const [addDirty, setAddDirty] = useState(false);
    const [save, setSave] = useState(false);
    const asDefault = useArrayEquals(right, chosen);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const setDefault = () => {
        setLeft([...choose]);
        setRight([...chosen]);
    };

    const handleAllRight = () => {
        setRight([...right, ...left]);
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight([...right, ...leftChecked]);
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft([...left, ...rightChecked]);
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft([...left, ...right]);
        setRight([]);
    };

    useEffect(() => {
        if (chosen.length !== 0) {
            setRight([...chosen]);
        }
    }, [chosen]);

    useEffect(() => {
        if (choose.length !== 0) {
            setLeft([...choose]);
        }
    }, [choose]);

    const collectToRemove = async () => {
        if (!asDefault.equal) {
            const tmpArray = chosen.filter((chosenRole) => {
                return !right.some((role) => role.id === chosenRole.id);
            });
            setToRemove(tmpArray.map((role)=> role.id))
        }
    };

    const collectToAdd = async () => {
        if (!asDefault.equal) {
            const tmpArray = right.filter((role) => {
                return !chosen.some((chosenRole) => role.id === chosenRole.id);
            });
            setToAdd(tmpArray.map((role) => role.id))
            
        
        }
    };

    const handleSave =() => {
        collectToRemove();
        collectToAdd(); 
        setSave(true)  
    };

    useEffect(()=>{
        if(save){
        setRemoveDirty(true)}
    }, [toRemove, save])
    useEffect(()=>{
        if(save){
        setAddDirty(true)}
    }, [toAdd, save])

    useEffect(()=>{
        if(addDirty&&removeDirty){
            handleSubmit(toAdd, toRemove)
        }
    }, [addDirty, removeDirty])
   

    const customList = (items) => (
        <Paper className={classes.paper}>
            <List dense component="div" role="list">
                {items.map((role) => {
                    const labelId = `transfer-list-item-${role.id}-label`;

                    return (
                        <ListItem
                            key={role.id}
                            role="listitem"
                            button
                            onClick={handleToggle(role)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(role) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ "aria-labelledby": labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={role.title} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            className={classes.root}
        >
            <Grid item xs={12} sm={5}>
                <Grid container justifyContent="flex-end">
                    <Grid item xs={11}>
                        <Typography variant="h5">Not applyed</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        {customList(left)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Grid container justifyContent="flex-end">
                    <Grid item xs={11}>
                        <Typography variant="h5">Applyed</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {customList(right)}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={10}>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={asDefault.equal}
                            onClick={handleSave}
                        >
                            save
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={setDefault}
                            variant="outlined"
                            color="secondary"
                            disabled={asDefault.equal}
                        >
                            reset
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
