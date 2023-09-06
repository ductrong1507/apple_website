const initialState = {
  isAuth: JSON.parse(localStorage.getItem("CURRENT_USER")) ? true : null,
  currentUser: JSON.parse(localStorage.getItem("CURRENT_USER")) || null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_LOGIN": {
      const userArr = JSON.parse(localStorage.getItem("USER_ARRAY")) || [];
      const index = userArr.findIndex(
        (user) =>
          user.email === action.data.email &&
          user.password === action.data.password
      );

      if (index === -1) {
        return { ...state, isAuth: false };
      } else {
        localStorage.setItem("CURRENT_USER", JSON.stringify(userArr[index]));
        alert("Bạn đã login thành công!!!");

        return {
          ...state,
          isAuth: true,
          currentUser: userArr[index],
        };
      }
    }

    case "ON_LOGOUT": {
      localStorage.removeItem("CURRENT_USER");
      return { ...state, isAuth: null, currentUser: null };
    }

    default:
      return { ...state };
  }
};
export default AuthReducer;
