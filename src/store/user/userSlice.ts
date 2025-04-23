import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

type UserInitialStateType = {
    currentUser: FirebaseAuthTypes.User | null,
}

const INITIAL_STATE: UserInitialStateType = {
    currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setUser(state, action: PayloadAction<FirebaseAuthTypes.User | null>) {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
