// ในไฟล์ userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload); // เพิ่มผู้ใช้ใหม่
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload); // ลบผู้ใช้
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload; // แก้ไขข้อมูลของผู้ใช้
      }
    },
  },
});

export const { addUser, removeUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
