import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import News from "./reducers/News";

const reducer = combineReducers({
    News
});

const initialState = { };

const middleware = [ thunk ];

export const store = createStore(
    reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))
);