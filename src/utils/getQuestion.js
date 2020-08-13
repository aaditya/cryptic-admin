import axios from "axios";

import { config } from "./settings";

export const refreshQuestion = async () => {
    try {
        let options = {
            method: "get",
            url: `${config.url.API_URL}/api/v1/questions/set`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            }
        }
        let { data } = await axios(options);

        if (data.end) {
            return { end: true }
        }

        return data.data;
    } catch (err) {
        return {};
    }
}

export const deleteLevel = async (levelId) => {
    try {
        let options = {
            method: "delete",
            url: `${config.url.API_URL}/api/v1/level/info`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            },
            data: {
                qid: levelId
            }
        }
        
        await axios(options);

        return true;
    } catch (err) {
        return null;
    }
}

export const getBoard = async () => {
    try {
        let options = {
            method: "get",
            url: `${config.url.API_URL}/api/v1/questions/leaderboard`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            }
        }
        let { data } = await axios(options);
        return data.data;
    } catch (err) {
        return [];
    }
}