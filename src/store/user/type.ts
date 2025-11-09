import type { userType } from "@/lib/types";

// Define action types
export const SETUSER = "SETUSER";
export const SETLOADING = "SETLOADING";

// Define action interfaces
export interface setUserActionType {
  type: typeof SETUSER;
  payload: userType | null;
}

export interface setLoadingActionType {
  type: typeof SETLOADING;
  payload: boolean;
}

// Combine them
export type UserAction = setLoadingActionType | setUserActionType;

// Define state type
export interface UserState {
  user: userType | null;
  loading: boolean;
}
