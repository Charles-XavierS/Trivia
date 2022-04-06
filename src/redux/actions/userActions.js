import { getGravatar, getToken } from '../../api/request';

const loginAction = (email, name) => async (dispatch) => {
  const { token } = await getToken();
  const gravatarEmail = getGravatar(email);

  dispatch({ type: 'LOGIN', payload: { name, gravatarEmail } });
  dispatch({ type: 'SET_TOKEN', token });
};

export default loginAction;
