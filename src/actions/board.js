export const GET_BOARD = 'GET_BOARD';

export function getBoard(board) {
    return {
        type: GET_BOARD,
        board
    };
}
