import * as ActionTypes from "./ActionTypes";
import { IAction } from "./Model";

const initialAlertState = {
    expired: false,
}

const TokenExpiredReducer = (state = initialAlertState, action : IAction) => {
    switch(action.type) {
        case ActionTypes.EXPIRED_TRUE:
            return {
                ...state,
                expired:action.payload
            }
        case ActionTypes.EXPIRED_FALSE:
            return {
                ...state,
                expired:action.payload
            }
        default:
            return state;
    }
}

export default TokenExpiredReducer;