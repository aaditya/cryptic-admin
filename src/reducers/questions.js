import { GET_QUESTIONS } from '../actions/questions';

export default function getQuestions(state = null, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return action.questions;
        default:
            return state;
    }
}
