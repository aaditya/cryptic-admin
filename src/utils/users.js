import axios from "axios";

import { openNotification } from "../components/Notification";

import { config } from "./settings";
import { getUsers } from "../actions/users";

export const refreshUsers = async () => {
    try {
        let options = {
            method: "get",
            url: `${config.url.API_URL}/api/v1/users/info`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            }
        }
        let { data } = await axios(options);

        return getUsers(data.data);
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error.");
        return getUsers(null);
    }
}

export const disableUser = async (id, status) => {
    try {
        let options = {
            method: "post",
            url: `${config.url.API_URL}/api/v1/users/disable`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            },
            data: {
                id, status
            }
        }
        await axios(options);

        return true;
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error.");
        return null;
    }
}

export const grantAdmin = async (id, status) => {
    try {
        let options = {
            method: "post",
            url: `${config.url.API_URL}/api/v1/users/grant`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            },
            data: {
                id, status
            }
        }
        await axios(options);

        return true;
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error.");
        return null;
    }
}