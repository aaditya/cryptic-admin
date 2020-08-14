import { combineReducers } from 'redux';

import users from './users';
import questions from './questions';
import authUser from "./authUser";
import board from "./board";

export default combineReducers({
    users,
    questions,
    authUser,
    board
});
