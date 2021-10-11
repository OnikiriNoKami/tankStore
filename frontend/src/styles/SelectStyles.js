import { makeStyles } from "@material-ui/core";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const SelectStyles = makeStyles((theme) => {
    return {
        
    };
});

export const MenuProps = {    
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
}

export default SelectStyles
