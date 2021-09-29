import axios from "axios";
import { failMessage, successMessage } from "../store/MessageStore";
import { isRequired } from "../utils/errors";

import {
    ROLE_PATH,
    NATION_PATH,
    TANK_TYPE_PATH,
    STATUS_PATH,
    MODULE_TYPE_PATH,
    TANK_PATH,
} from "../utils/routes";

const updater =
    (data, path, token, reloadCallback = null) =>
    async (dispatch) => {
        const headers = {
            Authorization: "jwt " + token,
        };
        const body = {
            ...data,
        };
        try {
            const result = await axios.put(
                `http://localhost:4221/api/` + path,
                body,
                { headers: headers }
            );
            dispatch(successMessage(true));
            if (reloadCallback) {
                reloadCallback();
            }
        } catch (error) {
            console.log(error.message);
            dispatch(failMessage(true));
        }
    };

export const roleUpdater = (id, title, description, token, reloadCallback) =>
    updater({ id, title, description }, ROLE_PATH, token, reloadCallback);

export const nationUpdater = (id, title, token, reloadCallback) =>
    updater({ id, title }, NATION_PATH, token, reloadCallback);

export const tankTypeUpdater = (
    id,
    title,
    title_short,
    token,
    reloadCallback
) => updater({ id, title, title_short }, TANK_TYPE_PATH, token, reloadCallback);

export const tankStatusUpdater = (id, title, token, reloadCallback) =>
    updater({ id, title }, STATUS_PATH, token, reloadCallback);

export const moduleTypeUpdater = (id, title, token, reloadCallback) =>
    updater({ id, title }, MODULE_TYPE_PATH, token, reloadCallback);

export const tankUpdater = (
    id = isRequired("Id"),
    token=isRequired('Token'),
    reloadCallback,
    toUpdate={}
) => updater({ id, ...toUpdate }, TANK_PATH, token, reloadCallback);
