import { combineReducers } from 'redux';

import users from './users';
import questions from './questions';
import authUser from "./authUser";
import board from "./board";
import killswitch from "./killswitch";

export default combineReducers({
    users,
    questions,
    authUser,
    board,
    killswitch
});
