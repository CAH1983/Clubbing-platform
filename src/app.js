import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import EventsShow from './components/events/EventsShow';
import EventsIndex from './components/events/EventsIndex';
import EventsHome from './components/events/EventsHome';
import EventsEdit from './components/events/EventsEdit';
import EventsNew from './components/events/EventsNew';

import PhotosNew from './components/photos/PhotosNew';
import PhotosEdit from './components/photos/PhotosEdit';
import PhotosIndex from './components/photos/PhotosIndex';

import Register from './components/user/Register';
import Login from './components/user/Login';
import Profile from './components/user/Profile';

import NavBar from './components/NavBar';
import FlashMessages from './components/FlashMessages';
import SecureRoute from './components/SecureRoute';

import axios from 'axios';
import 'bulma';
import './scss/global.scss';
import './scss/showpage.scss';
import './scss/small-components.scss';
import './scss/homepage.scss';

class App extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }));
  }

  // ---------------------------------------------------------
  render() {
    if(!this.state.events) return null;
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <FlashMessages />

          {/* ----------- main ----------- */}

          <Switch>
            <SecureRoute path="/photos/:id/edit" component={PhotosEdit} />
            <SecureRoute path="/photos/new" component={PhotosNew} />
            <Route path="/photos" component={PhotosIndex} />
            <SecureRoute path="/events/:id/edit" component={EventsEdit} />
            <SecureRoute path="/events/new" component={EventsNew} />
            <Route path="/events/:id" component={EventsShow} />
            <Route path="/events" component={EventsIndex} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={EventsHome} />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

// -----------------------------------------------------------------------------
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
