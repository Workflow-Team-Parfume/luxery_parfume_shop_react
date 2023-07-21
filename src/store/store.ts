import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import { IsLoadingReducer } from "./reducers/IsLoadingReducer";




export const rootReducer = combineReducers({
    auth: AuthReducer,
    loading: IsLoadingReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [thunk]
});




export default store;