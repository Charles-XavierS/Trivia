import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import rankingReducer from './rankingReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  ranking: rankingReducer,
});

export default rootReducer;
