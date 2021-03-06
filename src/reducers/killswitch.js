import { GET_KILLSWITCH } from '../actions/killswitch';

export default function getKillswitch(state = null, action) {
    switch (action.type) {
        case GET_KILLSWITCH:
            return { ...state, ...action.killswitch };
        default:
            return state;
    }
}
