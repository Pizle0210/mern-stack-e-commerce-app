import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

try {
  const storedUserInfo = localStorage.getItem("userInfo");
  if (storedUserInfo) {
    const parsedUserInfo = JSON.parse(storedUserInfo);
    initialState.userInfo = parsedUserInfo;
  }
} catch (error) {
  console.error("Error parsing JSON from localStorage:", error);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
