import { useState } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import {MenuProps} from "../../styles/SelectStyles";

export default function SelectMultipleCheck({list,values,selectLabel='', onChange,onFocus, ...rest}) {
    const createLabel = (selected) => {
        let label = [];
        selected.forEach((id)=>{
            const element = list.find((element)=>{
                if(element.id === id){
                    return true;
                }
            })

            label.push(element.title)
        })
        return label.join(', ');
    }

    return (
        <div>
            <FormControl style={{width:'100%' }}>
                <InputLabel>{selectLabel}</InputLabel>
                <Select
                    multiple
                    value={values}
                    onChange={onChange}
                    //input={<OutlinedInput label="Tag" />}
                    renderValue={createLabel}
                    MenuProps={MenuProps}   
                    onFocus={onFocus}             
                >
                    {list?.map((element) => (
                        <MenuItem key={element.id} value={element.id}>
                            <Checkbox
                                checked={values.indexOf(element.id) > -1}
                            />
                            <ListItemText primary={element.title} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
