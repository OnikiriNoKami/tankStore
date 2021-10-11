import { makeStyles } from "@material-ui/core";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const SelectStyles = makeStyles((theme) => {
    return {
        MenuProps: {
            PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        },
    };
});

export default SelectStyles
