import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {logger} from 'redux-logger';
import TokenExpiredReducer from "./tokenExpired/TokenExpiredReducer";

const middlewareList = [thunk, logger];

const Store = createStore(
    combineReducers({
        expired: TokenExpiredReducer,
    }),
    applyMiddleware(...middlewareList),
);

export type RootState = ReturnType<typeof Store.getState>;

export default Store;