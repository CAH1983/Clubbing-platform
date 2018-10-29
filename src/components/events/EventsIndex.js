import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';


class EventsIndex extends React.Component {
  constructor() {
    super();
    this.state = { events: []};
  }

  componentDidMount() {
    axios
      .get('/api/events')
      .then(res => this.setState({ events: res.data}));
  }

  render() {
    return (
      <main>
        <h1 className="title is-2"> Whats on? </h1>
        <ul className="columns is-multiline events-index">
          {this.state.events.map(event =>
            <li
              className="column is-one-quarter-desktop is-one-third-tablet" key={event.id}
            >
              <Link to={`/events/${event.id}`}>
                <EventCard {...event} />
              </Link>
            </li>
          )}
        </ul>
      </main>
    );
  }
}

export default EventsIndex;
