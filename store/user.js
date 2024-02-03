// "use client";
import { createSlice } from "@reduxjs/toolkit";
const user = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    userId: "",
  },
  reducers: {
    updateUser: (state, actions) => {
      state.name = actions.payload.name;
      state.email = actions.payload.email;
      state.userId = actions.payload.userId;
    },
  },
});

export const { updateUser } = user.actions;
export default user;
