import { type UserAction, type UserState, SETLOADING, SETUSER } from "./type";

const initialState: UserState = {
  user: null,
  loading: false,
};

// Reducer function
export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case SETUSER:
      return { ...state, user: action.payload };
    case SETLOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
