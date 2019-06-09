import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users, lastSearch } = githubContext;

  if (loading) {
    return <Spinner />;
  } else {
    if (users.length !== 0) {
      return (
        <div style={userStyle}>
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </div>
      );
    } else {
      if (lastSearch !== false) {
        return (
          <div>
            <h1
              style={{ textAlign: 'center' }}
            >{`No results for ${lastSearch}`}</h1>
          </div>
        );
      } else {
        return null;
      }
    }
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Users;
