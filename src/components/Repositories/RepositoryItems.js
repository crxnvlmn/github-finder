import React from 'react';
import PropTypes from 'prop-types';

const RepositoryItems = ({ repository }) => {
  return (
    <div className="card">
      <h3>
        <a href={repository.html_url}>{repository.name}</a>
      </h3>
    </div>
  );
};

RepositoryItems.propTypes = {
  repository: PropTypes.object.isRequired
};

export default RepositoryItems;
