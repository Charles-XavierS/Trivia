const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  questions: [],
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, ...action.payload };
  case 'SET_QUESTIONS':
    return { ...state, questions: action.questions };
  default:
    return state;
  }
};

export default playerReducer;
