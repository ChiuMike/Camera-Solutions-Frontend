import { Dispatch } from 'redux';
import * as ExpiredTypes from "./ActionTypes";

export const userExpired = () => async(dispatch: Dispatch)=>{
    
    dispatch({ 
        type: ExpiredTypes.EXPIRED_TRUE,
        payload: true
    })

}