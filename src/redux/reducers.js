import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import categoriesSlice from "./categories/categoriesSlice";
import questionsDataSlice from "./questionsData/questionDataSlice";

const rootReducers = combineReducers({
    Auth: authSlice,
    Categories : categoriesSlice,
    QuestionsData:questionsDataSlice
    
});

export default rootReducers;
