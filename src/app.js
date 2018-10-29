import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventsShow from './components/events/EventsShow';
import EventsIndex from './components/events/EventsIndex';
import EventsHome from './components/events/EventsHome';
import Register from './components/user/Register';
import NavBar from './components/NavBar';
import FlashMessages from './components/FlashMessages';

// import SecureRoute from './components/SecureRoute';

import axios from 'axios';
import 'bulma';

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
          <main className="section">
            <div className="container">

              <Switch>
                <Route path="/events/:id" component={EventsShow} />
                <Route path="/events" component={EventsIndex} />
                <Route path="/register" component={Register} />
                <Route path="/" component={EventsHome} />
              </Switch>

            </div>
          </main>
        </div>
        {/* ------------------------------------- */}
      </BrowserRouter>
    );
  }
}

// -----------------------------------------------------------------------------
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
