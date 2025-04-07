import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IAuthState {
  isAuthenticated: boolean;
  username: string | null;
  email: string | null;
  id: string | null;
  token: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  username: null,
  email: null,
  id: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Partial<IAuthState>>) => { // ✅ Accept Partial<IAuthState>
      return {
        ...state,
        isAuthenticated: true, // ✅ Always set as true inside the reducer
        ...action.payload, 
      };
    },
    removeCredentials: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        username: null,
        email: null,
        id: null,
        token: null,
      };
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
