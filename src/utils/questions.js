import axios from "axios";
import fileDownload from "js-file-download";

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

export const downloadBoard = async () => {
    try {
        let options = {
            method: "get",
            url: `${config.url.API_URL}/api/v1/questions/leaderboard-csv`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            }
        }
        let { data } = await axios(options);
        fileDownload(data, 'leaderboard.csv');
        return true;
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error.");
        return null;
    }
}

export const addLevel = async (level, count) => {
    try {
        let options = {
            method: "post",
            url: `${config.url.API_URL}/api/v1/level/info`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            },
            data: {
                levelNum: level,
                qCount: count
            }
        }

        await axios(options);

        return true;
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error.");
        return null;
    }
}

export const editLevel = async (levelId, count) => {
    try {
        let options = {
            method: "put",
            url: `${config.url.API_URL}/api/v1/level/info`,
            headers: {
                "x-auth-token": localStorage.getItem('access_token')
            },
            data: {
                qid: levelId,
                qcount: count
            }
        }

        await axios(options);

        return true;
    } catch (err) {
        openNotification(err.response ? err.response.data.message : "Server Error.");
        return null;
    }
}