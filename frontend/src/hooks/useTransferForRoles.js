import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useEffect } from "react";

export default function useTransferForRoles() {
    const userLoaded = useSelector((state) => state.users.userByIdLoaded);
    const userRoles = useSelector((state) => state.users.userById.roles);
    const roles = useSelector(state => state.roles)
    const [transferChoosen, setTransferChoosen] = useState([]);
    const [choosenSet, setChoosenSet] = useState(false);
    const [transferChoose, setTransferChoose] = useState([]);
    const [chooseSet, setChooseSet] = useState(false);
    useEffect(() => {
        if (userLoaded) {
            setTransferChoosen(userRoles.slice());
            setChoosenSet(true);
        }
    }, [userRoles, userLoaded]);

    useEffect(() => {
        
        if(choosenSet&&roles.loaded){
            setTransferChoose(roles.roles.filter((role)=> {
                if(!userRoles.some((choosenRole) => choosenRole.id===role.id)){
                    return true
                } else {
                    return false
                }
            }))
            setChooseSet(true);
            
        }
    }, [transferChoosen, roles.loaded]);

    return {
        chosen: transferChoosen,
        choose: transferChoose,
        gotChoosen: choosenSet,
        gotChoose: chooseSet
    };
}
