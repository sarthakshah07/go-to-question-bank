import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import categoriesSlice from "./categories/categoriesSlice";

const rootReducers = combineReducers({
    Auth: authSlice,
    Categories : categoriesSlice
});

export default rootReducers;
