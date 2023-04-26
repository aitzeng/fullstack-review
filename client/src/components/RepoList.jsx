import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map(repo => <RepoListEntry repo={repo} key={repo._id}/>)}
  </div>
)

export default RepoList;