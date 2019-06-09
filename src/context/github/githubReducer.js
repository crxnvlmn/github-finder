import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOSITORIES
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload[0],
        lastSearch: action.payload[1],
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
        lastSearch: false
      };
    case GET_REPOSITORIES:
      return {
        ...state,
        repositories: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
