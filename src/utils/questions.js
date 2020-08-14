import axios from "axios";

import { openNotification } from "../components/Notification";

import { config } from "./settings";
import { getQuestions } from "../actions/questions";
import { getBoard } from "../actions/board";

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

        return getQuestions(data.data);
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error.");
        return getQuestions(null);
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

export const refreshBoard = async () => {
    try {
        let options = {
            method: "get",
            url: `${config.url.API_URL}/api/v1/questions/leaderboard`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            }
        }
        let { data } = await axios(options);
        return getBoard(data.data);
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error.");
        return getBoard(null);
    }
}