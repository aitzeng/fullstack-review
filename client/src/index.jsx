import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  // Top 25 repos in the database. Will need to use useEffect for when opening site
  const [repos, setRepos] = useState([]);
  const [added, setAdded] = useState(repos);

  useEffect(() => {
    grab()
  }, [])

  let server = 'http://localhost:1128/repos'

  const search = (term) => {
    $.ajax({
      url: server,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({term}),
      success: (response) => {
        grab()
      },
      error: (error) => {
        console.log('Failed to post:', error)
      }
    })
    // console.log(`${term} was searched`);
  }

  const handleSuccess = function(response) {
    return response
  }

  const grab = () => {
    $.ajax({
      url: server,
      method: 'GET',
      success: (response) => {
        setAdded(response)
      },
      error: (error) => {
        console.log('Unsuccessfully grabbed:', error)
      }
    })
  }


  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={added}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));