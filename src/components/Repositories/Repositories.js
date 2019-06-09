import React from 'react';
import PropTypes from 'prop-types';
import RepositoryItems from './RepositoryItems';

const Repositories = ({ repositories }) => {
  return repositories.map(repository => (
    <RepositoryItems repository={repository} key={repository.id} />
  ));
};

Repositories.propTypes = {
  repositories: PropTypes.array.isRequired
};

export default Repositories;
