import axios from "axios";
import { failMessage, successMessage } from "../store/MessageStore";
import { isRequired } from "../utils/errors";
import {
    IMAGE_MULTIPLE_PATH,
    IMAGE_PATH,
    TANK_PATH,
    USER_ROLES_PATH,
} from "../utils/routes";

const deleter =
    (data = null, path = null, token = null) =>
    async (dispatch) => {
        const headers = {
            Authorization: "jwt " + token,
        };
        const body = {
            ...data,
        };
        try {
            const result = await axios.delete(
                `http://localhost:4221/api/` + path,
                { headers: headers, data: body }
            );
            console.log(result.status);
            dispatch(successMessage(true));
        } catch (error) {
            dispatch(failMessage(true));
        }
    };

export const removeRoleFromUser = (userId, roleId, token) =>
    deleter({ id: userId, role: roleId }, USER_ROLES_PATH, token);

export const deleteTank = (
    tankId = isRequired("Tank id"),
    token = isRequired("Token")
) => deleter({ id: tankId }, TANK_PATH, token);
export const seletetankImages = (
    idArray = isRequired("Id"),
    token = isRequired("Token")
) => deleter({ idArray: idArray }, IMAGE_MULTIPLE_PATH, token);
