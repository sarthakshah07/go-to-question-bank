import {
    Action,
    configureStore,
} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducers from "./reducers";

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        })
});

export function useAppDispatch() {
    return useDispatch();
}