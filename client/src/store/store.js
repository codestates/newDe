import { configureStore, createReducer, createAction } from '@reduxjs/toolkit';

const login = createAction('login');
const logout = createAction('logout');

const reducer = createReducer({
  userInfo: {
    auth: false,
    email: '',
    nickname: ''
  }
}, {
  [login]: (state, action) => {
    return {
      auth: true,
      email: action.payload.email,
      nickname: action.payload.nickname
    };
  },
  [logout]: (state, action) => {
    return {
      auth: false,
      userInfo: {
        auth: false,
        email: '',
        nickname: ''
      }
    };
  }
});

const store = configureStore({ reducer });

export const actionCreators = { login, logout };

export default store;
