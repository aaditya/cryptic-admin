import { GET_BOARD } from '../actions/board';

export default function getBoard(state = null, action) {
    switch (action.type) {
        case GET_BOARD:
            return action.board;
        default:
            return state;
    }
}
