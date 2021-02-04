import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import jobsReducer from "../reducers/jobs";
import favoritesReducer from "../reducers/favorites";
import errorsReducer from "../reducers/errors";
import thunk from "redux-thunk";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  jobs: {
    job: {},
    arrJobs: [],
  },
  favorites: [],
  error: "",
};
const allReducers = combineReducers({
  jobs: jobsReducer,
  favorites: favoritesReducer,
  error: errorsReducer,
});

export default function configureStore() {
  return createStore(
    allReducers,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
