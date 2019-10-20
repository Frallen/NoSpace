const AuthUser = "AuthUser";

let initialState = {
  email: null,
  password: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthUser:
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
};

export const UserisAuth = (email, password) => ({
  type: AuthUser,
  data: { email, password }
});

export default authReducer;
