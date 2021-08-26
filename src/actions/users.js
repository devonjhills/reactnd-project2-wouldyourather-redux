import { RECEIVE_USERS } from "./types"

export const receiveUsers = (users) => {
    return {
        type: RECEIVE_USERS,
        users,
    }
}