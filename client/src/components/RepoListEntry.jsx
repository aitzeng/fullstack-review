import React, { useState, useEffect } from 'react';

const RepoListEntry = ({repo}) => {

  let clickHandler = (e) => {
    e.preventDefault();
    window.location.href = repo.html_url;
  }

  return (

    <div>
      <div><span onClick={clickHandler}>Name: {repo.name}</span>Updated At: {repo.updatedAt} Description: {repo.description}</div>
    </div>
  )
}

export default RepoListEntry;