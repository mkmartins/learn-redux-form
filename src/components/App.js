import React, { Component } from 'react';
import './App.css';
import PostsIndex from '../containers/PostsIndex'

class App extends Component {
  render() {
    return (
      <div className="container">
        <PostsIndex />
      </div>
    );
  }
}

export default App;
