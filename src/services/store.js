import { createStore } from "redux";
import { rootReducer } from "./reducers/index.js";
const store = createStore(rootReducer, enhancer);
export default store;
