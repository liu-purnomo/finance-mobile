import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    return null;
  }
};

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      AsyncStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logoutAction: (state) => {
      state.user = null;
      AsyncStorage.removeItem('userInfo');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginAction, logoutAction, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const loadUser = () => async (dispatch: any) => {
  const userInfo = await loadUserFromStorage();
  if (userInfo) {
    dispatch(setUser(userInfo));
  }
};
