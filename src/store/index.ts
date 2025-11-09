import { createStore } from "redux";
import { userReducer } from "./user/reducer";

// Create store
export const store = createStore(userReducer);
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
