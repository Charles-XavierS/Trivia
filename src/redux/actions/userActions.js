import { getGravatar, getQuestions, getToken } from '../../api/request';

const loginAction = (email, name) => async (dispatch) => {
  const { token } = await getToken();
  const { results } = await getQuestions({ token });
  const gravatarEmail = getGravatar(email);

  dispatch({ type: 'LOGIN', payload: { name, gravatarEmail, questions: results } });
  dispatch({ type: 'SET_TOKEN', token });
};

export default loginAction;
