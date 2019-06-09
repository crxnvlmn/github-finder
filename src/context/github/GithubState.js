import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOSITORIES
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_Secret;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_Secret;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repositories: [],
    loading: false,
    lastSearch: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: [res.data.items, text]
    });
  };

  // Get User
  const getUser = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  };

  // Get Repositories
  const getUserRepositories = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:ascending&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    dispatch({ type: GET_REPOSITORIES, payload: res.data });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repositories: state.repositories,
        loading: state.loading,
        lastSearch: state.lastSearch,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepositories
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
