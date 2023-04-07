import { combineReducers, legacy_createStore } from "redux";
import TrendingReducer from "./TrendingReducer";
import ShopListReducer from "./ShopListReducer";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";

const rootReducer = combineReducers({
  TrendingReducer,
  ShopListReducer,
  AuthReducer,
  CartReducer,
});

const store = legacy_createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
