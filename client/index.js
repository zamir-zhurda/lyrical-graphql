import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

import { Component } from 'react';

const apolloClient = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
      <ApolloProvider client={apolloClient} >
        <Router history={hashHistory}>
          <Route path="/" component={App} >
            <IndexRoute component={SongList} />
          </Route>
          <Route  path="/songs/new" component={SongCreate} />   
          <Route  path="/songs/:id" component={SongDetail} />          
        </Router>

       
      </ApolloProvider>
    )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
