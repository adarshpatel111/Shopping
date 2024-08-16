import { combineReducers } from "redux";
import HomeReducer from "./HomeReducer/HomeReducer";
import SigninReducer from "./SigninReducer/SigninReducer";

export const reducer = combineReducers({
    home: HomeReducer,
    login: SigninReducer,
})