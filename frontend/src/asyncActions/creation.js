import axios from "axios";
import { failMessage, successMessage } from "../store/MessageStore";
import {
    ROLE_PATH,
    NATION_PATH,
    TANK_TYPE_PATH,
    STATUS_PATH,
    MODULE_TYPE_PATH,
    ADD_ROLE_TO_USER_PATH,
    ADD_ROLES_TO_USER_PATH,
    TANK_PATH,
} from "../utils/routes";
import { isRequired } from "../utils/utilitiFunctions";

const creator = (data, path, token) => async (dispatch) => {
    const headers = {
        Authorization: "jwt " + token,
    };
    const body = {
        ...data,
    };
    try {
        const result = await axios.post(
            `http://localhost:4221/api/` + path,
            body,
            { headers: headers }
        );
        console.log(result.status);
        dispatch(successMessage(true));
    } catch (error) {
        dispatch(failMessage(true));
    }
};

export const roleCreate = (title, description, token) =>
    creator({ title, description }, ROLE_PATH, token);
export const nationCreate = (title, token) =>
    creator({ title }, NATION_PATH, token);
export const tankTypeCreate = (title, title_short, token) =>
    creator({ title, title_short }, TANK_TYPE_PATH, token);
export const tankStatusCreate = (title, token) =>
    creator({ title }, STATUS_PATH, token);
export const moduleTypeCreate = (title, token) =>
    creator({ title }, MODULE_TYPE_PATH, token);
export const userSetRole = (userId, roleId, token) =>
    creator({ id: userId, role: roleId }, ADD_ROLE_TO_USER_PATH, token);
export const userSetRoles = (userId, roles, token) =>
    creator({ id: userId, roles: roles }, ADD_ROLES_TO_USER_PATH, token);
export const tankCreate = (
    title = isRequired("Title"),
    description = isRequired("Description"),
    priceSilver = isRequired("Price in silver"),
    priceExp = isRequired("Price in exp"),
    nationId = null,
    tankTypeId = null,
    statusId = null,
    token
) => creator(
        {
            title,
            description,
            price_silver: priceSilver,
            price_exp: priceExp,
            nationId,
            tankTypeId,
            statusId,
        },
        TANK_PATH,
        token
    );
