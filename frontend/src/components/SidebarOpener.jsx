import { Button, Hidden, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { sidebarTogle } from "../store/SidebarReducer";
import DehazeIcon from '@material-ui/icons/Dehaze';

const SidebarOpener = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(sidebarTogle());
    };

    return (
        <Hidden mdUp>
            <Typography variant="h4">
                <Button onClick={handleClick}><DehazeIcon/></Button>
            </Typography>
        </Hidden>
    );
};

export default SidebarOpener;
