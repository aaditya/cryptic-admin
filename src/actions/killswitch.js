export const GET_KILLSWITCH = 'GET_KILLSWITCH';

export function getKillswitch(killswitch) {
    return {
        type: GET_KILLSWITCH,
        killswitch
    };
}
