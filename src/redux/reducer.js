import { SET_ADMIN } from './action';

const initialState = {
  isAdmin: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: action.isAdmin,
      };
    default:
      return state;
  }
};

export default reducer;
