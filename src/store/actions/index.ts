// actions.js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_USER = 'SET_USER'
export const SET_USERFULLINFO = 'SET_USERFULLINFO'
export const SET_TEMPUSER = 'SET_TEMPUSER'
export const SET_STORYCLICKED = 'SET_STORYCLICKED'



export const login = () => ({
  type: LOGIN,
});

export const logout = () => ({
  type: LOGOUT,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export const setUSER = (user) => ({
  type: SET_USER,
  payload: {
    fullname: user.displayName,
    email: user.email,
  }
})

export const setUSERFULLINFO = (user) => ({
  type: SET_USERFULLINFO,
  payload: {
    fullname: user.fullname,
    email: user.email,
    username: user.username,
    bio: user.bio,
    profilePicture: user.profilePicture
  }
})

export const setTEMPUSER = (user) => ({
  type: SET_TEMPUSER,
  payload: {
    fullname: user.displayName,
    email: user.email,
  }
})

export const setSTORYCLICKED = (val) => ({
  type: SET_STORYCLICKED,
  payload: {
    isStoryClicked: val
  }
})

