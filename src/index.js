import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import PostsNew from './containers/PostsNew';
import PostsShow from './components/PostsShow';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import promise from 'redux-promise'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

const nav = function(){
  return(
    <nav className="navbar fixed-bottom navbar-light bg-light">
        <Link className="btn btn-primary" to="/posts/new">
            Add a Post
        </Link>
    </nav>
  )
}

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div className="container">
        <div className="nav">
          {nav()}
        </div>
        <Switch>
          <Route path="/posts/new" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root')
);
