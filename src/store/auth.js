import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  role: "user",
  bookedit: {
    edit: false,
    bookid: ''
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },

    logOut: (state) => {
      state.isLoggedIn = false;
    },

    changeRole: (state, action) => {
      const role = action.payload;
      state.role = role;
    },

    changeBookEdit: (state,action)=> {
      state.bookedit.edit = !state.bookedit.edit
      state.bookedit.bookid = action.payload;
    },

    changeAddNewBookFalse: (state,action)=> {
      state.bookedit.edit = false;

    }
    
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;

export default authSlice.reducer;
